import SendIcon from "@mui/icons-material/Send";
import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";

export default function SideBar({ list }: { list: any[] }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState<any[]>([]);
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setIndex(new Array(list.length).fill(0));

    // window.addEventListener("wheel", handleScrollMove);
    return () => {
      // window.removeEventListener("wheel", handleScrollMove);
    };
  }, []);

  const convertIdString = (str: string) =>
    str.replace(/#+/gm, "").trim().replace(/[\s]+/gm, "_");

  // function handleScrollMove(e: MouseEvent) {
  //   const main = document.querySelector("#main") as HTMLDivElement;
  //   console.log(main.scrollTop);
  //   const copy = index.map((i) => 0);
  //   const idx =
  //     list.findIndex(
  //       (sub) =>
  //         (document.getElementById(convertIdString(sub))?.offsetTop || 0) >=
  //         main.scrollTop + 100
  //     ) - 1 || 0;
  //   if (idx > -1) {
  //     copy[idx] = 1;
  //   }
  //   setIndex(copy.slice(0));
  // }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        position: { xs: "static", md: "sticky" },
        top: 0,
        width: 300,
        bgcolor: "inherit",
        // height: "calc(100vh - 68px)",
        overflow: "auto",
      }}
      component='nav'
      subheader={
        <>
          <Toolbar />
          {/* <ListSubheader
          component='div'
          sx={{
            position: "static",
            color: "inherit",
          }}>
          Blog Menu List
        </ListSubheader> */}
        </>
      }>
      {list.map((item, i) => (
        <ListItemButton
          key={i}
          sx={{
            ml: (item.match(/#/gm).length - 1) * 5,
          }}
          onClick={() => {
            // const ii = document.getElementById(`${convertIdString(item)}`);
            // console.log(ii);
            const target = isUpMd ? "#main" : "#__next > div";
            (document.querySelector(target) as HTMLDivElement).scrollTo({
              behavior: "smooth",
              top:
                Number(
                  document.getElementById(`${convertIdString(item)}`)
                    ?.offsetTop || 0
                ) - 0,
              left: 0,
            });
          }}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={item.replace(/#+/, "").trim()} />
        </ListItemButton>
      ))}
    </List>
  );
}
