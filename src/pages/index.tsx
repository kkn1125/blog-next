import Animated from "@/components/Animated";
import Calendar from "@/components/Calendar";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import MainCard from "@/components/MainCard";
import { getAllArticles } from "@/libs/service";
import { CommentContext, findComment } from "@/context/CommentProvider";
import {
  BRAND_DESC,
  BRAND_LOGO,
  BRAND_NAME,
  MAIN_SUBSCRIPTION,
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
import { useContext } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC.trim(),
  // author: AUTHOR,
  image: BRAND_LOGO,
};

export default function Home({ posts }: any) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // const router = useRouter();
  // console.log(router);

  // useEffect(() => {}, [router.asPath]);
  const { comments } = useContext(CommentContext);

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
              {MAIN_SUBSCRIPTION}
            </Typography>
          </Animated>
        </Box>
        <Toolbar />
        <Stack component={"section"} alignItems='center'>
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
    </Container>
  );
}

export async function getStaticProps() {
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
