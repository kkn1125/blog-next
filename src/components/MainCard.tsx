import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

import { getReponsiveImageUrl, slugToBlogTrailingSlash } from "@/util/tool";
import anime from "animejs";
import Link from "next/link";
import { AUTHOR } from "@/util/global";

const DESC_LIMIT = 70;

interface CardInfo {
  post: any;
}

function MainCard({ post }: CardInfo) {
  useEffect(() => {
    setTimeout(() => {
      anime({
        target: ".card-test",
        translateY: 270,
        delay: anime.stagger(100),
      });
    }, 1000);
  }, []);

  return (
    <Stack
      direction='row'
      alignItems={"flex-end"}
      sx={{
        position: "relative",
        width: "100%",
        height: 500,
      }}>
      <Box
        component={Link}
        href={slugToBlogTrailingSlash(post.frontmatter.slug)}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // width: "100%",
          // height: "100%",
          content: '""',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${getReponsiveImageUrl(
            post.frontmatter.image
          )})`,
          // maskImage:
          //   "linear-gradient(to right, transparent 0%, #00000036 3%, #000000 5%, #000000 95%, #00000036 97%, transparent 100%)",
          transition: "ease-in-out 150ms",
          filter: "brightness(0.8)",
          "&:hover::before": {
            filter: "brightness(1)",
          },
        }}
      />
      <Stack
        gap={2}
        sx={{
          pt: 3,
          pr: 3,
          pb: 5,
          pl: 10,
          zIndex: 1,
          color: "#ffffff",
        }}>
        <Stack direction='row' gap={1} alignItems='center'>
          <Typography
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(12)}>
            {post.frontmatter.author || AUTHOR}
          </Typography>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
            }}
          />
          <Typography
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(12)}>
            {new Date(post.frontmatter.date.slice(0, -6)).toLocaleString()}
          </Typography>
        </Stack>
        <Typography
          component={Link}
          href={slugToBlogTrailingSlash(post.frontmatter.slug)}
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          fontWeight={700}
          fontSize={(theme) => theme.typography.pxToRem(28)}
          sx={{
            display: "inline-block",
            color: "inherit",
            textDecoration: "none",
          }}>
          {post.frontmatter.title}
        </Typography>
        <Typography
          component={Link}
          href={slugToBlogTrailingSlash(post.frontmatter.slug)}
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          fontWeight={200}
          fontSize={(theme) => theme.typography.pxToRem(16)}
          sx={{
            display: "inline-block",
            color: "inherit",
            textDecoration: "none",
          }}>
          {post.frontmatter.description.slice(0, DESC_LIMIT) + "..."}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default MainCard;
