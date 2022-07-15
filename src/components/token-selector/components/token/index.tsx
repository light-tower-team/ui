import React from "react";
import Stack from "../../../stack";
import Typography from "../../../typography";
import styles from "./index.module.scss";

export interface TokenProps {
  label: string;
}

export const Token: React.FC<TokenProps> = ({ label }) => {
  return (
    <Stack className={styles["ui-token"]}>
      <Typography variant="subtitle1">{label}</Typography>
    </Stack>
  );
};

export default Token;
