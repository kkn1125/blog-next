import GenerateHead from "@/components/GenerateHead";
import { BRAND_DESC, BRAND_NAME } from "@/util/global";
import Head from "next/head";
import React from "react";

function Index() {
  return (
    <div>
      <GenerateHead
        metadatas={{
          title: BRAND_NAME,
          description: BRAND_DESC,
        }}
      />
      about
    </div>
  );
}

export default Index;
