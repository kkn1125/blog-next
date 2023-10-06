import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import { BRAND_NAME, BRAND_DESC, BRAND_LOGO } from "@/util/global";
import {
  Stack,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";

const metadatas = {
  title: BRAND_NAME.toUpperCase() + "::Games",
  description: BRAND_DESC,
  // author: AUTHOR,
  image: BRAND_LOGO,
};

function Index() {
  useEffect(() => {}, []);

  const handleOpenGame = (game: string) => {
    if (game === "animals") {
      window.open(
        `https://kkn1125.github.io/game-pang/`,
        "DEVKIMSON::GAME - Animal match",
        `fullscreen=on,location=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=${
          innerWidth / 2 - 414 / 2
        },top=${
          innerHeight / 2 - 750 / 2 / 2
        },menubar=no,width=${414},height=${750},titlebar=no`
      );
    }
    if (game === "solitaire") {
      window.open(
        `https://kkn1125.github.io/new-solitaire/`,
        "DEVKIMSON::GAME - Solitaire",
        `fullscreen=on,location=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=${
          innerWidth / 2 - 800 / 2
        },top=${
          innerHeight / 2 - 800 / 2 / 2
        },menubar=no,width=${800},height=${800},titlebar=no`
      );
    }
  };

  return (
    <Stack
      component={Container}
      maxWidth='lg'
      gap={1}
      sx={{
        height: "100%",
      }}>
      <GenerateHead metadatas={metadatas} />
      <Toolbar />

      <Animated order={0} animate='fadeInUp'>
        <Typography fontSize={24} fontWeight={700} gutterBottom align='center'>
          Play Games
        </Typography>
      </Animated>
      <Animated order={1} animate='fadeInUp'>
        <Typography fontSize={18} fontWeight={200} gutterBottom align='center'>
          재미로 만든 게임입니다. 광고 없이 즐기세요 😁
        </Typography>
      </Animated>

      <Stack direction='row' flexWrap={"wrap"} gap={3} justifyContent='center'>
        <Animated order={2} animate='fadeInUp'>
          <Stack
            direction='column'
            alignItems='stretch'
            sx={{ textAlign: "center", maxWidth: 250 }}>
            <Typography fontWeight={700}>Animal Match Game</Typography>
            <Box
              sx={{
                width: 250,
                height: 350,
                backgroundColor: "gray",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(https://github.com/kkn1125/kkn1125.github.io/assets/71887242/2b102045-3ed6-40fb-be3e-457255310836)`,
              }}></Box>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleOpenGame("animals")}>
              Start Game
            </Button>
          </Stack>
        </Animated>
        <Animated order={3} animate='fadeInUp'>
          <Stack
            direction='column'
            alignItems='stretch'
            sx={{ textAlign: "center", maxWidth: 250 }}>
            <Typography fontWeight={700}>Solitaire</Typography>
            <Box
              sx={{
                width: 250,
                height: 350,
                backgroundColor: "gray",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(https://github.com/kkn1125/kkn1125.github.io/assets/71887242/607a2873-7988-4937-9630-639f4b66eb8e)`,
              }}></Box>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleOpenGame("solitaire")}>
              Start Game
            </Button>
          </Stack>
        </Animated>
      </Stack>
      <Toolbar />
    </Stack>
  );
}

export default Index;
