const { fetch } = require('node-fetch');
const fs = require('fs');

fs.readFile('.github/sitemap.json', async (err, data) => {
    if (err) throw err;
    let sitemap = JSON.parse(data);

    sitemap.urls.forEach(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
    });
});
