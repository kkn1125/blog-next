import GenerateHead from "@/components/GenerateHead";
import { PostContext } from "@/context/PostProvider";
import {
  AUTHOR,
  BRAND_LOGO,
  BRAND_NAME,
  MAIN_SUBSCRIPTION,
} from "@/util/global";
import { Article } from "@/util/types";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const metadatas = {
  title: `${BRAND_NAME.toUpperCase()}::Not Found`,
  description: MAIN_SUBSCRIPTION.trim(),
  author: AUTHOR,
  image: BRAND_LOGO,
};

function Index(/* { posts }: any */) {
  const router = useRouter();

  const { posts } = useContext(PostContext);

  const [post, setPost] = useState<Article | undefined>(undefined);
  useEffect(() => {
    setPost(
      posts.find((post) =>
        /* 잘못된 로직 수정 2023-10-25 17:32:24 */
        post.frontmatter.slug.endsWith(location.pathname.slice(1))
      )
    );
  }, [posts]);
  return (
    <Container>
      <GenerateHead metadatas={metadatas} />
      <Toolbar />
      <Toolbar />
      <Card
        sx={{
          p: 10,
        }}>
        <CardContent>
          <Typography gutterBottom className='font-main' variant='h3'>
            Page not found
          </Typography>
          <Typography>요청하신 페이지를 찾지 못 했어요 😔</Typography>
          {post ? (
            <>
              <br />
              <Alert color='warning' variant='standard'>
                <AlertTitle
                  sx={{
                    fontWeight: 700,
                  }}>
                  감지된 포스팅 경로가 있습니다! 🤖
                </AlertTitle>
                <br />
                <Typography>
                  블로그 구축 환경 변경으로 포스팅 경로가 변경되었습니다. 사용자
                  의견에 따라 이동하기 위해 페이지를 따로 만들었어요.😊
                  <br />
                  이동하시려면 아래 "감지된 포스팅으로 🚀" 버튼을 눌러주세요!
                </Typography>
              </Alert>
            </>
          ) : (
            <>
              <Typography
                component='div'
                gutterBottom
                aria-label='Pensive emoji'>
                {process.env.NODE_ENV === "development" ? (
                  <Typography component='div' variant='body2' color='GrayText'>
                    <br />
                    <Chip label='Dev Alert' /> <code>src/pages/</code>에서
                    페이지를 만들어보세요!
                    <br />
                  </Typography>
                ) : null}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Stack direction='row' gap={1}>
            <Button component={Link} href='/' variant='outlined'>
              Go home
            </Button>
            {post && (
              <Button
                color='success'
                variant='contained'
                onClick={() => router.push(`/blog${location.pathname}`)}>
                감지된 블로그로 이동 🚀
              </Button>
            )}
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Index;

// export const getStaticProps = async () => {
//   const posts = await getAllArticles();

//   return {
//     props: {
//       posts: posts,
//     },
//   };
// };
