import { getAllArticles, getArticlesByCategory } from "@/libs/service";
import {
  capitalize,
  duplicateRemoveArrayFromCategory,
  slicedBundle,
} from "@/util/tool";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Pagination,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@/components/Card";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import GenerateHead from "@/components/GenerateHead";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC,
  author: AUTHOR,
};

const PAGINATION_AMOUNT = 6;

function Index({ posts, totalCount }: any) {
  const theme = useTheme();
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    setTotalPageCount(Math.ceil(totalCount / PAGINATION_AMOUNT));
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
      Math.ceil(totalCount / PAGINATION_AMOUNT)
    );
  }, [router.query, posts]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/categories/${router.query.category}/?page=${value}/`);
    setPage((page) => value);
  };

  return (
    <Stack
      component={Container}
      maxWidth='lg'
      sx={{
        height: "100%",
      }}>
      <GenerateHead metadatas={metadatas} />
      <Typography
        fontSize={(theme) => theme.typography.pxToRem(52)}
        fontWeight={500}
        align='center'
        gutterBottom
        fontFamily={`"IBM Plex Sans KR", sans-serif`}>
        🔎 Category [ "{capitalize(router.query.category as string)}" ]
      </Typography>
      <Toolbar />
      <Stack
        gap={5}
        sx={{
          flex: 1,
        }}>
        {slicedBundle(
          useMediaQuery(theme.breakpoints.up("md")) ? 3 : 1,
          postList
        ).map((row, i) => (
          <Stack
            key={i}
            direction='row'
            gap={5}
            sx={{
              width: "100%",
            }}>
            {row.map((post, q) => (
              <Card key={q} post={post} />
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
    </Stack>
  );
}

export default Index;

export async function getStaticProps({ params }: any) {
  try {
    const posts = await getArticlesByCategory(params.category);

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
  const categories = duplicateRemoveArrayFromCategory(articles);
  return {
    paths: categories.map((category: any) => ({
      params: {
        category: category.toLowerCase(),
      },
    })),
    fallback: false,
  };
};
