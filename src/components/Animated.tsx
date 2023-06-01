import { setAnimate } from "@/util/tool";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

function Animated({
  animate = "fadeInUp",
  order,
  card = false,
  children,
}: {
  animate: string;
  order: number;
  card?: boolean;
  children:
    | React.ReactElement
    | React.ReactElement[]
    | string
    | string[]
    | undefined
    | null;
}) {
  const router = useRouter();
  const [anime, setAnime] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAnimate(
      setAnime,
      ["animate__animated", `animate__${animate}`],
      order,
      setLoading
    );
    return () => {
      setAnime(() => "");
      setLoading(() => false);
    };
  }, [router.query, router.pathname]);
  if (!loading) return <></>;
  return (
    <Box
      data-type='animated'
      {...(anime && { className: anime })}
      sx={{
        // width: "inherit",
        ...(card
          ? {
              width: "100%",
              // maxWidth: "fit-content",
            }
          : { width: "inherit" }),
        height: "auto",
      }}>
      {children}
    </Box>
  );
}

export default Animated;
