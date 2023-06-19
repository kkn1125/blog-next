import GenerateHead from "@/components/GenerateHead";
import GoTop from "@/components/GoTop";
import PostMDXComponent from "@/components/PostMDXComponent";
import PostNavigator from "@/components/PostNavigator";
import SideBar from "@/components/SideBar";
import {
  getAllArticles,
  getArticleFromSlug,
  getBeforeArticleFromSlug,
  getNextArticleFromSlug,
  getSlugs,
  serializeMdx,
} from "@/libs/service";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { getReponsiveImageUrl, parseHeading } from "@/util/tool";
import { MergeComponents } from "@mdx-js/react/lib";
import LinkIcon from "@mui/icons-material/Link";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote";
import { useContext, useEffect, useRef, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { PostDispatchContext, POST_INIT } from "@/context/PostProvider";

const components: MDXComponents | MergeComponents = {
  code: PostMDXComponent.CodeBlock,
  pre: PostMDXComponent.Pre,
  /* pre in p error 해결 */
  p: PostMDXComponent.Paragraph,
  // img: ({ children, ...rest }: any) => <img {...rest} children={children} />,
  figure: PostMDXComponent.Figure,
  img: (props: any) => (
    <Box
      component='img'
      {...props}
      sx={{
        width: "100%",
      }}
    />
  ),
  blockquote: PostMDXComponent.BlockQuote,
  hr: PostMDXComponent.Hr,
  h1: PostMDXComponent.HeaderText(1),
  h2: PostMDXComponent.HeaderText(2),
  h3: PostMDXComponent.HeaderText(3),
  h4: PostMDXComponent.HeaderText(4),
  h5: PostMDXComponent.HeaderText(5),
  h6: PostMDXComponent.HeaderText(6),
  a: PostMDXComponent.ALink,
  table: PostMDXComponent.Table,
};

/* frontmatter를 기반으로 metadata set을 만듦 */
const metadatas = (frontmatter: any) => ({
  title: `${BRAND_NAME.toUpperCase()}::${frontmatter.title}`,
  description: frontmatter.description.trim(),
  author: AUTHOR,
  url: location.origin + "/blog" + frontmatter.slug,
  category: frontmatter.categories,
  tag: frontmatter.tags,
  image: frontmatter.image,
});

let copyActive = false;

function Index({
  allPosts,
  post,
  content,
  before,
  next,
}: {
  allPosts: any;
  post: any;
  content: any;
  before: any;
  next: any;
}) {
  const [responsivePost, setResponsivePost] = useState<any>(null);
  const [mode, setMode] = useState(false);
  const theme = useTheme();
  const commentEl = useRef<HTMLElement>();
  const [copied, setCopied] = useState(false);
  const postDispatch = useContext(PostDispatchContext);

  useEffect(() => {
    setResponsivePost(post);
  }, [post]);

  useEffect(() => {
    postDispatch({
      type: POST_INIT.INIT,
      posts: allPosts || [],
    });
  }, []);

  useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("repo", "kkn1125/blog-comments");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute(
      "theme",
      theme.palette.mode === "light" ? "github-light" : "gruvbox-dark"
    );
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.async = true;
    if (commentEl.current) {
      commentEl.current.innerHTML = "";
      if (commentEl.current.innerHTML === "") {
        setMode((mode) => true);
      }
    }
    setTimeout(() => {
      setMode((mode) => false);
      commentEl.current?.appendChild(scriptEl);
    }, 500);
  }, [theme.palette.mode]);

  const handleCopyLink = () => {
    if (copyActive) return;
    copyActive = true;
    navigator.clipboard.writeText(location.href);
    setCopied(true);
    setTimeout(() => {
      copyActive = false;
      setCopied(false);
    }, 3000);
  };

  return (
    <Stack
      id='post-wrap'
      direction={{ xs: "column", md: "row" }}
      sx={{
        width: { lg: "100%", xl: "70%" },
        height: "fit-content",
        position: "relative",
      }}>
      {responsivePost && (
        <Box>
          <SideBar list={parseHeading(content)} />
        </Box>
      )}

      {responsivePost && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            flex: 1,
            width: "100%",
            wordBreak: "break-word",
            whiteSpace: "break-spaces",
          }}>
          <GenerateHead metadatas={metadatas(responsivePost.frontmatter)} />

          <Stack
            sx={{
              width: { xs: "100%", md: "70%", lg: "60%" },
              px: 2,
            }}>
            <PostNavigator before={before} next={next} />

            <Box>
              <Box
                sx={{
                  backgroundImage: `url(${getReponsiveImageUrl(
                    responsivePost.frontmatter.image
                  )})`,
                  backgroundSize: { xs: "contain", md: "cover" },
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  width: { xs: "auto", md: "100%" },
                  height: { xs: 300, md: 700 },
                }}
              />
            </Box>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(32)}
              fontWeight={700}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              align='center'
              gutterBottom>
              {responsivePost.frontmatter.title || ""}
            </Typography>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(16)}
              fontWeight={500}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              align='center'
              gutterBottom>
              {responsivePost.frontmatter.author || ""}
            </Typography>
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(14)}
              fontWeight={200}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              align='center'
              gutterBottom>
              {responsivePost.frontmatter.readingTime || ""}
            </Typography>
            <Stack direction='row' justifyContent='center' gap={1}>
              <Tooltip
                title={`링크 복사${copied ? " 완료" : ""}`}
                placement='bottom'>
                <IconButton
                  onClick={handleCopyLink}
                  color={copied ? "success" : "inherit"}>
                  {copied ? <CheckCircleOutlineIcon /> : <LinkIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={`준비 중입니다.`} placement='bottom'>
                <IconButton color={"inherit"}>
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Divider sx={{ my: 3, width: "100%" }} flexItem />
            <MDXRemote
              {...responsivePost}
              components={components as MDXComponents | MergeComponents}
            />

            <PostNavigator before={before} next={next} />

            <Box
              sx={{
                minHeight: 50,
              }}>
              {mode && (
                <Stack
                  direction='row'
                  justifyContent='center'
                  sx={{
                    my: 5,
                    minHeight: 230,
                  }}>
                  <CircularProgress color='success' />
                </Stack>
              )}
              <Box
                sx={{
                  display: mode ? "hidden" : "block",
                  "& .utterances": {
                    maxWidth: "90%",
                  },
                }}
                ref={commentEl}
              />
            </Box>
            <Toolbar />
          </Stack>
        </Stack>
      )}
      <GoTop />
    </Stack>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const allPosts = await getAllArticles();
  const before = await getBeforeArticleFromSlug(params.slug);
  const post = await getArticleFromSlug(params.slug);
  const next = await getNextArticleFromSlug(params.slug);
  if (before) {
    Object.assign(before, {
      content: before.content.replace(
        /@<=>|@=>|@<=|@<->|@->|@<-/g,
        ($1: string) => {
          switch ($1) {
            case "@<=>":
              return "⇔";
            case "@=>":
              return "⇒";
            case "@<=":
              return "⇐";
            case "@<->":
              return "↔";
            case "@->":
              return "→";
            case "@<-":
              return "←";
            default:
              return $1;
          }
        }
      ),
    });
  }
  if (next) {
    Object.assign(next, {
      content: next.content.replace(
        /@<=>|@=>|@<=|@<->|@->|@<-/g,
        ($1: string) => {
          switch ($1) {
            case "@<=>":
              return "⇔";
            case "@=>":
              return "⇒";
            case "@<=":
              return "⇐";
            case "@<->":
              return "↔";
            case "@->":
              return "→";
            case "@<-":
              return "←";
            default:
              return $1;
          }
        }
      ),
    });
  }
  Object.assign(post, {
    content: post.content.replace(
      /@<=>|@=>|@<=|@<->|@->|@<-/g,
      ($1: string) => {
        switch ($1) {
          case "@<=>":
            return "⇔";
          case "@=>":
            return "⇒";
          case "@<=":
            return "⇐";
          case "@<->":
            return "↔";
          case "@->":
            return "→";
          case "@<-":
            return "←";
          default:
            return $1;
        }
      }
    ),
  });

  const mdxSource = (await serializeMdx(post.content || "")) || {};

  mdxSource.frontmatter = post.frontmatter;

  return {
    props: {
      origin: post,
      post: mdxSource,
      content: post.content,
      before: before,
      next: next,
      allPosts: allPosts,
    },
  };
};

export const getStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const slugs = await getSlugs();

  return {
    paths: slugs.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export default Index;
