import GenerateHead from "@/components/GenerateHead";
import GoTop from "@/components/GoTop";
import PostNavigator from "@/components/PostNavigator";
import SideBar from "@/components/SideBar";
import {
  getArticleFromSlug,
  getBeforeArticleFromSlug,
  getNextArticleFromSlug,
  getSlugs,
  serializeMdx,
} from "@/libs/service";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { getReponsiveImageUrl, parseHeading } from "@/util/tool";
import { MergeComponents } from "@mdx-js/react/lib";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface CodeBlockProps {
  children: string;
  className: string;
}

const components: MDXComponents | MergeComponents = {
  code: ({ children, className }: CodeBlockProps | any) => {
    const language = className?.replace(/language-/, "");
    return className ? (
      <Stack
        sx={{
          my: 3,
          position: "relative",
          [`&::before`]: {
            content: '""',
            width: "100%",
            height: "2rem",
            backgroundColor: "#555",
            display: "block",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          overflow: "hidden",
        }}>
        <Typography
          sx={{
            position: "absolute",
            top: 16 * 1,
            left: 20,
            transform: "translateY(-50%)",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#ffffff",
          }}>
          {language.split("-").pop()}
        </Typography>
        <Box
          sx={{
            width: 15,
            height: 15,
            backgroundColor: "#f56767",
            borderRadius: "50%",
            position: "absolute",
            top: 16 * 1,
            right: 80,
            transform: "translateY(-50%)",
            transition: "150ms ease",
            [`&:hover`]: {
              transform: "translateY(-50%) scale(1.1)",
            },
          }}
        />
        <Box
          sx={{
            width: 15,
            height: 15,
            backgroundColor: "#e9ce63",
            borderRadius: "50%",
            position: "absolute",
            top: 16 * 1,
            right: 50,
            transform: "translateY(-50%)",
            transition: "150ms ease",
            [`&:hover`]: {
              transform: "translateY(-50%) scale(1.1)",
            },
          }}
        />
        <Box
          sx={{
            width: 15,
            height: 15,
            backgroundColor: "#68ee85",
            borderRadius: "50%",
            position: "absolute",
            top: 16 * 1,
            right: 20,
            transform: "translateY(-50%)",
            transition: "150ms ease",
            [`&:hover`]: {
              transform: "translateY(-50%) scale(1.1)",
            },
          }}
        />
        <SyntaxHighlighter
          showLineNumbers
          language={language}
          style={tomorrowNight}
          customStyle={{ overflowX: "auto", margin: 0 }}>
          {children}
        </SyntaxHighlighter>
      </Stack>
    ) : (
      <Box
        component='code'
        sx={(theme) => ({
          borderRadius: "0.3rem",
          color: "#ffffff !important",
          fontSize: theme.typography.pxToRem(14),
          backgroundColor: theme.palette.secondary.main,
          px: 1.2,
          py: 0.5,
          mx: 0.5,
        })}>
        {children}
      </Box>
    );
  },
  pre: ({ children }: any) => <div>{children}</div>,
  /* pre in p error 해결 */
  p: ({ children }: any) => <div>{children}</div>,
  // img: ({ children, ...rest }: any) => <img {...rest} children={children} />,
  figure: ({ children }: any) => <>{children}</>,
  img: () => <img src='' alt='' />,
  blockquote: ({ children }: any) => (
    <Box
      component='blockquote'
      sx={{
        borderLeft: (theme) => `5px solid ${theme.palette.text.primary}`,
        mx: 0,
        my: 5,
        py: 2,
        pl: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        "& a": {
          color: "inherit",
        },
      }}>
      {children}
    </Box>
  ),
  hr: ({ children }) => <Divider sx={{ my: 3, width: "100%" }} flexItem />,
  h1: ({ children }) => (
    <Box
      component='h1'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  h2: ({ children }) => (
    <Box
      component='h2'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  h3: ({ children }) => (
    <Box
      component='h3'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  h4: ({ children }) => (
    <Box
      component='h4'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  h5: ({ children }) => (
    <Box
      component='h5'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  h6: ({ children }) => (
    <Box
      component='h6'
      id={(children as string)[1].toLowerCase().trim().replace(/[\s]+/gm, "-")}
      sx={{
        position: "relative",
        scrollMarginTop: 65,
        "& a": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}>
      {children}
    </Box>
  ),
  a: ({ children, ...rest }: any) => (
    <Box
      component={Link}
      {...rest}
      sx={{
        textDecoration: "none",
        color: (theme) => theme.palette.primary.main,
        fontWeight: 400,
        display: "inline-block",
      }}>
      {children}
    </Box>
  ),
  table: ({ children }) => (
    <Box
      component='table'
      sx={{
        my: 2,
        borderCollapse: "collapse",
        "& :is(thead,tbody)": {
          "tr :is(th,td)": {
            borderWidth: 1,
            borderColor: "#cccccc",
            borderStyle: "solid",
            textAlign: "center",
          },
        },
        "& thead": {
          "tr th": {
            borderTop: "none",
            py: 1,
          },
          "th:nth-of-type(1)": {
            borderLeft: "none !important",
          },
          "th,th:last-child": {
            borderRight: "none !important",
          },
          tr: {
            borderBottom: "3px solid #cccccc",
            textTransform: "uppercase",
          },
        },
        "& tbody": {
          "tr:last-child td": {
            borderBottom: "none !important",
          },
          tr: {
            "td:nth-of-type(1)": {
              borderLeft: "none !important",
            },
            "td,td:last-child": {
              borderRight: "none !important",
            },
          },
        },
      }}>
      {children}
    </Box>
  ),
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

  useEffect(() => {
    setResponsivePost(post);
  }, [post]);

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
              width: { xs: "100%", md: "70%", lg: '60%' },
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
