import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import { getAllArticles, getArticlesByCategory } from "@/libs/service";
import { BRAND_NAME, BRAND_DESC, BRAND_LOGO } from "@/util/global";
import {
  changeHipenToWhiteSpace,
  changeWhiteSpaceToHipen,
  duplicateRemoveArrayFromTag,
} from "@/util/tool";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Stack, Typography, Chip } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import React from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase() + "::Tags",
  description: BRAND_DESC,
  // author: AUTHOR,
  image: BRAND_LOGO,
};

function Index({ tags }: any) {
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
          href={"/tags/"}
          fontSize={(theme) => theme.typography.pxToRem(36)}
          fontWeight={500}
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}>
          Tags
        </Typography>
        <Stack
          direction='row'
          flexWrap={"wrap"}
          gap={1}
          sx={{
            mb: 3,
          }}>
          {tags.map((tag: string) => (
            <Chip
              key={tag}
              component={Link}
              href={"/tags/" + tag.toLowerCase() + "/"}
              label={tag}
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
  const tags = duplicateRemoveArrayFromTag(articles);
  const hipens = tags
    .filter((tag: string) => tag.toLowerCase().match(/[\s]+/g))
    .map((tag: string) => changeWhiteSpaceToHipen(tag));
  return {
    props: {
      tags: [
        ...new Set(
          tags
            .map((tag: any) => tag.toLowerCase())
            .concat(hipens.map((tag: string) => tag.toLowerCase()))
        ),
      ].sort(),
    },
  };
};

export default Index;
