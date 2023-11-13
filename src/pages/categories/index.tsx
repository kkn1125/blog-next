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
  duplicateRemoveArrayFromCategory,
} from "@/util/tool";
import { Chip, Container, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase() + "::Categories",
  description: MAIN_SUBSCRIPTION.trim(),
  // author: AUTHOR,
  image: BRAND_LOGO,
};

function Index(/* { categories }: any */) {
  const { posts } = useContext(PostContext);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = duplicateRemoveArrayFromCategory(posts);
    const hipens = categories
      .filter((category: string) => category.match(/[\s]+/g))
      .map((category: string) => changeWhiteSpaceToHipen(category));
    const removeDuplicates = [
      ...new Set(
        categories.concat(
          hipens.map((category: string) => category.toLowerCase())
        )
      ),
    ].sort();
    setCategories(removeDuplicates);
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
          href={"/categories/"}
          fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.M)}
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
      </Animated>
      <Animated order={1} animate='fadeInUp'>
        <Stack
          direction='row'
          flexWrap={"wrap"}
          gap={1}
          sx={{
            my: 3,
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

// export const getStaticProps = async () => {
//   const articles = await getAllArticles();
//   const categories = duplicateRemoveArrayFromCategory(articles);
//   const hipens = categories
//     .filter((category: string) => category.toLowerCase().match(/[\s]+/g))
//     .map((category: string) => changeWhiteSpaceToHipen(category));
//   return {
//     props: {
//       categories: [
//         ...new Set(
//           categories
//             .map((category: any) => category.toLowerCase())
//             .concat(hipens.map((category: string) => category.toLowerCase()))
//         ),
//       ].sort(),
//     },
//   };
// };

export default Index;
