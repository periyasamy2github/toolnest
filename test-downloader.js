const instagramDl = require('instagram-url-direct');
const fbDl = require('fb-video-downloader');

async function test() {
    try {
        console.log("Testing Instagram download...");
        const igUrl = "https://www.instagram.com/reel/C4_d-y_S1I_/";
        const igData = await instagramDl.instagramGetUrl(igUrl);
        console.log("IG Result:", JSON.stringify(igData, null, 2));

    } catch (e) {
        console.error("Error:", e);
    }
}

test();
