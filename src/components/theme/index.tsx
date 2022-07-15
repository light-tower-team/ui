import React from "react";
import Stack from "../stack";
import ThemeContext, { initialThemeConfig, ThemeContextType } from "./context";

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLElement> {
  config?: ThemeContextType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  config,
  children,
}) => {
  const [ctx] = React.useState<ThemeContextType>(config ?? initialThemeConfig);

  return (
    <ThemeContext.Provider value={ctx}>
      <Stack id={ctx.APP_ROOT_DIR}>{children}</Stack>
      <Stack id={ctx.PORTAL_ROOT_DIR}></Stack>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
