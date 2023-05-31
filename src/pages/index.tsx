import Calendar from "@/components/Calendar";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
import { getAllArticles } from "@/libs/service";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
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
import { useEffect, useState } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC.trim(),
  author: AUTHOR,
};

const MAIN_POST_LIMIT = 4;

export default function Home({ posts }: any) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Stack sx={{ flex: 1 }}>
        <GenerateHead metadatas={metadatas} />
        <Box component={"section"}>
          <Typography
            fontSize={(theme) => theme.typography.pxToRem(52)}
            fontWeight={700}
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
          <MainCard post={posts[0]} />
          <Toolbar />
          <Stack gap={5}>
            {slicedBundle(isMdUp ? 3 : 1, posts.slice(1)).map((row, i, o) => (
              <Stack
                key={i}
                direction='row'
                justifyContent={"space-between"}
                gap={5}
                sx={{
                  width: "100%",
                }}>
                {row.map((post, q) => (
                  <Card key={q} post={post} order={i * o.length + q} />
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Toolbar />
        <Calendar />
        <Toolbar />
      </Stack>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const articles = await getAllArticles(MAIN_POST_LIMIT);

    return {
      props: {
        posts: articles,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
