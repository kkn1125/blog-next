import { Modal } from "@/components/dev/Modal";
import { Stack, Toolbar } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
        overflow: { xs: "auto", md: "unset" },
      }}>
      <Header />
      <Toolbar />
      <Stack
        id='main'
        direction='row'
        sx={{
          flex: 1,
          overflow: { xs: "unset", md: "auto" },
          position: "relative",
        }}
        justifyContent='center'>
        {children}
      </Stack>
      <Modal />
      <Footer />
    </Stack>
  );
}

export default BaseLayout;
