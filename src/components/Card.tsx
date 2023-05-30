import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

import { AUTHOR } from "@/util/global";
import { getReponsiveImageUrl, slugToBlogTrailingSlash } from "@/util/tool";
import anime from "animejs";
import Link from "next/link";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import TagIcon from "@mui/icons-material/Tag";
import { useRouter } from "next/router";

interface CardInfo {
  post: any;
  order?: number;
}

function Card({ post, order = 0 }: CardInfo) {
  const router = useRouter();

  useEffect(() => {
    // setTimeout(() => {
    //   anime({
    //     target: ".card-test",
    //     translateY: 270,
    //     delay: anime.stagger(100),
    //   });
    // }, 1000);
  }, []);

  return (
    <Stack
      data-aos='fade-up'
      data-aos-delay={order * 150}
      sx={{
        maxWidth: { sm: "100%", md: 360 },
        // transform: "translateY(270px)",
        width: "100%",
        "&:hover img": {
          transform: "scale(1.1)",
        },
      }}>
      <Box
        sx={{
          position: "relative",
          width: "auto",
          height: 250,

          // maskImage:
          //   "linear-gradient(#000000 70%, #00000036 85%, transparent 90%)",
        }}>
        <Link href={slugToBlogTrailingSlash(post.frontmatter.slug)}>
          <Box
            // component={"img"}
            // src={}
            // alt='test'
            sx={{
              backgroundImage: `url(${getReponsiveImageUrl(
                post.frontmatter.image
              )})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 0px",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              transition: "ease-in-out 150ms",
            }}
          />
        </Link>
      </Box>
      <Stack
        gap={1}
        sx={{
          py: 3,
          zIndex: 1,
        }}>
        <Typography
          component={Link}
          href={slugToBlogTrailingSlash(post.frontmatter.slug)}
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          fontWeight={700}
          fontSize={(theme) => theme.typography.pxToRem(18)}
          sx={{
            display: "inline-block",
            mb: 1,
            color: (theme) => `${theme.palette.text.primary} !important`,
            textDecoration: "none",
          }}>
          {post.frontmatter.title}
        </Typography>
        <Typography
          fontFamily={`"IBM Plex Sans KR", sans-serif`}
          fontWeight={500}
          fontSize={(theme) => theme.typography.pxToRem(12)}
          sx={{
            display: "inline-block",
            color: (theme) => `${theme.palette.text.primary} !important`,
          }}>
          {post.readingTime}
        </Typography>
        <Stack direction='row' gap={1} alignItems={"center"}>
          <Typography
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(12)}>
            {post.frontmatter.author || AUTHOR}
          </Typography>
          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              backgroundColor: (theme) => theme.palette.text.primary + "a6",
            }}
          />
          <Typography
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(12)}>
            {new Date(post.frontmatter.date.slice(0, -6)).toLocaleString()}
          </Typography>
        </Stack>
        <Stack direction='row' gap={1} flexWrap='wrap'>
          {post.frontmatter.categories.map((category: string, i: number) => (
            <Link key={i} href={`/categories/${category.toLowerCase()}/`}>
              <Chip
                size='small'
                icon={<FolderOpenIcon />}
                label={category}
                variant={
                  router.query.category === category ? "filled" : "outlined"
                }
                color='info'
                sx={{
                  cursor: "pointer",
                  px: 1,
                  "&:hover": {
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    backgroundColor: (theme) => theme.palette.text.primary,
                  },
                }}
              />
            </Link>
          ))}
        </Stack>
        <Stack direction='row' gap={1} flexWrap='wrap'>
          {post.frontmatter.tags.map((tag: string, i: number) => (
            <Link key={i} href={`/tags/${tag.toLowerCase()}/`}>
              <Chip
                size='small'
                icon={<TagIcon />}
                label={tag}
                variant={router.query.tag === tag ? "filled" : "outlined"}
                color='primary'
                sx={{
                  cursor: "pointer",
                  px: 1,
                  "&:hover": {
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    backgroundColor: (theme) => theme.palette.text.primary,
                  },
                }}
              />
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Card;
