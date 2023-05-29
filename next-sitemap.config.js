/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kkn1125.github.io",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 1,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
  },
};
