import fs from "fs";
import { globSync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const basePath = "src/database/**/*.mdx";

const blogMdxDirs = ["src/database/**/*.md", "src/database/**/*.mdx"];

/* initialize for metapost file : refresh */

if (process.env.RUN_MODE === "refresh") {
  setTimeout(async () => {
    const posts = await getAllArticles();
    const metaPostLocate = path.join(
      path.resolve(),
      "src/database/metapost/posts.json"
    );
    const saveCurrent = JSON.stringify(posts, null, 2);
    try {
      const metapost = fs.readFileSync(metaPostLocate);
      const metapostJSON = JSON.stringify(
        JSON.parse(metapost.toString() || "[]"),
        null,
        2
      );
      if (saveCurrent !== metapostJSON) {
        fs.rmSync(metaPostLocate);
        fs.writeFileSync(metaPostLocate, saveCurrent);
        console.log("start refresh metapost.json");
      }
    } catch (error) {
      fs.writeFileSync(metaPostLocate, saveCurrent);
      console.log("replace metapost.json");
    } finally {
      console.log("success refresh metapost.json !");
    }
  }, 1000);
}

const SLICE_FOR_TEST_RUN_AMOUNT = Number(process.env.RUN_LIMIT) || 20;
if (process.env.RUN_MODE === "refresh") {
  console.log("🌟 no use this option: SLICE_FOR_TEST_RUN");
  console.log("SLICE_FOR_TEST_RUN_AMOUNT", SLICE_FOR_TEST_RUN_AMOUNT);
}

const SLICE_FOR_TEST_RUN = (array: any[], limitSize: number) => {
  return array.slice(
    0,
    process.env.RUN_MODE === "test" ? limitSize : undefined
  );
};

const customGlob = (globCondition: string | string[]) => {
  return SLICE_FOR_TEST_RUN(globSync(globCondition), SLICE_FOR_TEST_RUN_AMOUNT);
};

export const serializeMdx = (source: string) => {
  // const fixMetaPlugin = (options: any = {}) => {
  //   return (tree: any) => {
  //     visit(tree, "element", visit);
  //   };

  //   function visit(
  //     node: { tagName: string; data: any; properties: { metastring: any } },
  //     index: string,
  //     parent: { (node: any, index: any, parent: any): void; tagName?: any }
  //   ) {
  //     if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
  //       return;
  //     }

  //     node.data = { ...node.data, meta: node.properties.metastring };
  //   }
  // };
  return serialize(source, {
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
      ],
      format: "mdx",
      development: process.env.NODE_ENV !== "production",
    },
  });
};

const articlesPath = path.join(process.cwd(), basePath);

export async function getAllSlugNames() {
  const paths = customGlob(`${articlesPath}/*.mdx`).map((path) =>
    path
      .split(/\\+|\/+/)
      .pop()
      ?.replace(/\.mdx/, "")
  );
  SLICE_FOR_TEST_RUN(paths, SLICE_FOR_TEST_RUN_AMOUNT);
}

export async function getSlugs() {
  const articles = customGlob(blogMdxDirs);

  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        readingTime: readingTime(source).text,
        originPath: articleSlug,
      });
    } else {
    }
  }
  const slugs = convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .filter((article: any) => article.frontmatter.published)
    .map((a: any) => a.frontmatter.slug.replace(/(\/|\\)+/g, "").trim());

  return SLICE_FOR_TEST_RUN(slugs, SLICE_FOR_TEST_RUN_AMOUNT);
}

export async function getNextArticleFromSlug(slug: string) {
  const articles = await getAllArticles();
  const articleIndex = articles.findIndex((article: any) =>
    article.frontmatter.slug.match(slug)
  );
  const article = articles[articleIndex - 1];

  if (article) {
    const source = fs.readFileSync(
      article.originPath as string
    ) as unknown as string;
    const { content, data } = matter(source);
    return {
      content,
      frontmatter: {
        slug: slug || "",
        excerpt: data.excerpt || "",
        title: data.title || "",
        publishedAt: data.date || new Date().toLocaleString("ko"),
        readingTime: readingTime(source).text,
        ...Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, v || ""])
        ),
      },
    };
  } else {
    return null;
  }
}
export async function getBeforeArticleFromSlug(slug: string) {
  const articles = await getAllArticles();
  const articleIndex = articles.findIndex((article: any) =>
    article.frontmatter.slug.match(slug)
  );
  const article = articles[articleIndex + 1];

  if (article) {
    const source = fs.readFileSync(
      article.originPath as string
    ) as unknown as string;
    const { content, data } = matter(source);
    return {
      content,
      frontmatter: {
        slug: slug || "",
        excerpt: data.excerpt || "",
        title: data.title || "",
        publishedAt: data.date || new Date().toLocaleString("ko"),
        readingTime: readingTime(source).text,
        ...Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, v || ""])
        ),
      },
    };
  } else {
    return null;
  }
}

export async function getArticleFromSlug(slug: string) {
  const articles = await getAllArticles();
  const article = articles.find((article: any) =>
    article.frontmatter.slug.match(slug)
  );
  const source = fs.readFileSync(
    article.originPath as string
  ) as unknown as string;
  const { content, data } = matter(source);
  return {
    content,
    frontmatter: {
      slug: slug || "",
      excerpt: data.excerpt || "",
      title: data.title || "",
      publishedAt: data.date || new Date().toLocaleString("ko"),
      readingTime: readingTime(source).text,
      ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v || ""])),
    },
  };
}

export async function getPaginationArticles(start: number, end: number) {
  const articles = customGlob(blogMdxDirs);
  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        readingTime: readingTime(source).text,
        originPath: articleSlug,
      });
    } else {
    }
  }

  return {
    posts: convert
      .sort((a: any, b: any) =>
        b.frontmatter.date.localeCompare(a.frontmatter.date)
      )
      .filter((article: any) => article.frontmatter.published)
      .slice(start, end + 1),
    totalAmount: articles.length,
  };
}

export async function getAllArticles(limit?: number) {
  const articles = customGlob(blogMdxDirs);
  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        readingTime: readingTime(source).text,
        originPath: articleSlug,
      });
    } else {
    }
  }

  const result = convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .filter((article: any) => article.frontmatter.published)
    .slice(0, limit || undefined);

  // fs.writeFileSync("./posts.json", JSON.stringify(result, null, 2));

  return result;
}

export async function getArticlesByCategory(category: string) {
  const articles = customGlob(blogMdxDirs);
  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        readingTime: readingTime(source).text,
        originPath: articleSlug,
      });
    } else {
      // return allArticles;
    }
  }

  return convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .filter(
      (article: any) =>
        article.frontmatter.published &&
        article.frontmatter.categories
          .map((category: string) => category.toLowerCase())
          .includes(category.toLowerCase())
    );
}

export async function getArticlesByTag(tag: string) {
  const articles = customGlob(blogMdxDirs);
  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        readingTime: readingTime(source).text,
        originPath: articleSlug,
      });
    } else {
      // return allArticles;
    }
  }

  return convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .filter(
      (article: any) =>
        article.frontmatter.published &&
        article.frontmatter.tags
          .map((tag: string) => tag.toLowerCase())
          .includes(tag.toLowerCase())
    );
}
