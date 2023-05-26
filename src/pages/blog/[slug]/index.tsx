import { MDXComponents } from "mdx/types";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { MDXRemote } from "next-mdx-remote";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getArticleFromSlug, getSlugs } from "@/libs/service";

interface CodeBlockProps {
  children: string;
  className: string;
}

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

function Index({ slugs, post }: { slugs: string[]; post: any }) {
  return (
    <div>
      {post && (
        <>
          <div>{post?.frontmatter?.title || ""}</div>
          <MDXRemote {...post} components={components as MDXComponents} />
        </>
      )}
    </div>
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
