import { NextRequest, NextResponse } from 'next/server';
import YTDlpWrap from 'yt-dlp-wrap';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Get the path to yt-dlp binary (will be downloaded on first run)
const ytDlpPath = path.join(os.tmpdir(), process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');

// Helper to ensure yt-dlp is available
async function ensureYtDlp(): Promise<YTDlpWrap> {
    if (!fs.existsSync(ytDlpPath)) {
        console.log('Downloading yt-dlp binary...');
        await YTDlpWrap.downloadFromGithub(ytDlpPath);
        // Make executable on non-Windows
        if (process.platform !== 'win32') {
            fs.chmodSync(ytDlpPath, 0o755);
        }
        console.log('yt-dlp downloaded successfully to:', ytDlpPath);
    }
    return new YTDlpWrap(ytDlpPath);
}

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Basic YouTube URL validation
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    try {
        const ytDlp = await ensureYtDlp();

        // Get video info first
        console.log('Getting video info for:', url);
        const metadata = await ytDlp.getVideoInfo(url);
        const title = metadata.title || 'video';
        const safeTitle = title.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim() || 'video';
        console.log('Video title:', title);

        // Download to temp file first, then stream
        const tempFile = path.join(os.tmpdir(), `${Date.now()}_video.mp4`);

        console.log('Downloading video to:', tempFile);
        await ytDlp.execPromise([
            url,
            '-f', 'best[ext=mp4]/best',
            '-o', tempFile,
            '--no-playlist',
        ]);

        // Read the file and return as response
        if (!fs.existsSync(tempFile)) {
            throw new Error('Video file was not created');
        }

        const videoBuffer = fs.readFileSync(tempFile);

        // Clean up temp file
        fs.unlinkSync(tempFile);

        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
        headers.set('Content-Type', 'video/mp4');
        headers.set('Content-Length', videoBuffer.length.toString());

        return new NextResponse(videoBuffer, { headers });
    } catch (error: any) {
        console.error('YouTube Download Error:', error);

        if (error.message?.includes('Video unavailable')) {
            return NextResponse.json({ error: 'This video is unavailable or private.' }, { status: 404 });
        }
        if (error.message?.includes('age-restricted')) {
            return NextResponse.json({ error: 'This video is age-restricted.' }, { status: 403 });
        }
        if (error.message?.includes('Sign in')) {
            return NextResponse.json({ error: 'This video requires sign-in.' }, { status: 403 });
        }
        if (error.stderr) {
            console.error('yt-dlp stderr:', error.stderr);
        }

        return NextResponse.json({
            error: 'Failed to download video. Please try again.',
            details: error.message || error.stderr || 'Unknown error'
        }, { status: 500 });
    }
}
