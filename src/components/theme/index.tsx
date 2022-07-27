import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import Stack from "../stack";
import ThemeContext, { initialThemeConfig, ThemeContextType } from "./context";
import theme from "./theme";

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLElement> {
  config?: ThemeContextType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  const [ctx] = React.useState<ThemeContextType>(config ?? initialThemeConfig);

  return (
    <MUIThemeProvider theme={theme}>
      <ThemeContext.Provider value={ctx}>
        <Stack
          id={ctx.APP_ROOT_DIR}
          className="ui-pos-rel ui-w-full ui-h-screen"
        >
          {children}
        </Stack>
        <Stack id={ctx.PORTAL_ROOT_DIR}></Stack>
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
