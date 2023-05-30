"use client";

import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import SideBar from "@/components/SideBar";

function PostLayout({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <>
      {children}
    </>
  );
}

export default PostLayout;
