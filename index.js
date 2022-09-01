require('dotenv').config();
const prettier = require('prettier');
const express = require('express')
const boardData = require('./board-data.json');
const fs = require('fs');

const app = express();
const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });
    const postList = `
    ${boardData
        .map(v => {
        return `<url>
            <loc>${process.env.DOMAIN}/index/${v['unique id']}</loc>
            <lastmod>${new Date(v['Modified Date']).toISOString()}</lastmod>
            </url>`
        })
        .join('')
    }
`
    const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  >
  <url>
    <loc>${process.env.DOMAIN}</loc>
    <priority>1</priority>
  </url>
   <url>
    <loc>${process.env.DOMAIN}/request_estimate</loc>
    <priority>1</priority>
  </url>
   <url>
    <loc>${process.env.DOMAIN}/request_partner</loc>
    <priority>1</priority>
  </url>
    ${postList}
  </urlset>
  `;
  const formattedSitemap = [formatted(generatedSitemap)];
 
  fs.writeFileSync('sitemap.xml', formattedSitemap.toString(), 'utf-8')


app.listen(8080, () => {
    console.log('generate sitemap');
});