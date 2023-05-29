import Head from "next/head";
import React, { Fragment } from "react";

type Metadata = {
  [k: string]: string;
};

function convertToMetadata(metadatas: Metadata) {
  let isTitleExists = false;
  const dataSet: React.JSX.Element[] = [];
  Object.entries(metadatas).forEach(([k, v], i, o) => {
    if (k === "title") {
      isTitleExists = true;
      dataSet.push(<title>{v}</title>);
      dataSet.push(<meta name={k} content={v} />);
      dataSet.push(<meta name={`og:${k}`} content={v} />);
    } else if (k === "category" || k === "tag") {
      // (v as unknown as any[]).forEach((vv: string) => {
      dataSet.push(
        <meta name={k} content={(v as unknown as any[]).join(",")} />
      );
      dataSet.push(
        <meta name={`og:${k}`} content={(v as unknown as any[]).join(",")} />
      );
      // });
    } else {
      dataSet.push(<meta name={k} content={v} />);
      dataSet.push(<meta name={`og:${k}`} content={v} />);
    }
  });
  return dataSet;
}

function GenerateHead({ metadatas }: { metadatas: Metadata }) {
  return (
    <Head>
      {convertToMetadata(metadatas).map((meta, i) => {
        return <Fragment key={i}>{meta}</Fragment>;
      })}
    </Head>
  );
}

export default GenerateHead;
