import { PostProvider } from "@/context/PostProvider";
import ThemeModeProvider from "@/context/ThemeModeProvider";
import { VisitorProvider } from "@/context/VisitorProvider";
import BaseLayout from "@/layouts/BaseLayout";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { CacheProvider, css, EmotionCache } from "@emotion/react";
import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "animate.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import createEmotionCache from "../libs/createEmotionCache";
import "./theme/prism-dracular.css";
// Client-side cache, shared for the whole session of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // useEffect(() => {
  //   (async () => {
  //     if ("serviceWorker" in navigator) {
  //       try {
  //         const registration = await navigator.serviceWorker.register(
  //           "/worker.js"
  //         );
  //         console.log(registration);
  //         if (registration.installing) {
  //           console.log("Service worker installing");
  //         } else if (registration.waiting) {
  //           console.log("Service worker waiting");
  //         } else if (registration.active) {
  //           console.log("Service worker active");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("no service worker");
  //     }
  //   })();
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta property='type' content={"website"} />
        <meta property='og:type' content={"website"} />
        <meta property='author' content={AUTHOR} />
        <meta property='og:author' content={AUTHOR} />
        <meta property='url' content={"https://kkn1125.github.io/"} />
        <meta property='og:url' content={"https://kkn1125.github.io/"} />
        <meta property='site_name' content={BRAND_NAME.toUpperCase()} />
        <meta property='og:site_name' content={BRAND_NAME.toUpperCase()} />
        <meta property='locale' content={"ko_KR"} />
        <meta property='og:locale' content={"ko_KR"} />
        <meta property='locale:alternate' content={"en_US"} />
        <meta property='og:locale:alternate' content={"en_US"} />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
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
      <Script
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7028508433313066'
        async
        crossOrigin='anonymous'></Script>
      <VisitorProvider>
        <ThemeModeProvider>
          <PostProvider>
            <>
              <GlobalStyles
                styles={(theme) => css`
                  :root {
                    font-family: "IBM Plex Sans KR", sans-serif;
                  }

                  #post {
                    :is(ol, ul) {
                      line-height: 1;
                      :is(ol, ul) {
                        line-height: calc(1em * 1.5);
                      }
                    }
                  }

                  ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                    background-color: #373c0056;
                  }
                  ::-webkit-scrollbar-thumb {
                    width: 8px;
                    height: 8px;
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

                    line-height: 1;

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
          </PostProvider>
        </ThemeModeProvider>
      </VisitorProvider>
    </CacheProvider>
  );
}
