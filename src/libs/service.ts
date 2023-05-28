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
  // const paths = sync(`${basePath}/*.mdx`);
  // const articles = globSync(blogMdxDirs);

  // const pathList = articles.map((path) => {
  //   // holds the paths to the directory of the article
  //   const pathContent = path.split(/\/+|\\+/);
  //   const fileName = pathContent[pathContent.length - 1];
  //   const [slug, _extension] = fileName.split(".");

  //   return slug;
  // });
  // console.log('pathList',pathList)
  const articles = globSync(blogMdxDirs);
  console.log(articles);

  let convert: any = [];

  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    const source = fs.readFileSync(path.join(articleSlug), "utf-8");

    const mdx = await serializeMdx(source);
    const { data } = matter(source);

    const sources = mdx || data;

    // console.log("data", sources);

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        // slug: articleSlug.replace(".mdx", "").replace(/(\\|\/)+/, '/'),
        readingTime: readingTime("source").text,
        originPath: articleSlug,
      });
    } else {
      // return allArticles;
    }
  }
  const slugs = convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .map((a: any) => a.frontmatter.slug.replace(/(\/|\\)+/g, "").trim());

  // const slugs = articles.map((article: any) =>
  //   article.slug.replace(/(\/|\\)+/g, "").trim()
  // );
  return slugs;
}

export async function getArticleFromSlug(slug: string) {
  // const articleDir = path.join(articlesPath, `${slug}.mdx`);

  // const source = execSync(`cat ${articleDir}`).toString('utf-8')

  // const articles = globSync("src/database/**/*.mdx");
  // console.log(articles);

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
  // const sources = serializeMdx(source);
  // return sources;
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

    // console.log("data", sources);

    if (articleSlug.match(/\.md(x)?/)) {
      convert.push({
        ...sources,
        // slug: articleSlug.replace(".mdx", "").replace(/(\\|\/)+/, '/'),
        readingTime: readingTime("source").text,
        originPath: articleSlug,
      });
    } else {
      // return allArticles;
    }
  }

  // const convert = await articles.reduce(
  //   async (allArticles: any, articleSlug) => {
  //     // get parsed data from mdx files in the "articles" dir
  //     const source = fs.readFileSync(path.join(articleSlug), "utf-8");

  //     const mdx = await serializeMdx(source);
  //     const { data } = matter(source);

  //     const sources = mdx || data;

  //     // console.log("data", sources);

  //     if (articleSlug.match(/\.md(x)?/)) {
  //       return [
  //         {
  //           ...sources,
  //           // slug: articleSlug.replace(".mdx", "").replace(/(\\|\/)+/, '/'),
  //           readingTime: readingTime("source").text,
  //           originPath: articleSlug,
  //         },
  //         ...allArticles,
  //       ];
  //     } else {
  //       return allArticles;
  //     }
  //   },
  //   []
  // );
  return convert
    .sort((a: any, b: any) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date)
    )
    .slice(0, limit || undefined);
}

export async function getArticlesByCategory(category: string) {
  const articles = globSync(blogMdxDirs);
  console.log('articles???',articles)
  return articles
    .reduce((allArticles: any, articleSlug) => {
      // get parsed data from mdx files in the "articles" dir
      const source = fs.readFileSync(
        path.join(process.cwd(), basePath, articleSlug),
        "utf-8"
      );
      const { data } = matter(source);

      if (articleSlug.match(/\.mdx/)) {
        return [
          {
            ...data,
            slug: articleSlug.replace(".mdx", ""),
            readingTime: readingTime(source).text,
          },
          ...allArticles,
        ];
      } else {
        return allArticles;
      }
    }, [])
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .filter((article: any) => article.categories === category);
}
