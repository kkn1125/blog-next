import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import { PostContext } from "@/context/PostProvider";
import {
  BRAND_LOGO,
  BRAND_NAME,
  MAIN_SUBSCRIPTION,
  TITLE_SIZE,
} from "@/util/global";
import {
  changeWhiteSpaceToHipen,
  duplicateRemoveArrayFromTag,
} from "@/util/tool";
import { Chip, Container, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase() + "::Tags",
  description: MAIN_SUBSCRIPTION.trim(),
  // author: AUTHOR,
  image: BRAND_LOGO,
};

function Index(/* { tags }: any */) {
  const { posts } = useContext(PostContext);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const tags = duplicateRemoveArrayFromTag(posts);
    const hipens = tags
      .filter((tag: string) => tag.match(/[\s]+/g))
      .map((tag: string) => changeWhiteSpaceToHipen(tag));
    const removeDuplicates = [
      ...new Set(tags.concat(hipens.map((tag: string) => tag.toLowerCase()))),
    ].sort();
    setTags(removeDuplicates);
  }, [posts]);

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
          fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.L)}
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
      </Animated>
      <Animated order={1} animate='fadeInUp'>
        <Stack
          direction='row'
          flexWrap={"wrap"}
          gap={1}
          sx={{
            my: 3,
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

// export const getStaticProps = async () => {
//   const articles = await getAllArticles();
//   const tags = duplicateRemoveArrayFromTag(articles);
//   const hipens = tags
//     .filter((tag: string) => tag.match(/[\s]+/g))
//     .map((tag: string) => changeWhiteSpaceToHipen(tag));
//   const removeDuplicates = [
//     ...new Set(tags.concat(hipens.map((tag: string) => tag.toLowerCase()))),
//   ].sort();
//   return {
//     props: {
//       tags: removeDuplicates,
//     },
//   };
// };

export default Index;
