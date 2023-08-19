import Head from "next/head";
import React, { useEffect } from "react";

function AddToAny() {
  useEffect(() => {
    (async () => {
      var a2a_config: any = a2a_config || {};
      a2a_config.locale = "ko";
      const response = await fetch("https://static.addtoany.com/menu/page.js");
      const text = await response.text();
      const sc = document.createElement("script");
      sc.async = true;
      sc.innerText = text;
      document.head.append(sc);
    })();
  }, []);
  return (
    <div>
      {/* AddToAny BEGIN */}
      <div
        className='a2a_kit a2a_kit_size_32 a2a_default_style'
        data-a2a-url={location.href || "https://kkn1125.github.io/"}
        data-a2a-title='devkimson blog'>
        <a className='a2a_dd' href='https://www.addtoany.com/share'></a>
        <a className='a2a_button_kakao'></a>
        <a className='a2a_button_twitter'></a>
        <a className='a2a_button_facebook'></a>
        <a className='a2a_button_linkedin'></a>
        <a className='a2a_button_trello'></a>
        <a className='a2a_button_copy_link'></a>
      </div>
      <script
        defer
        async
        src='https://static.addtoany.com/menu/page.js'></script>

      {/* AddToAny END */}
    </div>
  );
}

export default AddToAny;
