import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import { getAllArticles } from "@/libs/service";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import { slicedBundle } from "@/util/tool";
import { Box, Stack, Toolbar, Typography } from "@mui/material";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC,
  author: AUTHOR,
};

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
      <Stack component={"section"}>
        {slicedBundle(3, posts).map((row, i) => (
          <Stack key={i} direction='row' justifyContent={"center"} gap={10}>
            {row.map((post, q) => (
              <Card
                key={q}
                title={post.title}
                author={post.author || AUTHOR}
                createdAt={post.date}
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
    const articles = await getAllArticles();

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
