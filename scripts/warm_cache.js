const https = require('https');
const fs = require('fs');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        let options = { url, agent: 'Mozilla/5.0' };
        https
            .get(options, (res) => {
                console.log('headers:', res.headers);
                console.log(res.headers['cf-cache-status']);
            })
            .on('error', (err) => {
                console.log(err.message);
            });
    });
});
