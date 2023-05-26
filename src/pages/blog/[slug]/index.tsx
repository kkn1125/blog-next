import { MDXComponents } from "mdx/types";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { MDXRemote } from "next-mdx-remote";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getArticleFromSlug, getSlugs } from "@/libs/service";
import { Stack, Typography } from "@mui/material";
import PostLayout from "@/layouts/PostLayout";
import GenerateHead from "@/components/GenerateHead";
import { BRAND_NAME, BRAND_DESC, AUTHOR } from "@/util/global";

interface CodeBlockProps {
  children: string;
  className: string;
}
const metadatas = (title: string, desc: string) => ({
  title: `${BRAND_NAME.toUpperCase()}::${title}`,
  description: desc
    .slice(0, 50)
    .replace(/[<>']+/g, "")
    .trim(),
  author: AUTHOR,
});

const components = {
  code: ({ children, className }: CodeBlockProps) => {
    const language = className.replace(/language-/, "");

    return (
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={tomorrowNight}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

function Index({
  slugs,
  origin,
  post,
}: {
  slugs: string[];
  origin: any;
  post: any;
}) {
  return (
    <Stack sx={{ flex: 1 }}>
      <GenerateHead
        metadatas={metadatas(
          post.frontmatter.title,
          post.frontmatter.description
        )}
      />
      <Typography fontSize={30} fontWeight={700}>
        Blog
      </Typography>
      <PostLayout>
        {post && (
          <>
            <div>{post?.frontmatter?.title || ""}</div>
            <MDXRemote {...post} components={components as MDXComponents} />
          </>
        )}
      </PostLayout>
    </Stack>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getArticleFromSlug(params.slug);

  const mdxSource =
    (await serialize(post.content || "", {
      mdxOptions: {
        development: process.env.NODE_ENV !== "production",
      },
    })) || {};

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
