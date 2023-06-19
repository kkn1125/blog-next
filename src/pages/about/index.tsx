import Animated from "@/components/Animated";
import GenerateHead from "@/components/GenerateHead";
import { PostDispatchContext, POST_INIT } from "@/context/PostProvider";
import { getAllArticles } from "@/libs/service";
import {
  AUTHOR,
  BLOG,
  BRAND_DESC,
  BRAND_LOGO,
  BRAND_NAME,
  GITHUB,
  PORTFOLIO,
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
import { useContext, useEffect } from "react";

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
    name: "BLOG",
    value: BLOG,
  },
];

const metadatas = {
  title: `${BRAND_NAME.toUpperCase()}::About`,
  description: BRAND_DESC.trim(),
  author: AUTHOR,
  image: BRAND_LOGO,
};

function Index({ posts, totalCount }: any) {
  const postDispatch = useContext(PostDispatchContext);

  useEffect(() => {
    postDispatch({
      type: POST_INIT.INIT,
      posts: posts || [],
    });
  }, []);

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
          fontSize={(theme) => theme.typography.pxToRem(52)}
          fontWeight={500}
          gutterBottom
          fontFamily={`"IBM Plex Sans KR", sans-serif`}>
          About
        </Typography>
      </Animated>
      <Animated order={2} animate='fadeInUp'>
        <Alert color='success'>
          <AlertTitle>블로그 디자인 변경 ⇒ Next.js 13!</AlertTitle>
          2023. 05. 29 일자로 블로그 UI가 업데이트 되었습니다. 실험적이거나
          불필요한 기능을 모두 제거하고 포스팅을 이전보다 편하게 볼 수 있습니다.
        </Alert>
      </Animated>
      <Animated order={3} animate='fadeInUp'>
        <Typography fontWeight={200} sx={{ my: 1 }}>
          회사 일정과 개인 일정으로 인해 최대한 1주일 1포스팅을 지키려 하고
          있습니다. 계속해서 블로그를 관리하면서 보기 불편한 점 등을 찾아
          개선하는 노력을 기울이고 있습니다. 감사합니다 😊
        </Typography>
      </Animated>

      <Animated order={4} animate='fadeInUp'>
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

export const getStaticProps = async () => {
  const posts = await getAllArticles();

  return {
    props: {
      posts: posts,
      totalCount: posts.length,
    },
  };
};
