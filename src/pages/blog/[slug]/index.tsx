import { MDXComponents } from "mdx/types";
import { serialize } from "next-mdx-remote/serialize";
import React, { useEffect, useState } from "react";
import GenerateHead from "@/components/GenerateHead";
import PostLayout from "@/layouts/PostLayout";
import { getArticleFromSlug, getSlugs, serializeMdx } from "@/libs/service";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";

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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(post);
  }, []);

  return (
    <Stack sx={{ flex: 1 }}>
      <GenerateHead
        metadatas={metadatas(
          post.frontmatter.title,
          post.frontmatter.description
        )}
      />
      <PostLayout>
        {data && (
          <>
            <Box component={"img"} src={`/static${data.frontmatter.image}`} />
            <Typography
              fontSize={(theme) => theme.typography.pxToRem(32)}
              fontWeight={700}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              align='center'
              gutterBottom>
              {data?.frontmatter?.title || ""}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <MDXRemote {...data} />
          </>
        )}
      </PostLayout>
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
