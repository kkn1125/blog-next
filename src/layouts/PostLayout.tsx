"use client";

import React from "react";
import { Box, Container, Stack } from "@mui/material";

function PostLayout({ children }: { children: React.ReactElement }) {
  return <Stack component="div">{children}</Stack>;
}

export default PostLayout;
