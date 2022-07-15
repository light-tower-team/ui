import React from "react";

export interface ThemeContextType {
  APP_ROOT_DIR: string;
  PORTAL_ROOT_DIR: string;
}

export const initialThemeConfig: ThemeContextType = {
  APP_ROOT_DIR: "app-root",
  PORTAL_ROOT_DIR: "portal-root",
};

export const ThemeContext =
  React.createContext<ThemeContextType>(initialThemeConfig);

export default ThemeContext;
