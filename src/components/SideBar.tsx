import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Toolbar } from "@mui/material";

export default function SideBar({ list }: { list: any[] }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        position: "sticky",
        top: 0,
        width: 300,
        bgcolor: "background.paper",
        // height: "calc(100vh - 68px)",
        overflow: "auto",
      }}
      component='nav'
      subheader={
        <>
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
      {list.map((item) => (
        <ListItemButton
          sx={{ ml: (item.match(/#/gm).length - 1) * 5 }}
          onClick={() => {
            (document.getElementById("post") as HTMLDivElement).scrollTo({
              behavior: "smooth",
              top: 68,
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
