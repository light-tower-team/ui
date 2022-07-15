import React from "react";
import Stack, { StackProps } from "../../../stack";
import styles from "./index.module.scss";

export type TokenGroupProps = StackProps;

export const TokenGroup: React.FC<TokenGroupProps> = ({ children }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      className={styles["ui-token-group"]}
    >
      {children}
    </Stack>
  );
};

export default TokenGroup;
