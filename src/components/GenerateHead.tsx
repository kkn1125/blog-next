import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";

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
      dataSet.push(<meta property={`og:${k}`} content={v} />);
      dataSet.push(<meta property={`og:site_name`} content={"DEVKIMSON"} />);
    } else if (k === "category" || k === "tag") {
      // (v as unknown as any[]).forEach((vv: string) => {
      dataSet.push(
        <meta name={k} content={(v as unknown as any[]).join(",")} />
      );
      dataSet.push(
        <meta
          property={`og:${k}`}
          content={(v as unknown as any[]).join(",")}
        />
      );
      // });
    } else if (k === "image") {
      dataSet.push(
        <meta name={k} content={v.match(/^\/assets/) ? v : `/assets${v}`} />
      );
      dataSet.push(
        <meta
          property={`og:${k}`}
          content={v.match(/^\/assets/) ? v : `/assets${v}`}
        />
      );
    } else if (k === "keywords") {
      const keywords = v.replace(/,+/, ",").split(",");
      const dupRemove = [...new Set(keywords)];
      dataSet.push(<meta name={k} content={dupRemove.join(",")} />);
      dataSet.push(<meta property={`og:${k}`} content={dupRemove.join(",")} />);
    } else {
      dataSet.push(<meta name={k} content={v} />);
      dataSet.push(<meta property={`og:${k}`} content={v} />);
    }
  });
  return dataSet;
}

function GenerateHead({ metadatas }: { metadatas: Metadata; url?: string }) {
  const [parent, setParent] = useState<{
    origin?: Window["location"]["origin"];
    pathname?: Window["location"]["pathname"];
  }>({});
  useEffect(() => {
    setParent(window.location);
  });

  return (
    <Head>
      {convertToMetadata(metadatas).map((meta, i) => {
        return <Fragment key={i}>{meta}</Fragment>;
      })}
      <link
        rel='canonical'
        href={(parent?.origin || "") + (parent?.pathname || "")}
      />
    </Head>
  );
}

export default GenerateHead;
