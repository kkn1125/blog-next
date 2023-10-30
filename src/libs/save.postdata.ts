//@ts-nocheck

//@ts-ignore
import { globSync } from "glob";

// import { Article } =require ("@/util/types");
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import fs from "fs";
import path from "path";

let totalLen = 0;

const customGlob = (globCondition) => {
  return globSync(globCondition, {
    ignore: ["../database/notyet/*.{md,mdx}"],
    dot: true,
  });
};

const MDX_REMOTE_OPTIONS = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
      rehypeMdxCodeProps,
    ],
    format: "mdx",
    development: process.env.NODE_ENV !== "production",
  },
};

const metapostLocation = "../database/metapost/posts.json";

/* metadata save */
// if (process.env.NODE_ENV === "production") {
(async () => {
  const posts = await findAllArticles();
  const saveCurrent = JSON.stringify(posts, null, 2);
  try {
    console.log("starting mode:", process.env.NODE_ENV);
    const metapost = fs.readFileSync(metapostLocation);
    const metapostJSON = JSON.stringify(
      JSON.parse(metapost.toString() || "[]"),
      null,
      2
    );
    if (saveCurrent !== metapostJSON) {
      fs.rmSync(metapostLocation);
      fs.writeFileSync(metapostLocation, saveCurrent);
      console.log("🛠️ save refresh metapost.json");
    } else {
      throw new Error("now content is same the metapost.json");
    }
  } catch (error) {
    fs.writeFileSync(metapostLocation, saveCurrent);
    console.log("✅ now is same as before", error);
  } finally {
    console.log("✨ success !");
    process.exit(0);
  }
})();
// }

/* 단일 포스트 찾기 - 모듈 2 */
async function readFileAndGetSerializedPostMetadata(filePath) {
  const file = fs.readFileSync(filePath, "utf-8");
  const source = await serialize(file.trim(), MDX_REMOTE_OPTIONS);

  const { content, data } = matter(file);
  const mdxData = source || data;

  if (mdxData.frontmatter.published) {
    return {
      ...mdxData,
      content,
      readingTime: readingTime(file).text,
      originPath: filePath,
    };
  } else {
    return null;
  }
}
async function findAllArticles() {
  const articles = customGlob(`../database/**/*.{md,mdx}`);
  totalLen = articles.length;
  let convert = [];
  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    if (articleSlug.match(/\.md(x)?/)) {
      const article = await readFileAndGetSerializedPostMetadata(articleSlug);
      if (article) convert.push(article);
    }
    console.log(
      "procceding %d% (%d/%d)",
      ((i / totalLen) * 100).toFixed(1),
      i,
      totalLen
    );
  }
  const result = convert.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date)
  );
  return result;
}
