import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import instagramDl from 'instagram-url-direct';
// @ts-ignore
import fbDl from 'fb-video-downloader';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        let videoUrl = null;

        if (url.includes('instagram.com')) {
            const data = await instagramDl.instagramGetUrl(url);
            // instagram-url-direct returns { results_number: 1, url_list: [ 'url1', 'url2' ] }
            if (data.url_list && data.url_list.length > 0) {
                videoUrl = data.url_list[0];
            }
        } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
            const data = await fbDl.getInfo(url);
            // fb-video-downloader returns { download: { sd: 'url', hd: 'url' } }
            if (data.download && data.download.hd) {
                videoUrl = data.download.hd;
            } else if (data.download && data.download.sd) {
                videoUrl = data.download.sd;
            }
        } else {
            return NextResponse.json({ error: 'Unsupported platform for this downloader' }, { status: 400 });
        }

        if (!videoUrl) {
            return NextResponse.json({ error: 'No video found' }, { status: 404 });
        }

        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error('Failed to fetch video content');

        const contentType = response.headers.get('content-type') || 'video/mp4';
        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="video.mp4"`);
        headers.set('Content-Type', contentType);

        // @ts-ignore
        return new NextResponse(response.body, { headers });

    } catch (error: any) {
        console.error("Social download error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
