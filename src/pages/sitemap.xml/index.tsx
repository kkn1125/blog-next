/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapLegacy(ctx, [
    {
      loc: "https://kkn1125.github.com",
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: "https://kkn1125.github.com/about/",
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
