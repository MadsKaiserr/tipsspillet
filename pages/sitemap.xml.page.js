import React from 'react';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {
    const BASE_URL = 'http://localhost:3000';

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.tipsspillet.dk/</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/betingelser</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/blog</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/faq</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/gruppespil</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/kontakt</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/priser</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/privatliv</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
  <url>
    <loc>https://www.tipsspillet.dk/signup</loc>
    <lastmod>2022-09-24</lastmod>
  </url>
</urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;