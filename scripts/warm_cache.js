const https = require('https');
const fs = require('fs');
const superagent = require('superagent');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        // https
        //     .get(url, (res) => {
        //         console.log(res.headers['cf-cache-status'] + `: ${url}`);
        //     })
        //     .on('error', (err) => {
        //         console.log(err.message);
        //     });

        superagent
            .get(url)
            .set('user-agent', 'colby-github')
            .end((err, res) => {
                console.log(res.headers['cf-cache-status'] + `: ${url}`);
            });
    });
});
