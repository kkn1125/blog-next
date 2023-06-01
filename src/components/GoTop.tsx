import { IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import anime from "animejs";
import React, { useEffect, useRef, useState } from "react";

function GoTop() {
  const theme = useTheme();
  const [act, setAct] = useState();
  // const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const active = useRef(false);
  const [disable, setDisable] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // const target = isUpMd ? "#main" : "#__next > div";

  useEffect(() => {
    const main = document.querySelector("#main") as HTMLDivElement;
    const body = document.querySelector("#__next > div") as HTMLDivElement;
    main.addEventListener("scroll", detectScroll.bind(main));
    body.addEventListener("scroll", detectScroll.bind(body));
    return () => {
      main.removeEventListener("scroll", detectScroll.bind(main));
      body.removeEventListener("scroll", detectScroll.bind(body));
    };
  }, []);

  function detectScroll(this: any) {
    if (this.scrollTop === 0) {
      setTimeout(() => {
        setDisable(true);
        active.current = false;
      }, 1000);
    } else {
      if (!active.current && this.scrollTop > this.scrollHeight * 0.2) {
        setDisable(false);
        // });
      } else {
        if (!active.current) {
          setDisable(true);
        }
      }
    }
  }

  function handleGoTop() {
    const main = document.querySelector("#main") as HTMLDivElement;
    const body = document.querySelector("#__next > div") as HTMLDivElement;
    const gotop = document.querySelector(".gotop") as HTMLDivElement;

    active.current = true;
    (tooltipRef.current as HTMLDivElement).classList.remove(
      "animate__animated",
      "animate__rubberBand",
      "animate__infinite"
    );
    anime({
      targets: ".gotop",
      translateY: (-document.body.clientHeight - gotop.offsetTop) * 0.3,
      rotate: "2turn",
    });
    main.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
    body.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  }

  return disable ? (
    <></>
  ) : (
    <Tooltip
      ref={tooltipRef}
      title='Go Top'
      placement='bottom'
      className={
        active.current
          ? ""
          : "animate__animated animate__rubberBand animate__infinite"
      }>
      <IconButton
        className='gotop'
        sx={{
          position: "fixed",
          right: (theme) => theme.typography.pxToRem(25),
          bottom: (theme) => theme.typography.pxToRem(150),
          // backgroundColor: (theme) => theme.palette.info.main,
          width: 45,
          height: 45,
          zIndex: 1000,
          fontSize: (theme) => theme.typography.pxToRem(14),
          fontWeight: 700,
          color: (theme) => /* theme.palette.text.primary */ "transparent",
          userSelect: "none",
          textTransform: "uppercase",
          backgroundImage: `url(/assets/images/star.png)`,
          backgroundSize: "2rem",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onClick={handleGoTop}>
        top
      </IconButton>
    </Tooltip>
  );
}

export default GoTop;
