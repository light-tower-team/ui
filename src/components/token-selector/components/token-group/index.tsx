import React from "react";
import Stack, { StackProps } from "../../../stack";
import "./index.scss";

export type TokenGroupProps = StackProps;

export const TokenGroup: React.FC<TokenGroupProps> = ({ children }) => {
  return (
    <Stack direction="row" alignItems="center" className={"ui-token-group"}>
      {children}
    </Stack>
  );
};

export default TokenGroup;
