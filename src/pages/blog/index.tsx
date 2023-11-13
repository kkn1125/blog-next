import Animated from "@/components/Animated";
import Card from "@/components/Card";
import GenerateHead from "@/components/GenerateHead";
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
  Button,
  Container,
  Pagination,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { memo, useContext, useEffect, useState } from "react";

const metadatas = {
  title: `${BRAND_NAME.toUpperCase()}::Blog`,
  description: MAIN_SUBSCRIPTION.trim(),
  // author: AUTHOR,
  image: BRAND_LOGO,
};

const PAGINATION_AMOUNT = 6;

function Index(/* { posts, totalCount }: any */) {
  const theme = useTheme();
  const router = useRouter();

  const { posts } = useContext(PostContext);
  const { comments: commentList } = useContext(CommentContext);

  const [postList, setPostList] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    return () => {
      setPostList((postList) => []);
    };
  }, []);

  useEffect(() => {
    const currentPage = Number(router.query.page?.slice(0, -1)) || 1;
    const start = (currentPage - 1) * PAGINATION_AMOUNT;
    const end = PAGINATION_AMOUNT * currentPage;
    setPage((page) => currentPage);
    setPostList((postList) => posts.slice(start, end));
    setTotalPageCount((totalPageCount) =>
      Math.ceil(posts.length / PAGINATION_AMOUNT)
    );
  }, [router.query, posts]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/blog/?page=${value}/`);
    setPage((page) => value);
  };

  const handleRedirectToCategory = (to: string = "") => {
    router.push(location.origin + "/categories/" + (to ? to + "/" : ""));
  };
  const handleRedirectToTag = (to: string = "") => {
    router.push(location.origin + "/tags/" + (to ? to + "/" : ""));
  };

  return (
    <Stack
      component={Container}
      maxWidth='lg'
      sx={{
        height: "100%",
      }}>
      <Toolbar />
      <GenerateHead metadatas={metadatas} />
      <Stack sx={{ flex: 1 }}>
        <Animated order={0} animate='fadeInUp'>
          <Typography
            fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.L)}
            fontWeight={500}
            gutterBottom
            fontFamily={`"IBM Plex Sans KR", sans-serif`}>
            All Blogs
          </Typography>
        </Animated>
        <Animated order={1} animate='fadeInUp'>
          <Stack direction='row' gap={1} sx={{ mb: 3 }}>
            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={() => handleRedirectToCategory()}>
              카테고리 보기
            </Button>
            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={() => handleRedirectToTag()}>
              태그 보기
            </Button>
          </Stack>
        </Animated>
      </Stack>
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
            {row.map((post, q) =>
              post ? (
                <Animated
                  card
                  key={q}
                  order={i * o.length + q + 2}
                  animate='fadeInUp'>
                  <Card
                    post={post}
                    comment={findComment(commentList, post.frontmatter.slug)}
                  />
                </Animated>
              ) : (
                <div key={q} style={{ flex: "1 1 100%" }}></div>
              )
            )}
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

export default memo(Index);

/* export const getStaticProps = async () => {
  const posts = await getAllArticles();

  return {
    props: {
      posts: posts,
      totalCount: posts.length,
    },
  };
}; */

/* post paginations */
// export const getStaticProps = async ({ params }: any) => {
//   const currentPage = Number(params.page);
//   const start = (currentPage - 1) * PAGINATION_AMOUNT;
//   const end = PAGINATION_AMOUNT * currentPage;
//   const { posts, totalAmount } = await getPaginationArticles(start, end);

//   return {
//     props: {
//       posts: posts,
//       totalCount: totalAmount,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   if (process.env.SKIP_BUILD_STATIC_GENERATION) {
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }

//   const posts = await getAllArticles();

//   const totalPages = Math.ceil(posts.length / PAGINATION_AMOUNT);
//   const dummyArray = new Array(totalPages).fill(0);

//   return {
//     paths: dummyArray.map((num, i) => ({
//       params: {
//         page: String(i + 1),
//       },
//     })),
//     fallback: false,
//   };
// };
