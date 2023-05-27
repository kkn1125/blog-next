import {
  Box,
  Divider, Paper,
  Stack,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

import { slugToBlogTrailingSlash } from "@/util/tool";
import anime from "animejs";
import Link from "next/link";

interface CardInfo {
  slug: string;
  title: string;
  author: string;
  createdAt: string;
  ordering: number;
}

function Card({ slug, title, author, createdAt, ordering }: CardInfo) {
  useEffect(() => {
    setTimeout(() => {
      anime({
        target: ".card-test",
        translateY: 270,
        delay: anime.stagger(100),
      });
    }, 1000);
  }, []);

  return (
    <Paper
      className='card-test'
      elevation={3}
      sx={{
        width: 300,
        overflow: "hidden",
        "&:hover img": {
          transform: "scale(1.1)",
        },
      }}>
      <Stack>
        <Box
          sx={{
            position: "relative",
            height: 200,
            maskImage:
              "linear-gradient(#000000 70%, #00000036 85%, transparent 90%)",
          }}>
          <Link href={slugToBlogTrailingSlash(slug)}>
            <Image
              src='https://picsum.photos/500/300?random=1'
              alt='test'
              // width={500}
              // height={300}
              fill
              priority
              style={{
                transition: "ease-in-out 150ms",
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            p: 3,
            zIndex: 1,
          }}>
          <Typography
            component={Link}
            href={slugToBlogTrailingSlash(slug)}
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            fontWeight={700}
            fontSize={(theme) => theme.typography.pxToRem(18)}
            sx={{
              display: 'inline-block',
              mb: 1,
              color: theme => `${theme.palette.text.primary} !important`,
              textDecoration: 'none'
            }}>
            {title}
          </Typography>
          <Stack direction='row' justifyContent={"space-between"} gap={1}>
            <Typography
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              fontWeight={200}
              fontSize={(theme) => theme.typography.pxToRem(12)}>
              {author}
            </Typography>
            <Divider
              orientation='vertical'
              flexItem
              sx={{
                borderColor: "green",
              }}
            />
            <Typography
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              fontWeight={200}
              fontSize={(theme) => theme.typography.pxToRem(12)}>
              {new Date(createdAt.slice(0, -6)).toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Card;
