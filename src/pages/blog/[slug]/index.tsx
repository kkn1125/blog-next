import GenerateHead from "@/components/GenerateHead";
import GoTop from "@/components/GoTop";
import PostMDXComponent from "@/components/PostMDXComponent";
import PostNavigator from "@/components/PostNavigator";
import SideBar from "@/components/SideBar";
import {
  getArticleFromSlug,
  getBeforeArticleFromSlug,
  getNextArticleFromSlug,
  getSlugs,
  serializeMdx,
} from "@/libs/service";
import { BRAND_NAME } from "@/util/global";
import { format, getReponsiveImageUrl, parseHeading } from "@/util/tool";
import { MergeComponents } from "@mdx-js/react/lib";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LinkIcon from "@mui/icons-material/Link";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
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
import { useEffect, useRef, useState } from "react";

const components: MDXComponents | MergeComponents = {
  code: PostMDXComponent.CodeBlock,
  pre: PostMDXComponent.Pre,
  /* pre in p error 해결 */
  p: PostMDXComponent.Paragraph,
  // img: ({ children, ...rest }: any) => <img {...rest} children={children} />,
  figure: PostMDXComponent.Figure,
  img: (props: any) => {
    const limitZoom = 4;
    const [show, setShow] = useState(false);
    const [zoom, setZoom] = useState(0);

    function increaseZoomValue() {
      if (zoom < limitZoom) {
        setZoom(zoom + 1);
      } else {
        setZoom(0);
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      const { key } = e;
      if (key === "Escape") {
        hidePreview();
      }
    }

    function showPreview() {
      setShow(true);
    }
    function hidePreview() {
      setShow(false);
      setZoom(0);
    }

    useEffect(() => {
      window.addEventListener("keydown", handleKeydown);
      return () => {
        window.removeEventListener("keydown", handleKeydown);
      };
    }, []);

    return (
      <Stack
        direction='row'
        justifyContent='center'
        sx={{
          width: "100%",
        }}>
        {show && (
          <Box
            id='preview-wrap'
            onClick={(e) => {
              if ((e.target as HTMLDivElement).id === "preview-wrap") {
                hidePreview();
              }
            }}
            sx={{
              userSelect: "none",
              position: "fixed",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              backgroundColor: "#000000ac",
              zIndex: 2000,
            }}>
            <Box
              onClick={hidePreview}
              component='button'
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                padding: "1rem",
                border: "none",
                backgroundColor: "#e82620",
                borderRadius: "0.5rem",
                zIndex: 15,
                ["&::before"]: {
                  content: '"❌"',
                  color: "transparent",
                  textShadow: "0 0 0 white",
                },
                ["&:hover"]: {
                  filter: "brightness(0.85)",
                },
              }}
            />
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "80vw",
                transform: "translate(-50%, -50%)",
                textAlign: "right",
              }}>
              <Box
                onClick={increaseZoomValue}
                sx={{
                  cursor: "zoom-in",
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  margin: "auto",
                  overflow: "auto",
                  zIndex: 5,
                  backgroundColor: "#232323",
                }}>
                <Box
                  component='img'
                  src={props.src}
                  sx={{
                    width: `${(1 + zoom * 0.3) * 100}%`,
                    height: "auto",
                  }}
                  title={props.alt}
                />
              </Box>
              <Typography
                component='span'
                fontSize={24}
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  zIndex: 15,
                  color: "#ffffff",
                  px: 2,
                  py: 1,
                  backgroundColor: "#56565656",
                  pointerEvents: "none",
                }}>
                x {zoom + 1}
              </Typography>
            </Box>
          </Box>
        )}
        <Box component='figure' onClick={showPreview}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: 675,
            }}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
              }}>
              <Box
                component='img'
                {...{
                  ...props,
                  title: props.alt,
                }}
                sx={{
                  userSelect: "none",
                  width: "100%",
                  maxHeight: 450,
                  height: "auto",
                  transition: "150ms ease-out",
                  ["&:hover"]: {
                    cursor: "zoom-in",
                    filter: "brightness(0.9) blur(2px)",
                  },
                }}
              />
            </Box>
            <Box
              component='figcaption'
              sx={{
                textAlign: "center",
                backgroundColor: "#565656",
                color: "#ffffff",
                // fontWeight: 700,
                p: 1,
                fontSize: (theme) => theme.typography.pxToRem(14),
              }}>
              {props.alt}
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  },
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
  // author: AUTHOR,
  // url: location.origin + "/blog" + frontmatter.slug,
  category: frontmatter.categories,
  tag: frontmatter.tags,
  image: frontmatter.image,
});

let copyActive = false;

function Index({
  post,
  content,
  before,
  next,
}: {
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

  useEffect(() => {
    setResponsivePost(post);
  }, [post]);

  useEffect(() => {
    if (responsivePost?.frontmatter) {
      ((window as any).Kakao as any).Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: responsivePost.frontmatter.title,
          description:
            responsivePost.frontmatter.description.slice(0, 50) + "...",
          imageUrl: location.origin + responsivePost.frontmatter.image,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: location.origin + location.pathname,
            webUrl: location.origin + location.pathname,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: location.origin + location.pathname,
              webUrl: location.origin + location.pathname,
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: location.origin + location.pathname,
              webUrl: location.origin + location.pathname,
            },
          },
        ],
      });
    }
  }, [responsivePost?.frontmatter]);

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

  const isUpdated =
    responsivePost &&
    responsivePost.frontmatter.modified > responsivePost.frontmatter.date;

  return (
    <Stack
      id='post-wrap'
      direction={{ xs: "column", md: "row" }}
      sx={{
        width: { lg: "100%", xl: "80%" },
        height: "fit-content",
        position: "relative",
      }}>
      {responsivePost && (
        <Box id='side-bar-wrap'>
          <SideBar list={parseHeading(content)} />
        </Box>
      )}

      {responsivePost && (
        <Stack
          id='post'
          direction={{ xs: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            flex: 1,
            width: "100%",
            wordBreak: "break-word",
            whiteSpace: "break-spaces",
          }}>
          <GenerateHead
            metadatas={metadatas(responsivePost.frontmatter)}
            url={location.origin + "/blog" + responsivePost.frontmatter.slug}
          />

          <Stack
            sx={{
              width: { xs: "90vw", md: "60vw", lg: "60vw" },
            }}>
            <Box
              sx={{
                maxWidth: {
                  sm: "100",
                  lg: "80%",
                },
                m: {
                  sx: 0,
                  md: "auto",
                },
              }}>
              <PostNavigator before={before} next={next} />
              <Box
                sx={{
                  mb: 2,
                }}>
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
                fontWeight={200}
                fontFamily={`"IBM Plex Sans KR", sans-serif`}
                align='center'
                gutterBottom>
                {isUpdated && "Update."}
                {format(
                  (isUpdated
                    ? responsivePost.frontmatter.modified
                    : responsivePost.frontmatter.date) || "",
                  "YYYY-MM-dd HH:mm",
                  false
                )}
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
                <Tooltip title={`카카오톡 공유`} placement='bottom'>
                  <IconButton id='kakaotalk-sharing-btn' color={"inherit"}>
                    <img
                      width='24'
                      height='24'
                      src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
                      alt='카카오톡 공유 보내기 버튼'
                    />
                  </IconButton>
                </Tooltip>

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
                id='comment-wrap'
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
