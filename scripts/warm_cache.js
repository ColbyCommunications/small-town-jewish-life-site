const https = require('https');
const fs = require('fs');
const axios = require('axios');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        axios
            .get(url, { headers: { 'User-Agent': 'colby-gh' } })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    });
});
