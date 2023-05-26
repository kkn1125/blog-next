import { VisitorProvider } from "@/context/VisitorProvider";
import BaseLayout from "@/layouts/BaseLayout";
import { getAllArticles } from "@/libs/service";
import { CacheProvider, css, EmotionCache } from "@emotion/react";
import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import createEmotionCache from "../libs/createEmotionCache";
import theme from "../libs/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <VisitorProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={css`
              html,
              body {
                height: 100%;
                margin: 0;

                #__next {
                  height: 100%;
                }
              }
            `}
          />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </VisitorProvider>
    </CacheProvider>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();

  articles
    .map((article: any) => article.data)
    .sort(
      (
        a: { data: { publishedAt: number } },
        b: { data: { publishedAt: number } }
      ) => {
        if (a.data.publishedAt > b.data.publishedAt) return 1;
        if (a.data.publishedAt < b.data.publishedAt) return -1;

        return 0;
      }
    );

  return {
    props: {
      posts: articles.reverse(),
    },
  };
}
