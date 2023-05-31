import GenerateHead from "@/components/GenerateHead";
import {
  AUTHOR,
  BLOG,
  BRAND_DESC,
  BRAND_NAME,
  GITHUB,
  PORTFOLIO,
} from "@/util/global";
import { setAnimate } from "@/util/tool";
import {
  Alert,
  AlertTitle,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

function Index() {
  const [anime1, setAnime1] = useState("");
  const [anime2, setAnime2] = useState("");
  const [anime3, setAnime3] = useState("");
  const [anime4, setAnime4] = useState("");

  useEffect(() => {
    setAnimate(setAnime1, ["animate__animated", "animate__fadeInUp"], 1);
    setAnimate(setAnime2, ["animate__animated", "animate__fadeInUp"], 2);
    setAnimate(setAnime3, ["animate__animated", "animate__fadeInUp"], 3);
    setAnimate(setAnime4, ["animate__animated", "animate__fadeInUp"], 4);
  }, []);

  return (
    <Stack
      component={Container}
      maxWidth='lg'
      sx={{
        height: "100%",
      }}>
      <Toolbar />
      <GenerateHead
        metadatas={{
          title: `${BRAND_NAME.toUpperCase()}::About`,
          author: AUTHOR,
          description: BRAND_DESC.trim(),
        }}
      />
      <Typography
        className={anime1}
        fontSize={(theme) => theme.typography.pxToRem(52)}
        fontWeight={500}
        gutterBottom
        fontFamily={`"IBM Plex Sans KR", sans-serif`}>
        About
      </Typography>
      <Alert color='success' className={anime2}>
        <AlertTitle>블로그 디자인 변경 ⇒ Next.js 13!</AlertTitle>
        2023. 05. 29 일자로 블로그 UI가 업데이트 되었습니다. 실험적이거나
        불필요한 기능을 모두 제거하고 포스팅을 이전보다 편하게 볼 수 있습니다.
      </Alert>

      <Typography className={anime3} fontWeight={200} sx={{ my: 1 }}>
        회사 일정과 개인 일정으로 인해 최대한 1주일 1포스팅을 지키려 하고
        있습니다. 계속해서 블로그를 관리하면서 보기 불편한 점 등을 찾아 개선하는
        노력을 기울이고 있습니다. 감사합니다 😊
      </Typography>

      <List
        className={anime4}
        sx={{
          "& .MuiTypography-root.MuiListItemText-secondary": {
            color: "inherit",
          },
        }}>
        <ListItem>
          <ListItemText
            primary={"BLOG"}
            secondary={
              <Typography
                component={Link}
                href={BLOG}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}>
                {BLOG}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='PORTFOLIO'
            secondary={
              <Typography
                component={Link}
                href={PORTFOLIO}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}>
                {PORTFOLIO}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='GITHUB'
            secondary={
              <Typography
                component={Link}
                href={GITHUB}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}>
                {GITHUB}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Stack>
  );
}

export default Index;
