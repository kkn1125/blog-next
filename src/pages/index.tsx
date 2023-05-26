import GenerateHead from "@/components/GenerateHead";
import { ColorModeContext } from "@/context/ThemeModeProvider";
import { AUTHOR, BRAND_DESC, BRAND_NAME } from "@/util/global";
import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC,
  author: AUTHOR,
};

export default function Home({ posts }: any) {
  const colorMode = useContext(ColorModeContext);
  return (
    <Stack sx={{ flex: 1 }}>
      <GenerateHead metadatas={metadatas} />
      <Typography fontSize={30} fontWeight={700}>
        Blog
      </Typography>
      <Button onClick={colorMode.toggleColorMode}>toggle</Button>
    </Stack>
  );
}
