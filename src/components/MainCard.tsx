import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";

import { AUTHOR } from "@/util/global";
import { getReponsiveImageUrl, slugToBlogTrailingSlash } from "@/util/tool";
import anime from "animejs";
import Link from "next/link";
import { ThemeContext } from "@emotion/react";
import { ColorModeContext } from "@/context/ThemeModeProvider";

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

  const theme = useContext(ColorModeContext);

  const colors = () => (theme.mode() !== "light" ? "#000000" : "#ffffff");

  return (
    <Stack
      direction='row'
      alignItems={"flex-end"}
      sx={{
        position: "relative",
        width: "100%",
        height: 500,
        color: "#ffffff",
        "& a": {
          transition: "150ms ease-in-out",
        },
        // "& *": {
        //   textShadow: `-0.5px -0.5px 0 ${colors()}, 0.5px -0.5px 0 ${colors()}, -0.5px 0.5px 0 ${colors()}, 0.5px 0.5px 0 ${colors()}`,
        // },
        // "& > .MuiTypography-root": {
        //   color: `${colors()} !important`,
        // },
        // "&:hover :is(a, .time)": {
        //   color: "#000000",
        // },
        // "& .dot": {
        //   backgroundColor: "#ffffff",
        // },
        // "&:hover > *": {
        //   filter: "brightness(1)",
        //   color: "#000000",
        // },
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
          filter: "brightness(0.55)",
        }}
      />
      <Stack
        gap={2}
        sx={{
          pt: 3,
          pr: 3,
          pb: 5,
          pl: 5,
          zIndex: 1,
          // color: "#ffffff",
        }}>
        <Stack direction='row' gap={1} alignItems='center' className='time'>
          <Typography
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(12)}>
            {post.frontmatter.author || AUTHOR}
          </Typography>
          <Box
            className='dot'
            sx={{
              // width: 5,
              // height: 5,
              borderRadius: "50%",
              // backgroundColor: "#ffffff",
              fontSize: 8,
            }}
            children={"●"}
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
