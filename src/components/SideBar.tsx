import { convertIdString } from "@/util/tool";
import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SideBar({
  list,
}: {
  list: {
    order: number;
    head: string;
  }[];
}) {
  const router = useRouter();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [currentHead, setCurrentHead] = useState("");

  useEffect(() => {
    setCurrentHead(list[0]?.head || "");
    return () => {};
  }, []);

  return (
    <List
      sx={{
        position: { xs: "static", md: "sticky" },
        top: 0,
        width: {
          xs: "auto",
          md: 350,
        },
        bgcolor: "inherit",
        overflow: "auto",
        height: {
          xs: "auto",
          md: "calc(100vh - 72px - 64px)",
        },
      }}
      component='nav'
      subheader={
        <>
          <Toolbar />
        </>
      }>
      {list.map((item, i) => (
        <ListItemButton
          key={i}
          sx={{
            ml: item.order * 3,
            color: (theme) =>
              currentHead === item.head
                ? theme.palette.text.primary
                : theme.palette.text.disabled,
          }}
          onClick={() => {
            // const ii = document.getElementById(`${convertIdString(item)}`);
            // console.log(ii);
            router.push(`#${convertIdString(item.head)}`);
            setCurrentHead((currentHead) => item.head);
            const target = isUpMd ? "#main" : "#__next > div";
            // (document.querySelector(target) as HTMLDivElement).scrollTo({
            //   behavior: "smooth",
            //   top:
            //     Number(
            //       document.getElementById(`${convertIdString(item.head)}`)
            //         ?.offsetTop || 0
            //     ) - 0,
            //   left: 0,
            // });
          }}>
          {/* <ListItemIcon>
            <SendIcon />
          </ListItemIcon> */}
          <ListItemText primary={"📑 " + item.head.replace(/#+/, "").trim()} />
        </ListItemButton>
      ))}
    </List>
  );
}
