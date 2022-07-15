import React from "react";
import Button, { VariantButton } from "../button";
import Menu, { MenuWithoutAnchorProps } from "../menu";

export interface DropdownProps extends MenuWithoutAnchorProps {
  text: string;
  variant?: VariantButton;
  startIcon?: React.ReactElement | null;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export const Dropdown: React.FC<DropdownProps> = ({
  text,
  color = "primary",
  variant = "contained",
  startIcon = null,
  children = null,
  placement = "right-start",
  loading = false,
  selectFirstItem = false,
  onOpen = () => {},
  onClose = () => {},
  ...props
}) => {
  const button = (
    <Button
      text={text}
      startIcon={startIcon}
      color={color}
      variant={variant}
    ></Button>
  );

  return (
    <Menu
      anchor={button}
      placement={placement}
      selectFirstItem={selectFirstItem}
      loading={loading}
      onOpen={onOpen}
      onClose={onClose}
      {...props}
    >
      {children}
    </Menu>
  );
};

export default Dropdown;
