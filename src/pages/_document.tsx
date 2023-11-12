import { K_APP_KEY } from "@/util/global";
import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import * as React from "react";
import createEmotionCache from "../libs/createEmotionCache";
import theme from "../libs/theme";
import { MyAppProps } from "./_app";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang='ko'>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PRBK72RQ');`,
          }}></script>

        <script
          src='/assets/kakao/min/t1.kakaocdn.net_kakao_js_sdk_2.3.0_kakao.min.js'
          integrity='sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh'
          crossOrigin='anonymous'></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.Kakao.init("${K_APP_KEY}");`,
          }}></script>

        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-XXKQGQJWVT'></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-XXKQGQJWVT');`,
          }}></script>

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
            var w = window;
            if (w.ChannelIO) {
              return w.console.error("ChannelIO script included twice.");
            }
            var ch = function () {
              ch.c(arguments);
            };
            ch.q = [];
            ch.c = function (args) {
              ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
              if (w.ChannelIOInitialized) {
                return;
              }
              w.ChannelIOInitialized = true;
              var s = document.createElement("script");
              s.type = "text/javascript";
              s.async = true;
              s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
              var x = document.getElementsByTagName("script")[0];
              if (x.parentNode) {
                x.parentNode.insertBefore(s, x);
              }
            }
            if (document.readyState === "complete") {
              l();
            } else {
              w.addEventListener("DOMContentLoaded", l);
              w.addEventListener("load", l);
            }
          })();

          ChannelIO("boot", {
            pluginKey: "2557dd40-c219-4bbb-9ab2-fc9748a31726",
            memberId: ${localStorage.getItem("Channel.ch-veil-id")},
            profile: {
              name: "name",
              mobileNumber: "",
              landlineNumber: "",
              CUSTOM_VALUE_1: "",
              CUSTOM_VALUE_2: "",
            }
          });`,
          }}></script> */}

        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <meta name='emotion-insertion-point' content='' />
        <meta
          name='google-site-verification'
          content='pPnTHKfNmML6i8GiyBMZNoyhbvX7i0SmgjNmj8r4Aos'
        />
        <meta
          name='naver-site-verification'
          content='6cebf2441529d02294b07c32ba2cd5ce09ba2c71'
        />
        {emotionStyleTags}
        {/* //@ts-ignore */}
      </Head>
      <body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-PRBK72RQ'
            height='0'
            width='0'
            style={{
              display: "none",
              visibility: "hidden",
            }}></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
