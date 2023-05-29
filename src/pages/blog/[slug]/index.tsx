import GenerateHead from "@/components/GenerateHead";
import SideBar from "@/components/SideBar";
import PostLayout from "@/layouts/PostLayout";
import { getArticleFromSlug, getSlugs, serializeMdx } from "@/libs/service";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { getReponsiveImageUrl } from "@/util/tool";
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
import { useState, useEffect, useRef } from "react";
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
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={tomorrowNight}>
        {children}
      </SyntaxHighlighter>
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
  img: ({ children, ...rest }: any) => <img {...rest} children={children} />,
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
  hr: ({ children }) => <Box component='hr' />,
  h1: ({ children }) => (
    <Box
      component='h1'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
  h2: ({ children }) => (
    <Box
      component='h2'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
  h3: ({ children }) => (
    <Box
      component='h3'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
  h4: ({ children }) => (
    <Box
      component='h4'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
  h5: ({ children }) => (
    <Box
      component='h5'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
  h6: ({ children }) => (
    <Box
      component='h6'
      id={(children as string).trim().replace(/[\s]+/gm, "_")}>
      {children}
    </Box>
  ),
};

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
  slugs,
  origin,
  post,
  content,
}: {
  slugs: string[];
  origin: any;
  post: any;
  content: any;
}) {
  const [responsivePost, setResponsivePost] = useState<any>(null);
  const [mode, setMode] = useState(false);
  const theme = useTheme();
  const commentEl = useRef<HTMLElement>();

  useEffect(() => {
    setResponsivePost(post);
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
  console.log(responsivePost?.frontmatter);
  return (
    <>
      <SideBar
        list={content
          .split(/[\n\r]/g)
          .filter((str: string) => str && str.match(/^#+/))}
      />
      <Stack direction='row' sx={{ flex: 1 }}>
        {responsivePost && (
          <>
            <GenerateHead metadatas={metadatas(responsivePost.frontmatter)} />
            <PostLayout>
              <Box
                component={"img"}
                src={getReponsiveImageUrl(responsivePost.frontmatter.image)}
                width={"100%"}
              />
              <Typography
                fontSize={(theme) => theme.typography.pxToRem(32)}
                fontWeight={700}
                fontFamily={`"IBM Plex Sans KR", sans-serif`}
                align='center'
                gutterBottom>
                {responsivePost.frontmatter.title || ""}
              </Typography>
              <Divider sx={{ my: 3 }} />
              <MDXRemote
                {...responsivePost}
                components={components as MDXComponents | MergeComponents}
              />
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
            </PostLayout>
          </>
        )}
      </Stack>
    </>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getArticleFromSlug(params.slug);

  const mdxSource = (await serializeMdx(post.content || "")) || {};

  mdxSource.frontmatter = post.frontmatter;

  return {
    props: {
      origin: post,
      post: mdxSource,
      content: post.content,
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
