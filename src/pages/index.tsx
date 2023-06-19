import Animated from "@/components/Animated";
import Calendar from "@/components/Calendar";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
import { PostDispatchContext, POST_INIT } from "@/context/PostProvider";
import { getAllArticles } from "@/libs/service";
import {
  AUTHOR,
  BRAND_DESC,
  BRAND_LOGO,
  BRAND_NAME,
  MAIN_POST_LIMIT,
} from "@/util/global";
import { slicedBundle } from "@/util/tool";
import {
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC.trim(),
  author: AUTHOR,
  image: BRAND_LOGO,
};

export default function Home({ posts }: any) {
  const postDispatch = useContext(PostDispatchContext);
  const articles = posts.slice(0, 4);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    postDispatch({
      type: POST_INIT.INIT,
      posts: posts || [],
    });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Stack sx={{ flex: 1 }}>
        <GenerateHead metadatas={metadatas} />
        <Box component={"section"}>
          <Animated order={0} animate='fadeInUp'>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(52)}
              fontWeight={700}
              align='center'
              gutterBottom
              fontFamily={`"IBM Plex Sans KR", sans-serif`}>
              Tech. Dev. Write.
            </Typography>
          </Animated>
          <Animated order={1} animate='fadeInUp'>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(16)}
              fontWeight={200}
              align='center'
              fontFamily={`"IBM Plex Sans KR", sans-serif`}>
              서버 분산 아키텍쳐와 보안에 관심이 많은 노드 백엔드 개발자의 기술
              블로그입니다.
            </Typography>
          </Animated>
        </Box>
        <Toolbar />
        <Stack component={"section"} alignItems='center'>
          <Animated order={2} animate='fadeInUp'>
            <MainCard post={articles[0]} />
          </Animated>
          <Toolbar />
          <Stack gap={5}>
            {slicedBundle(isMdUp ? 3 : 1, articles.slice(1)).map((row, i) => (
              <Stack
                key={i}
                direction='row'
                justifyContent={"space-between"}
                gap={5}
                sx={{
                  width: "100%",
                }}>
                {row.map((post, q) => (
                  <Animated card key={q} order={q + 3} animate='fadeInUp'>
                    <Card post={post} />
                  </Animated>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Toolbar />
        <Animated order={articles.length + 3} animate='fadeInUp'>
          <Calendar />
        </Animated>
        <Toolbar />
      </Stack>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const articles = await getAllArticles();

    return {
      props: {
        posts: articles,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
