const https = require('https');
const fs = require('fs');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        // run twice for good measure
        for (let i = 1; i <= 2; i++) {
            https
                .get(url, (res) => {
                    console.log(res.headers['cf-cache-status'] + `: ${url}`);
                })
                .on('error', (err) => {
                    console.log(err.message);
                });
        }
    });
});
