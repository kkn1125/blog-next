import GenerateHead from "@/components/GenerateHead";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import { Stack, Typography, Button } from "@mui/material";
import React from "react";

const metadatas = {
  title: `${BRAND_NAME.toUpperCase()}::About`,
  description: BRAND_DESC,
  author: AUTHOR,
};

function Index() {
  return (
    <Stack sx={{ flex: 1 }}>
      <GenerateHead metadatas={metadatas} />
      <Typography fontSize={30} fontWeight={700}>
        Blog
      </Typography>
    </Stack>
  );
}

export default Index;
