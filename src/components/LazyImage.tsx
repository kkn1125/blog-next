import { Box } from "@mui/material";
import React from "react";

function LazyImage({ src, ...rest }: { src: string; [k: string]: any }) {
  return <Box component='img' src={src} loading='lazy' {...rest} />;
}

export default LazyImage;
