import { MDX_REMOTE_OPTIONS } from "@/util/global";
import { filterByCategory, filterByTag, removeSlashForSlug } from "@/util/tool";
import { Article } from "@/util/types";
import fs from "fs";
import { globSync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const metapostLocation = path.join(
  path.resolve(),
  "src/database/metapost/posts.json"
);

const IS_TEST_MODE = process.env.NODE_ENV === "development";

const customGlob = (globCondition: string | string[]) => {
  return globSync(globCondition);
};

/* 슬러그만 배열로 추출 */
export async function getOnlySlugs() {
  const articles = await getAllArticles();
  const slugs = articles.map((a: any) =>
    removeSlashForSlug(a.frontmatter.slug)
  );
  return slugs;
}

/* 현재 포스팅 및 앞, 뒤 포스팅 반환 */
export async function findArticleFromSlugAndBothSideArticles(slug: string) {
  const articles = await getAllArticles();
  const centerIndex = articles.findIndex(
    (article) => removeSlashForSlug(article.frontmatter.slug) === slug
  );
  const prevArticle = articles.at(centerIndex - 1);
  const currentArticle = articles.at(centerIndex);
  const nextArticle = articles.at(centerIndex + 1);

  return {
    prev: prevArticle,
    current: currentArticle,
    next: nextArticle,
  };
}

/* 포스트 페이지별로 가져오기 */
export async function getPaginationArticles(start: number, end: number) {
  const articles = await getAllArticles();
  return {
    posts: articles.slice(start, end + 1),
    totalAmount: articles.length,
  };
}

/* 단일 포스트 찾기 */
export async function findArticleBySlug(slug: string) {
  const filePath = findArticlePathBySlug(slug);
  return await readFileAndGetSerializedPostMetadata(filePath);
}
/* 단일 포스트 찾기 - 모듈 1 */
export function findArticlePathBySlug(slug: string) {
  const slugName = slug.replace(/\/+/g, "").trim();
  const articlePath = customGlob(`src/database/**/*${slugName}.{md,mdx}`)[0];
  if (!articlePath) {
    throw new ReferenceError(`Could not found article. [${slugName}]`);
  }
  return articlePath;
}
/* 단일 포스트 찾기 - 모듈 2 */
async function readFileAndGetSerializedPostMetadata(
  filePath: string
): Promise<Article | null> {
  const file = fs.readFileSync(path.join(filePath), "utf-8");
  const source = await serialize(file.trim(), MDX_REMOTE_OPTIONS);

  const { content, data } = matter(file);
  const mdxData = (source || data) as unknown as Article;

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
/* 전체 포스트 찾기 */
export async function getAllArticles(limit?: number): Promise<Article[]> {
  const metapost = fs.readFileSync(metapostLocation);
  const metapostJSON = JSON.parse(metapost.toString() || "[]") as Article[];

  const json = IS_TEST_MODE
    ? metapostJSON.slice(0, limit)
    : (await findAllArticles()).slice(0, limit);
  return json;
}

export async function findAllArticles() {
  const articles = customGlob(`src/database/**/*.{md,mdx}`) as string[];
  let convert: Article[] = [];
  for (let i = 0; i < articles.length; i++) {
    const articleSlug = articles[i];
    if (articleSlug.match(/\.md(x)?/)) {
      const article = await readFileAndGetSerializedPostMetadata(articleSlug);
      if (article) convert.push(article);
    }
  }
  const result = convert.sort((a: any, b: any) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date)
  );
  return result;
}

/* 카테고리 검색 로직 변경 */
export async function getArticlesByCategory(category: string) {
  const articles = await getAllArticles();

  return articles.filter(filterByCategory(category));
}
/* 태그 검색 로직 변경 */
export async function getArticlesByTag(tag: string) {
  const articles = await getAllArticles();
  return articles.filter(filterByTag(tag));
}
