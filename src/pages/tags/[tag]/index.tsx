import Animated from "@/components/Animated";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
import { getAllArticles, getArticlesByTag } from "@/libs/service";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import {
  capitalize,
  duplicateRemoveArrayFromTag,
  slicedBundle,
} from "@/util/tool";
import {
  Container,
  Pagination,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PAGINATION_AMOUNT = 6;

function Index({ posts, totalCount }: any) {
  const theme = useTheme();
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const metadatas = {
    title: BRAND_NAME.toUpperCase() + "::Tag" + "-" + router.query.tag,
    description: BRAND_DESC,
    author: AUTHOR,
  };

  useEffect(() => {
    setTotalPageCount(Math.ceil(totalCount / PAGINATION_AMOUNT));
  }, []);

  useEffect(() => {
    const currentPage = Number(router.query.page?.slice(0, -1)) || 1;
    const start = (currentPage - 1) * PAGINATION_AMOUNT;
    const end = PAGINATION_AMOUNT * currentPage;
    setPage((page) => currentPage);
    setPostList((postList) => posts.slice(start, end));
    setTotalPageCount((totalPageCount) =>
      Math.ceil(totalCount / PAGINATION_AMOUNT)
    );
  }, [router.query, posts]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/tags/${router.query.tag}/?page=${value}/`);
  };

  return (
    <Stack
      component={Container}
      maxWidth='lg'
      sx={{
        height: "100%",
      }}>
      <GenerateHead metadatas={metadatas} />
      <Toolbar />
      <Animated order={0} animate='fadeInUp'>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(52)}
          fontWeight={500}
          align='center'
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          🔎 Tag ["{capitalize(router.query.tag as string)}"]
        </Typography>
      </Animated>
      <Toolbar />
      <Stack
        gap={5}
        sx={{
          flex: 1,
        }}>
        {slicedBundle(
          useMediaQuery(theme.breakpoints.up("md")) ? 3 : 1,
          postList
        ).map((row, i, o) => (
          <Stack
            key={i}
            direction='row'
            gap={5}
            sx={{
              width: "100%",
            }}>
            {row.map((post, q) => (
              <Animated key={q} order={i * o.length + q + 1} animate='fadeInUp'>
                <Card post={post} />
              </Animated>
            ))}
          </Stack>
        ))}
      </Stack>
      <Toolbar />
      <Stack spacing={2} alignItems='center'>
        <Pagination
          size='large'
          defaultPage={1}
          page={page}
          count={totalPageCount}
          shape='rounded'
          onChange={handleChange}
        />
      </Stack>
      <Toolbar />
    </Stack>
  );
}

export default Index;

export async function getStaticProps({ params }: any) {
  try {
    const posts = await getArticlesByTag(params.tag);
    return {
      props: {
        posts: posts,
        totalCount: posts.length,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export const getStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const articles = await getAllArticles();
  const tags = duplicateRemoveArrayFromTag(articles);
  return {
    paths: tags.map((tag: any) => ({
      params: {
        tag: tag.toLowerCase(),
      },
    })),
    fallback: false,
  };
};
