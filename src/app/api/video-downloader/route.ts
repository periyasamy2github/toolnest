import { NextRequest, NextResponse } from 'next/server';
import YTDlpWrap from 'yt-dlp-wrap';
import path from 'path';
import fs from 'fs';
import os from 'os';

const ytDlpPath = path.join(os.tmpdir(), process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');

async function ensureYtDlp(): Promise<YTDlpWrap> {
    if (!fs.existsSync(ytDlpPath)) {
        console.log('Downloading yt-dlp binary...');
        await YTDlpWrap.downloadFromGithub(ytDlpPath);
        if (process.platform !== 'win32') {
            fs.chmodSync(ytDlpPath, 0o755);
        }
    }
    return new YTDlpWrap(ytDlpPath);
}

// GET - Fetch video info OR download video
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    const formatId = req.nextUrl.searchParams.get('format');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    try {
        const ytDlp = await ensureYtDlp();

        // If format is specified, download the video
        if (formatId) {
            return await downloadVideo(ytDlp, url, formatId);
        }

        // Otherwise, return video info
        const metadata = await ytDlp.getVideoInfo(url);

        const videoInfo = {
            id: metadata.id,
            title: metadata.title,
            thumbnail: metadata.thumbnail,
            duration: metadata.duration,
            durationFormatted: formatDuration(metadata.duration),
            channel: metadata.channel || metadata.uploader,
            viewCount: metadata.view_count,
            formats: extractFormats(metadata.formats),
        };

        return NextResponse.json(videoInfo);
    } catch (error: any) {
        console.error('Video Error:', error);
        return NextResponse.json({
            error: 'Failed to process video',
            details: error.message
        }, { status: 500 });
    }
}

async function downloadVideo(ytDlp: YTDlpWrap, url: string, formatId: string) {
    const metadata = await ytDlp.getVideoInfo(url);
    const title = metadata.title || 'video';
    const safeTitle = title.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim().substring(0, 50) || 'video';

    const tempFile = path.join(os.tmpdir(), `${Date.now()}_video.mp4`);

    console.log(`Downloading format ${formatId} to ${tempFile}`);

    await ytDlp.execPromise([
        url,
        '-f', formatId,
        '-o', tempFile,
        '--no-playlist',
        '--no-warnings',
    ]);

    if (!fs.existsSync(tempFile)) {
        throw new Error('Video file was not created');
    }

    const stat = fs.statSync(tempFile);
    const videoBuffer = fs.readFileSync(tempFile);

    // Clean up temp file
    try { fs.unlinkSync(tempFile); } catch (e) { }

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
    headers.set('Content-Type', 'video/mp4');
    headers.set('Content-Length', stat.size.toString());

    return new NextResponse(videoBuffer, { headers });
}

function formatDuration(seconds: number): string {
    if (!seconds) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number): string {
    if (!bytes) return 'Unknown';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extractFormats(formats: any[]): any[] {
    if (!formats) return [];

    const videoFormats = formats
        .filter(f => f.vcodec && f.vcodec !== 'none')
        .map(f => ({
            formatId: f.format_id,
            quality: f.format_note || `${f.height}p` || 'Unknown',
            resolution: f.resolution || `${f.width || 0}x${f.height || 0}`,
            height: f.height || 0,
            ext: f.ext,
            filesize: f.filesize || f.filesize_approx,
            filesizeFormatted: formatFileSize(f.filesize || f.filesize_approx),
            fps: f.fps,
            hasAudio: f.acodec && f.acodec !== 'none',
        }))
        .filter(f => f.height > 0)
        .sort((a, b) => b.height - a.height);

    // Prioritize formats with audio
    const withAudio = videoFormats.filter(f => f.hasAudio);
    const withoutAudio = videoFormats.filter(f => !f.hasAudio);
    const combined = [...withAudio, ...withoutAudio];

    // Deduplicate by height
    const seen = new Set();
    return combined.filter(f => {
        if (seen.has(f.height)) return false;
        seen.add(f.height);
        return true;
    }).slice(0, 8);
}
