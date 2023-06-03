import { Box, Stack } from "@mui/material";
import React from "react";

function StackBadge({ list }: { list: any[] }) {
  return (
    <Stack
      direction='row'
      sx={{
        position: "relative",
      }}>
      {list.slice(0, 3).map((item, i) => (
        <Box
          key={i}
          sx={{
            width: 5,
            zIndex: list.length - i,
            textAlign: "center",
            userSelect: "none",
          }}>
          {item}
        </Box>
      ))}
      {list.length > 3 && (
        <Box sx={{ ml: 1, userSelect: "none" }}>+{list.length - 3}</Box>
      )}
    </Stack>
  );
}

export default StackBadge;
