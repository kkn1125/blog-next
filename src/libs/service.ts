import { MDX_REMOTE_OPTIONS } from "@/util/global";
import { filterByCategory, filterByTag, removeSlashForSlug } from "@/util/tool";
import { Article } from "@/util/types";
import fs from "fs";
import { globSync } from "glob";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const metapostLocation = "src/database/metapost/posts.json";
const basePath = "src/database/**/*.mdx";
const blogMdxDirs = ["src/database/**/*.md", "src/database/**/*.mdx"];
const articlesPath = path.join(process.cwd(), basePath);

const IS_TEST_MODE = process.env.RUN_MODE === "test";
const IS_REFRESH_MODE = process.env.RUN_MODE === "refresh";
const SLICE_FOR_TEST_RUN_AMOUNT = +(process.env.RUN_LIMIT || 20);

let isSamePost = false;

if (IS_REFRESH_MODE) {
  console.log("✅ start refresh mode, now comparing with metapost.json");
  console.log("🌟 no use this option: SLICE_FOR_TEST_RUN");
}

if (IS_TEST_MODE) {
  console.log("✅ start test mode, use this option: SLICE_FOR_TEST_MODE");
  console.log("✅ SLICE_FOR_TEST_RUN_AMOUNT", SLICE_FOR_TEST_RUN_AMOUNT);
}

const metapostSave = async () => {
  const posts = await getAllArticles();
  const metapostLocation = path.join(
    path.resolve(),
    "src/database/metapost/posts.json"
  );
  const saveCurrent = JSON.stringify(posts, null, 2);
  try {
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
    console.log("✅ now is same as before");
    isSamePost = true;
  } finally {
    console.log("✨ success !");
  }
};

if (IS_REFRESH_MODE) {
  setTimeout(async () => {
    metapostSave();
  }, 1000);
}

const SLICE_FOR_TEST_RUN = (array: any[], limitSize: number) => {
  return array.slice(0, IS_TEST_MODE ? limitSize : undefined);
};

const customGlob = (globCondition: string | string[]) => {
  return SLICE_FOR_TEST_RUN(globSync(globCondition), SLICE_FOR_TEST_RUN_AMOUNT);
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
  // console.log(IS_TEST_MODE, metapostJSON)
  return json;
}

export async function findAllArticles() {
  const articles = customGlob(blogMdxDirs) as string[];
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
  // .slice(0, limit || undefined);
  return SLICE_FOR_TEST_RUN(result, SLICE_FOR_TEST_RUN_AMOUNT);
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
