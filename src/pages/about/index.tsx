import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import {
  AUTHOR,
  BRAND_LOGO,
  BRAND_NAME,
  GITHUB,
  MAIN_SUBSCRIPTION,
  PORTFOLIO,
  TITLE_SIZE,
  WIKI,
} from "@/util/global";
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

const ABOUT_LINKS = [
  {
    name: "GITHUB",
    value: GITHUB,
  },
  {
    name: "PORTFOLIO",
    value: PORTFOLIO,
  },
  {
    name: "WIKI",
    value: WIKI,
  },
];

const metadatas = {
  title: `${BRAND_NAME.toUpperCase()}::About`,
  description: MAIN_SUBSCRIPTION.trim(),
  author: AUTHOR,
  image: BRAND_LOGO,
};

function Index() {
  return (
    <Stack
      component={Container}
      maxWidth='lg'
      sx={{
        height: "100%",
        minHeight: "101%",
      }}>
      <Toolbar />
      <GenerateHead metadatas={metadatas} />
      <Animated order={1} animate='fadeInUp'>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.L)}
          fontWeight={500}
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          About
        </Typography>
      </Animated>
      <Animated order={2} animate='fadeInUp'>
        <Alert color='success'>
          <AlertTitle>블로그 기능 추가</AlertTitle>
          2023. 10. 27 일자로 블로그 업데이트 되었습니다.
          <br />
          1. 채널 톡이 추가되었습니다.
          <br />
          2. 블로그 성능 최적화 작업이 있었습니다.
          <br />
          3. 포스팅별 댓글 개수를 조회할 수 있습니다.
          <br />
        </Alert>
      </Animated>
      <Toolbar />
      <Animated order={3} animate='fadeInUp'>
        <Typography fontWeight={200} sx={{ my: 1 }}>
          실수와 경험을 통해 얻은 내용과 기술에 대해 작성하는 개인 기술 블로그
          입니다. 블로그를 관리하면서 보기 불편한 점 등을 찾아 개선하고
          있습니다. 문의사항은 채널톡을 이용해주세요.
        </Typography>
        <Typography fontWeight={200} sx={{ my: 1 }}>
          감사합니다 😊
        </Typography>
      </Animated>
      <Toolbar />

      <Animated order={4} animate='fadeInUp'>
        <Typography
          fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.M)}
          fontWeight={200}
          sx={{ my: 1 }}>
          Others
        </Typography>
        <List
          sx={{
            "& .MuiTypography-root.MuiListItemText-secondary": {
              color: "inherit",
            },
          }}>
          {ABOUT_LINKS.map(({ name, value }: any, i: number) => (
            <ListItem key={i}>
              <ListItemText
                primary={name}
                secondary={
                  <Typography
                    component={Link}
                    href={value}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                    }}>
                    {value}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Animated>
      <Toolbar />
    </Stack>
  );
}

export default Index;
