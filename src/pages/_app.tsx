import ThemeModeProvider from "@/context/ThemeModeProvider";
import { VisitorProvider } from "@/context/VisitorProvider";
import BaseLayout from "@/layouts/BaseLayout";
import { getAllArticles } from "@/libs/service";
import { CacheProvider, css, EmotionCache } from "@emotion/react";
import { MDXProvider } from "@mdx-js/react";
import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { MDXComponents } from "mdx/types";
import { AppProps } from "next/app";
import Head from "next/head";
import createEmotionCache from "../libs/createEmotionCache";

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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        {/* favicon */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
      </Head>
      <VisitorProvider>
        <ThemeModeProvider>
          <>
            <GlobalStyles
              styles={(theme) => css`
                :root {
                  font-family: "IBM Plex Sans KR", sans-serif;
                }

                ::-webkit-scrollbar {
                  width: 8px;
                  background-color: #373c0056;
                }
                ::-webkit-scrollbar-thumb {
                  width: 8px;
                  background-color: #373c00;
                }
                ::selection {
                  color: inherit;
                  background: ${theme.palette.secondary.dark}56;
                }

                html,
                body {
                  overflow: hidden;
                  height: 100%;
                  margin: 0;

                  #__next {
                    height: 100%;
                    font-family: "IBM Plex Sans KR", sans-serif;
                  }

                  .w-inline-block {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    img {
                      width: 100%;
                    }
                    figcaption {
                      font-family: "IBM Plex Sans KR", sans-serif;
                      font-size: 14px;
                      padding-top: 0.3rem;
                      padding-bottom: 0.3rem;
                      text-align: center;
                      background-color: #000000a6;
                      color: #ffffff;
                    }
                  }
                }

                .MuiChip-root {
                  font-family: "IBM Plex Sans KR", sans-serif !important;
                }
              `}
            />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </>
        </ThemeModeProvider>
      </VisitorProvider>
    </CacheProvider>
  );
}
