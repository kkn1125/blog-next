import { slugToBlogTrailingSlash } from "@/util/tool";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function PostNavigatorButton({ data, currentPath, order = false }: any) {
  return (
    <Box
      component={Link}
      href={data ? slugToBlogTrailingSlash(data.frontmatter.slug) : currentPath}
      sx={{
        textDecoration: "none",
        flex: 1,
        width: "100%",
        minWidth: "50%",
      }}>
      <Stack
        direction={order ? "row" : "row-reverse"}
        gap={4.5}
        justifyContent={order ? "flex-start" : "flex-end"}
        alignItems={"flex-start"}
        sx={{
          maxWidth: "90vw",
          minHeight: 110,
          maxHeight: 110,
          flex: 1,
          transition: "150ms ease-in-out",
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `3px solid ${theme.palette.info.main}`,
          px: 3,
          py: 2,
          "&:hover": {
            color: (theme) => theme.palette.background.paper,
            backgroundColor: (theme) => theme.palette.info.main,
          },
        }}>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(20)}
          fontWeight={700}
          sx={{ whiteSpace: "nowrap" }}>
          {order ? (
            <ArrowBackIosNewIcon fontSize='large' />
          ) : (
            <ArrowForwardIosIcon fontSize='large' />
          )}
        </Typography>
        <Stack
          sx={{
            flex: 1,
            textAlign: order ? "left" : "right",
            width: "100vw",
            position: "relative",
          }}
          {...(!order && { alignItems: "flex-end" })}>
          {data ? (
            <>
              <Typography
                fontSize={(theme) => theme.typography.pxToRem(18)}
                fontWeight={700}
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  minWidth: 150,
                  maxWidth: "calc(80vw - 40vw - 100px)",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                }}>
                {data.frontmatter.title}
              </Typography>
              <Typography fontSize={(theme) => theme.typography.pxToRem(14)}>
                {data.frontmatter.description
                  .replace(/[\n]+/, " ")
                  .slice(0, 12)}
                ...
              </Typography>
              <Typography
                fontSize={(theme) => theme.typography.pxToRem(13)}
                fontWeight={200}>
                {data.frontmatter.readingTime}
              </Typography>
            </>
          ) : order ? (
            <Typography>제일 첫 번째 포스팅입니다!</Typography>
          ) : (
            <Typography>다음 포스팅을 준비 중입니다. 😉</Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default PostNavigatorButton;
