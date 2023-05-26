"use client";

import { Stack, Box, Toolbar } from "@mui/material";
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
      <Stack
        direction='row'
        sx={{
          width: "100%",
          flex: 1,
        }}>
        <Box
          sx={{
            position: "relative",
            minWidth: sidebarSize.min,
            maxWidth: sidebarSize.max,
            zIndex: 500,
          }}>
          <SideBar />
        </Box>
        <Stack
          sx={{
            width: "70%",
            mx: "auto",
          }}>
          <Toolbar />
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}

export default BaseLayout;
