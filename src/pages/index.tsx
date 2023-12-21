import Animated from "@/components/Animated";
import Calendar from "@/components/Calendar";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
import Typings from "@/components/Typings";
import { CommentContext, findComment } from "@/context/CommentProvider";
import { PostContext } from "@/context/PostProvider";
import {
  BRAND_LOGO,
  BRAND_NAME,
  MAIN_SUBSCRIPTION,
  TITLE_SIZE,
} from "@/util/global";
import { slicedBundle } from "@/util/tool";
import { Article } from "@/util/types";
import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: MAIN_SUBSCRIPTION.trim(),
  // author: AUTHOR,
  image: BRAND_LOGO,
};

export default function Home(/* { posts }: any */) {
  const { posts: postList } = useContext(PostContext);
  const [posts, setPosts] = useState<Article[]>([]);
  const { comments } = useContext(CommentContext);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setPosts(postList.slice(0, 4));
  }, [postList]);

  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Stack sx={{ flex: 1 }}>
        <GenerateHead metadatas={metadatas} />
        <Box component={"section"}>
          <Animated order={0} animate='fadeInUp'>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.L)}
              fontWeight={700}
              gutterBottom
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                textAlign: { xs: "left", lg: "center" },
              }}>
              Devlog.
            </Typography>
          </Animated>
          <Animated order={1} animate='fadeInUp'>
            <Typings
              id='main-word'
              builder
              config={{
                speed: { write: 2 },
              }}
              processes={[
                { action: "write", value: MAIN_SUBSCRIPTION },
                { action: "pause", value: 1 },
                { action: "allErase" },
                { action: "write", value: "공부하기 위해" },
                { action: "erase", value: 3 },
                { action: "pause", value: 1 },
                { action: "erase", value: 1 },
                {
                  action: "write",
                  value: "거나 문제 해결한 내용을 공유하",
                  speed: 2,
                },
                { action: "pause", value: 0.2 },
                { action: "write", value: "고" },
                { action: "pause", value: 0.5 },
                { action: "erase", value: 1 },
                { action: "write", value: "기 위해", speed: 1 },
                { action: "write", value: " 작성합", speed: 2.5 },
                { action: "move", value: -3 },
                { action: "write", value: "글을 " },
                { action: "move", value: 3 },
                { action: "write", value: "니다." },
                { action: "pause", value: 1 },
                { action: "forever" },
              ]}
              fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.S)}
              fontWeight={200}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                textAlign: { xs: "left", lg: "center" },
              }}
            />
          </Animated>
        </Box>
        <Toolbar />
        <Box component={"section"}>
          <Animated order={1} animate='fadeInUp'>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.M)}
              fontWeight={500}
              gutterBottom
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                textAlign: { xs: "left", lg: "center" },
              }}>
              📢 블로그 소식
            </Typography>
          </Animated>
          <Animated order={2} animate='fadeInUp'>
            <Stack
              direction='row'
              justifyContent={{
                xs: "flex-start",
                lg: "center",
              }}
              gap={1}
              sx={{
                fontFamily: `"IBM Plex Sans KR", sans-serif`,
                fontWeight: 200,
                fontSize: (theme) => theme.typography.pxToRem(TITLE_SIZE.S),
                mb: 2,
              }}>
              <Button
                variant='contained'
                color='inherit'
                component={Link}
                target='_blank'
                href='https://www.npmjs.com/package/typoz?activeTab=readme'
                startIcon={
                  <svg
                    role='img'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#CB3837'
                    width='18'
                    height='18'>
                    <title>npm</title>
                    <path d='M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z' />
                  </svg>
                }>
                Typoz
              </Button>
              <Button
                variant='contained'
                color='success'
                component={Link}
                target='_blank'
                href='https://anyrequest.github.io/typoz/'
                startIcon={
                  <Box
                    component='img'
                    width={15}
                    src='https://anyrequest.github.io/typoz/logo/typoz-logo-w-fit.png'
                    alt='typoz logo'
                  />
                }>
                Typoz Docs
              </Button>
            </Stack>
            <Typings
              id='sub-word'
              fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.S)}
              fontWeight={200}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                textAlign: { xs: "left", lg: "center" },
              }}
              words={[
                "다양한 옵션으로 원하는 효과를 만들어보세요!",
                "애니메이션 효과나 환경에 맞추어 개발 테스트를 하고 있습니다 😁",
                "umd, esm, cjs 모두 사용 가능하며 react에서 로드 시점 문제를 해결하기 위해 예시 컴포넌트 또한 준비되어 있습니다.",
              ]}>
              typoz는 사용자가 직접 입력하는 효과를 편하게 구현하기 위해 직접
              제작한 오픈소스 라이브러리입니다.
            </Typings>
          </Animated>
        </Box>
        <Toolbar />
        <Stack component={"section"}>
          <Animated order={3} animate='fadeInUp'>
            <MainCard post={posts[0]} />
          </Animated>
          <Toolbar />
          <Stack gap={5}>
            {slicedBundle(isMdUp ? 3 : 1, posts.slice(1)).map((row, i) => (
              <Stack
                key={i}
                direction='row'
                justifyContent={"space-between"}
                gap={5}
                sx={{
                  width: "100%",
                }}>
                {row.map((post, q) => (
                  <Animated card key={q} order={q + 4} animate='fadeInUp'>
                    <Card
                      post={post}
                      comment={findComment(comments, post.frontmatter.slug)}
                    />
                  </Animated>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Toolbar />
        <Animated order={posts.length + 3} animate='fadeInUp'>
          <Calendar />
        </Animated>
        <Toolbar />
      </Stack>
    </Container>
  );
}

/* export async function getStaticProps() {
  try {
    const articles = await getAllArticles(4);
    return {
      props: {
        posts: articles,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
 */
