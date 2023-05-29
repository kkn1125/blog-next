import { convertDate } from "@/util/tool";
import fs from "fs";
import { glob, globSync, sync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const basePath = "src/database/**/*.mdx";

const blogMdxDirs = ["src/database/**/*.md", "src/database/**/*.mdx"];

export const serializeMdx = (source: string) => {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: "mdx",
      development: process.env.NODE_ENV !== "production",
    },
  });
};

const articlesPath = path.join(process.cwd(), basePath);

export async function getAllSlugNames() {
  const paths = globSync(`${articlesPath}/*.mdx`).map((path) =>
    path
      .split(/\\+|\/+/)
      .pop()
      ?.replace(/\.mdx/, "")
  );
  return paths;
}

export async function getSlugs() {
  const articles = globSync(blogMdxDirs);

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
        readingTime: readingTime("source").text,
        originPath: articleSlug,
      });
    } else {
    }
  }
  const slugs = convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .map((a: any) => a.frontmatter.slug.replace(/(\/|\\)+/g, "").trim());

  return slugs;
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
  const articles = globSync(blogMdxDirs);
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
        readingTime: readingTime("source").text,
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
      .slice(start, end + 1),
    totalAmount: articles.length,
  };
}

export async function getAllArticles(limit?: number) {
  const articles = globSync(blogMdxDirs);
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
        readingTime: readingTime("source").text,
        originPath: articleSlug,
      });
    } else {
    }
  }

  return convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .slice(0, limit || undefined);
}

export async function getArticlesByCategory(category: string) {
  const articles = globSync(blogMdxDirs);
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
        readingTime: readingTime("source").text,
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
    .filter((article: any) =>
      article.frontmatter.categories.includes(category)
    );
}

export async function getArticlesByTag(tag: string) {
  const articles = globSync(blogMdxDirs);
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
        readingTime: readingTime("source").text,
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
    .filter((article: any) => article.frontmatter.tags.includes(tag));
}
