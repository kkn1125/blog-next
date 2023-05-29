"use client";

import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { MergeComponents } from "@mdx-js/react/lib";
import SideBar from "@/components/SideBar";

interface CodeBlockProps {
  children: string;
  className: string;
}

const components: MDXComponents | MergeComponents = {
  code: ({ children, className }: CodeBlockProps | any) => {
    const language = className?.replace(/language-/, "");
    return className ? (
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={tomorrowNight}>
        {children}
      </SyntaxHighlighter>
    ) : (
      <Box
        component='code'
        sx={(theme) => ({
          borderRadius: "0.3rem",
          color: "#ffffff !important",
          fontSize: theme.typography.pxToRem(14),
          backgroundColor: theme.palette.secondary.main,
          px: 1.2,
          py: 0.5,
          mx: 0.5,
        })}>
        {children}
      </Box>
    );
  },
  pre: ({ children }: any) => <div>{children}</div>,
  /* pre in p error 해결 */
  p: ({ children }: any) => <div>{children}</div>,
  img: ({ children, ...rest }: any) => <img {...rest} children={children} />,
};

function PostLayout({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <MDXProvider components={components as MDXComponents | MergeComponents}>
      <Stack component='div' direction='row'>
        <SideBar />
        <Container maxWidth='md' sx={{ position: "relative", flex: 1 }}>
          {children}
        </Container>
      </Stack>
    </MDXProvider>
  );
}

export default PostLayout;
