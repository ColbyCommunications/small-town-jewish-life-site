const https = require('https');
const fs = require('fs');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        let options = { url, agent: 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)' };
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
