import Animated from "@/components/Animated";
import Calendar from "@/components/Calendar";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
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
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Script from "next/script";

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
  const [typerJs, setTyperJs] = useState("");

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/kkn1125/typer@vv100/typer.js")
      .then((res) => res.text())
      .then((js) => {
        setTyperJs(js);
      });
  }, []);

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
              align='center'
              gutterBottom
              fontFamily={`"IBM Plex Sans KR", sans-serif`}>
              Devlog.
            </Typography>
          </Animated>
          <Animated order={1} animate='fadeInUp'>
            <Typography
              data-typer-name='mainword'
              fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.S)}
              fontWeight={200}
              align='center'
              fontFamily={`"IBM Plex Sans KR", sans-serif`}>
              {MAIN_SUBSCRIPTION}
            </Typography>
          </Animated>
        </Box>
        <Toolbar />
        <Stack component={"section"}>
          <Animated order={2} animate='fadeInUp'>
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
                  <Animated card key={q} order={q + 3} animate='fadeInUp'>
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
      {typerJs && (
        <Script
          data-nscript='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            ${typerJs}

            const typer = Typer.init({
                typer: {
                  words: {
                    mainword: [
                      "문제 상황이나 궁금했던 부분에 대해 공부하고 블로그에 기록합니다."
                    ]
                  },
                  speed: 1,
                  delay: 1,
                  loop: true,
                  loopDelay: 10,
                  // start: 0.3,
                  eraseMode: true,
                  eraseSpeed: 0.1,
                  realTyping: true,
                  style: {
                      cursorBlink: 'horizontal'
                  },
                }
            });
          `,
          }}></Script>
      )}
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
