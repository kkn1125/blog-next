import darkTheme from "@/libs/darkTheme";
import lightTheme from "@/libs/lightTheme";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeModeProvider({ children }: { children: React.ReactElement }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode: "light" | "dark") => ({
    palette: {
      mode,
      ...(mode === "light" ? lightTheme : darkTheme),
    },
  });

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeModeProvider;
