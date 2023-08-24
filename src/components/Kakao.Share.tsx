import { BLOG, K_APP_KEY } from "@/util/global";
import { Box, IconButton, Tooltip } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";

function KakaoShare({ frontmatter }: { frontmatter: any }) {
  return (
    <img
      width='24'
      height='24'
      src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
      alt='카카오톡 공유 보내기 버튼'
    />
  );
}

export default KakaoShare;
