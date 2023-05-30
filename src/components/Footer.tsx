import { BRAND_NAME } from "@/util/global";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Stack
      direction='row'
      gap={3}
      justifyContent='center'
      sx={{
        p: 3,
        color: "#ffffff",
        backgroundColor: "#333333",
        fontWeight: 100,
      }}>
      <Typography fontFamily={`"IBM Plex Sans KR", sans-serif`} align="center">
        Copyright 2021. <strong>{BRAND_NAME.toUpperCase()}</strong> All rights
        reserved.
      </Typography>
    </Stack>
  );
}

export default Footer;
