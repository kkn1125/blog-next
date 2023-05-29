import GenerateHead from "@/components/GenerateHead";
import {
  AUTHOR,
  BLOG,
  BRAND_DESC,
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

function Index() {
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
          title: BRAND_NAME + "::About",
          author: AUTHOR,
          description: BRAND_DESC,
        }}
      />
      <Typography
        fontSize={(theme) => theme.typography.pxToRem(52)}
        fontWeight={500}
        gutterBottom
        fontFamily={`"IBM Plex Sans KR", sans-serif`}>
        About
      </Typography>
      <Alert>
        <AlertTitle>블로그 디자인 변경</AlertTitle>
        2023. 05. 29 일자로 블로그 UI가 업데이트 되었습니다.
      </Alert>

      <Typography fontWeight={200} sx={{ my: 1 }}>
        회사 일정과 개인 일정으로 인해 최대한 1주일 1포스팅을 지키려 하고
        있습니다. 계속해서 블로그를 관리하면서 보기 불편한 점 등을 찾아 개선하는
        노력을 기울이고 있습니다. 감사합니다 😊
      </Typography>

      <List
        dense={true}
        sx={{
          "& .MuiTypography-root.MuiListItemText-secondary": {
            color: "inherit",
          },
        }}>
        <ListItem>
          <ListItemText
            primary={"BLOG"}
            secondary={<Link href={BLOG}>{BLOG}</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='PORTFOLIO'
            secondary={<Link href={PORTFOLIO}>{PORTFOLIO}</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='GITHUB'
            secondary={<Link href={GITHUB}>{GITHUB}</Link>}
          />
        </ListItem>
      </List>
    </Stack>
  );
}

export default Index;
