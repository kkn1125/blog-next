import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
import { getAllArticles } from "@/libs/service";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import { slicedBundle } from "@/util/tool";
import { Box, Stack, Toolbar, Typography } from "@mui/material";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC,
  author: AUTHOR,
};

const MAIN_POST_LIMIT = 4;

export default function Home({ posts }: any) {
  return (
    <Stack sx={{ flex: 1 }}>
      <GenerateHead metadatas={metadatas} />
      <Box component={"section"}>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(52)}
          fontWeight={500}
          align='center'
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          Tech. Dev. Write.
        </Typography>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(16)}
          fontWeight={200}
          align='center'
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          서버 분산 아키텍쳐와 보안에 관심이 많은 노드 백엔드 개발자의 기술
          블로그입니다.
        </Typography>
      </Box>
      <Toolbar />
      <Stack component={"section"} alignItems='center'>
        <MainCard
          slug={posts[0].frontmatter.slug}
          title={posts[0].frontmatter.title}
          author={posts[0].frontmatter.author || AUTHOR}
          createdAt={posts[0].frontmatter.date}
          ordering={1}
        />
        <Toolbar />
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(48)}
          fontWeight={300}
          align='center'
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          Latest Posts
        </Typography>
        {slicedBundle(3, posts.slice(1)).map((row, i) => (
          <Stack
            key={i}
            direction='row'
            justifyContent={"space-between"}
            gap={10}
            sx={{
              width: "100%",
            }}>
            {row.map((post, q) => (
              <Card
                key={q}
                slug={post.frontmatter.slug}
                title={post.frontmatter.title}
                author={post.frontmatter.author || AUTHOR}
                createdAt={post.frontmatter.date}
                ordering={i * q}
              />
            ))}
          </Stack>
        ))}
      </Stack>
      <Toolbar />
    </Stack>
  );
}

export async function getStaticProps() {
  try {
    const articles = await getAllArticles(MAIN_POST_LIMIT);

    articles
      .map((article: any) => article.data)
      .sort(
        (
          a: { data: { publishedAt: number } },
          b: { data: { publishedAt: number } }
        ) => {
          if (a.data.publishedAt > b.data.publishedAt) return 1;
          if (a.data.publishedAt < b.data.publishedAt) return -1;

          return 0;
        }
      );

    return {
      props: {
        posts: articles.reverse(),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
