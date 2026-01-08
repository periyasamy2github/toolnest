import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@ybd-project/ytdl-core';

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
        // If format requested, stream the download
        if (formatId) {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title || 'video';
            const safeTitle = title.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim().substring(0, 50) || 'video';

            // Find the format
            const format = info.formats.find(f => f.itag.toString() === formatId);
            if (!format) {
                return NextResponse.json({ error: 'Format not found' }, { status: 404 });
            }

            // Stream the video
            const stream = ytdl(url, { format });

            // Convert Node.js stream to Web ReadableStream
            const chunks: Uint8Array[] = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            const headers = new Headers();
            headers.set('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
            headers.set('Content-Type', 'video/mp4');
            headers.set('Content-Length', buffer.length.toString());

            return new NextResponse(buffer, { headers });
        }

        // Get video info
        const info = await ytdl.getInfo(url);

        const videoInfo = {
            id: info.videoDetails.videoId,
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url,
            duration: parseInt(info.videoDetails.lengthSeconds),
            durationFormatted: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
            channel: info.videoDetails.author?.name,
            viewCount: parseInt(info.videoDetails.viewCount || '0'),
            formats: extractFormats(info.formats),
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
        .filter(f => f.hasVideo && f.container === 'mp4')
        .map(f => ({
            formatId: f.itag.toString(),
            quality: f.qualityLabel || `${f.height}p` || 'Unknown',
            resolution: `${f.width || 0}x${f.height || 0}`,
            height: f.height || 0,
            ext: f.container,
            filesize: f.contentLength ? parseInt(f.contentLength) : null,
            filesizeFormatted: f.contentLength ? formatFileSize(parseInt(f.contentLength)) : 'Unknown',
            fps: f.fps,
            hasAudio: f.hasAudio,
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

export const config = {
    api: {
        responseLimit: false,
    },
};
