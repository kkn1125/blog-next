import { Tooltip, Chip, Stack, Typography, Box } from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

function Visitants({ visitor }: any) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} gap={1} sx={{ px: 1.5 }}>
      <Tooltip title='Today visitant'>
        <Chip
          size='small'
          color='primary'
          label={
            <Stack
              direction='row'
              alignItems='center'
              gap={1}
              sx={{
                "& svg": {
                  display: {
                    md: "block",
                    xs: "none",
                  },
                },
              }}>
              <PersonIcon />
              {visitor.today}
            </Stack>
          }
        />
      </Tooltip>
      {/* <Typography
        sx={{
          fontSize: (theme) => theme.typography.pxToRem(16),
          display: {
            sm: "inline-block",
            md: "none",
          },
        }}>
        /
      </Typography> */}
      <Tooltip title='Total visitant'>
        <Chip
          size='small'
          color='primary'
          label={
            <Stack
              direction='row'
              alignItems='center'
              gap={1}
              sx={{
                "& svg": {
                  display: {
                    md: "block",
                    xs: "none",
                  },
                },
              }}>
              <GroupIcon />
              {visitor.stack}
            </Stack>
          }
        />
      </Tooltip>
    </Stack>
  );
}

export default Visitants;
