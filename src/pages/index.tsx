import GenerateHead from "@/components/GenerateHead";
import { BRAND_DESC, BRAND_NAME } from "@/util/global";
import { Stack, Typography } from "@mui/material";

const metadatas = {
  title: BRAND_NAME.toUpperCase(),
  description: BRAND_DESC,
};

export default function Home({ posts }: any) {
  return (
    <Stack>
      <GenerateHead metadatas={metadatas} />
      <Typography fontSize={30} fontWeight={700}>
        Blog
      </Typography>
    </Stack>
  );
}
