import { Modal } from "@/components/dev/Modal";
import { Stack, Box, Toolbar, Container } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const sidebarSize = {
  min: 250,
  max: 350,
};

function BaseLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) {
  return (
    <Stack
      sx={{
        height: "100%",
      }}>
      <Header />
      <Toolbar />
      <Toolbar />
      <Stack
        direction='row'
        sx={{
          width: "100%",
          flex: 1,
        }}>
        {/* <Box
          sx={{
            position: "relative",
            minWidth: sidebarSize.min,
            maxWidth: sidebarSize.max,
            zIndex: 500,
            bgcolor: "background.paper",
            boxShadow: "0 0 10px #00000056",
          }}>
          <SideBar />
        </Box> */}
        <Box sx={{ flex: 1 }}>{children}</Box>
      </Stack>
      <Modal />
      <Toolbar />
      <Footer />
    </Stack>
  );
}

export default BaseLayout;
