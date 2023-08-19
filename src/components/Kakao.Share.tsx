import { BLOG, K_APP_KEY } from "@/util/global";
import { Box, IconButton, Tooltip } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";

function KakaoShare({ frontmatter }: { frontmatter: any }) {
  useEffect(() => {
    if (frontmatter) {
      ((window as any).Kakao as any).Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: frontmatter.title,
          description: frontmatter.description.slice(0, 50) + "...",
          imageUrl: location.origin + frontmatter.image,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: location.origin + location.pathname,
            webUrl: location.origin + location.pathname,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: location.origin + location.pathname,
              webUrl: location.origin + location.pathname,
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: location.origin + location.pathname,
              webUrl: location.origin + location.pathname,
            },
          },
        ],
      });
    }
  }, []);

  return (
    <Tooltip title={`카카오톡 공유`} placement='bottom'>
      <IconButton id='kakaotalk-sharing-btn' color={"inherit"}>
        <img
          width='24'
          height='24'
          src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
          alt='카카오톡 공유 보내기 버튼'
        />
      </IconButton>
    </Tooltip>
  );
}

export default KakaoShare;
