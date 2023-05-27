import { convertDate } from "@/util/tool";
import fs from "fs";
import { glob, globSync, sync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const basePath = "src/database/**/*.mdx";

const blogMdxDirs = ['src/database/**/*.md', 'src/database/**/*.mdx']

export const serializeMdx = (source: string) => {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: "mdx",
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
  const articles = await getAllArticles();
  const slugs = articles.map((article: any) => article.slug.replace(/(\/|\\)+/g, '').trim());
  return slugs;
}

export async function getArticleFromSlug(slug: string) {
  // const articleDir = path.join(articlesPath, `${slug}.mdx`);

  // const source = execSync(`cat ${articleDir}`).toString('utf-8')

  const articles = await getAllArticles();
  const article = articles.find((article: any) => article.slug.match(slug))
  const source = fs.readFileSync(article.originPath) as unknown as string;
  const { content, data } = matter(source);
  console.log(data)
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

export async function getAllArticles(limit?: number) {
  const articles = globSync(blogMdxDirs);

  return articles.reduce((allArticles: any, articleSlug) => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(articleSlug),
      "utf-8"
    );
    const { data } = matter(source);

    if (articleSlug.match(/\.md(x)?/)) {
      return [
        {
          ...data,
          // slug: articleSlug.replace(".mdx", "").replace(/(\\|\/)+/, '/'),
          readingTime: readingTime(source).text,
          originPath: articleSlug
        },
        ...allArticles,
      ];
    } else {
      return allArticles;
    }
  }, []).sort((a: any, b: any) => b.date.localeCompare(a.date)).slice(0, limit || undefined);
}

export async function getArticlesByCategory(category: string) {
  const articles = globSync(blogMdxDirs);
  return articles.reduce((allArticles: any, articleSlug) => {
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
  }, []).sort((a: any, b: any) => b.date.localeCompare(a.date)).filter((article: any) => article.categories === category);
}