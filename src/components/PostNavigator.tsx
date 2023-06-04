import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PostNavigatorButton from "./PostNavigatorButton";

function PostNavigator({ before, next }: any) {
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.origin + location.pathname);
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent='center'
      alignItems='center'
      gap={2}
      flexWrap={"wrap"}
      sx={{
        my: 3,
      }}>
      <PostNavigatorButton data={before} order currentPath={currentPath} />
      <PostNavigatorButton data={next} currentPath={currentPath} />
    </Stack>
  );
}

export default PostNavigator;
