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
        maxHeight: "100vh",
      }}>
      <Header />
      <Toolbar />
      <Stack
        direction='row'
        sx={{
          width: "100%",
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}>
        {children}
      </Stack>
      <Modal />
      <Footer />
    </Stack>
  );
}

export default BaseLayout;
