import LazyImage from "./LazyImage";

function KakaoShare({ frontmatter }: { frontmatter: any }) {
  return (
    <LazyImage
      width={24}
      height={24}
      src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
      alt='카카오톡 공유 보내기 버튼'
    />
  );
}

export default KakaoShare;
