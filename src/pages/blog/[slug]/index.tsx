import GenerateHead from "@/components/GenerateHead";
import PostLayout from "@/layouts/PostLayout";
import { getArticleFromSlug, getSlugs, serializeMdx } from "@/libs/service";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { getReponsiveImageUrl } from "@/util/tool";
import { MergeComponents } from "@mdx-js/react/lib";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote";
import { useState, useEffect } from "react";
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
};

const metadatas = (title: string, desc: string) => ({
  title: `${BRAND_NAME.toUpperCase()}::${title}`,
  description: desc
    .slice(0, 50)
    .replace(/[<>']+/g, "")
    .trim(),
  author: AUTHOR,
});

function Index({
  slugs,
  origin,
  post,
}: {
  slugs: string[];
  origin: any;
  post: any;
}) {
  const [responsivePost, setResponsivePost] = useState<any>(null);

  useEffect(() => {
    setResponsivePost(post);
  }, []);

  return (
    <Stack sx={{ flex: 1 }}>
      {responsivePost && (
        <>
          <GenerateHead
            metadatas={metadatas(
              responsivePost.frontmatter.title,
              responsivePost.frontmatter.description
            )}
          />
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
          </PostLayout>
        </>
      )}
    </Stack>
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
