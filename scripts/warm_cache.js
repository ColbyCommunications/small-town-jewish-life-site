const { fetch } = require('node-fetch');
const fs = require('fs');

fs.readFile('.github/sitemap.json', (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach((url) => {
        const response = await fetch(url);
        const data = await response.json();
    });
});
