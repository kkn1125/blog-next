import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";

import { AUTHOR } from "@/util/global";
import {
  changeWhiteSpaceToHipen,
  getReponsiveImageUrl,
  slugToBlogTrailingSlash,
} from "@/util/tool";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import TagIcon from "@mui/icons-material/Tag";
import Link from "next/link";
import { useRouter } from "next/router";

interface CardInfo {
  post: any;
}

function Card({ post }: CardInfo) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Stack
      sx={{
        // maxWidth: { sm: "100%", md: 360 },
        width: "100%",
        "&:hover .card-cover": {
          transform: "scale(1.1)",
        },
      }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 240,
          overflow: "hidden",
        }}>
        <Link href={slugToBlogTrailingSlash(post.frontmatter.slug)}>
          <Box
            className='card-cover'
            sx={{
              transition: "ease-in-out 150ms",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${getReponsiveImageUrl(
                post.frontmatter.image
              )})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
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
            <Link
              key={i}
              href={`/categories/${changeWhiteSpaceToHipen(category)}/`}>
              <Chip
                size='small'
                icon={<FolderOpenIcon />}
                label={changeWhiteSpaceToHipen(category)}
                variant={
                  changeWhiteSpaceToHipen(router.query.category as string) ===
                  changeWhiteSpaceToHipen(category)
                    ? "filled"
                    : "outlined"
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
            <Link key={i} href={`/tags/${changeWhiteSpaceToHipen(tag)}/`}>
              <Chip
                size='small'
                icon={<TagIcon />}
                label={changeWhiteSpaceToHipen(tag)}
                variant={
                  changeWhiteSpaceToHipen(router.query.tag as string) ===
                  changeWhiteSpaceToHipen(tag)
                    ? "filled"
                    : "outlined"
                }
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
