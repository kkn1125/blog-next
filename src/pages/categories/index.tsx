import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import { getAllArticles, getArticlesByCategory } from "@/libs/service";
import { BRAND_NAME, BRAND_DESC, BRAND_LOGO } from "@/util/global";
import {
  changeHipenToWhiteSpace,
  changeWhiteSpaceToHipen,
  duplicateRemoveArrayFromCategory,
} from "@/util/tool";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Stack, Typography, Chip } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import React from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase() + "::Categories",
  description: BRAND_DESC,
  // author: AUTHOR,
  image: BRAND_LOGO,
};

function Index({ categories }: any) {
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
          component={Link}
          href={"/categories/"}
          fontSize={(theme) => theme.typography.pxToRem(36)}
          fontWeight={500}
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}>
          Categories
        </Typography>
        <Stack
          direction='row'
          flexWrap={"wrap"}
          gap={1}
          sx={{
            mb: 3,
          }}>
          {categories.map((category: string) => (
            <Chip
              key={category}
              component={Link}
              href={"/categories/" + category + "/"}
              label={category}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: `"IBM Plex Sans KR", sans-serif`,
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.success.main,
                },
              }}
            />
          ))}
        </Stack>
      </Animated>
    </Stack>
  );
}

export const getStaticProps = async () => {
  const articles = await getAllArticles();
  const categories = duplicateRemoveArrayFromCategory(articles);
  const hipens = categories
    .filter((category: string) => category.toLowerCase().match(/[\s]+/g))
    .map((category: string) => changeWhiteSpaceToHipen(category));
  return {
    props: {
      categories: [
        ...new Set(
          categories
            .map((category: any) => category.toLowerCase())
            .concat(hipens.map((category: string) => category.toLowerCase()))
        ),
      ].sort(),
    },
  };
};

export default Index;
