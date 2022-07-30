import React from "react";
import Button from "../button";
import Menu, { MenuWithoutAnchorProps } from "../menu";

export interface DropdownProps extends MenuWithoutAnchorProps {
  text: string;
  variant?: "text" | "outlined" | "contained";
  startIcon?: React.ReactElement;
  color?: "neutral" | "primary";
}

export const Dropdown: React.FC<DropdownProps> = ({
  text,
  color = "primary",
  variant = "contained",
  startIcon,
  children,
  placement = "bottom-start",
  loading,
  selectFirstItem,
  onOpen = () => {},
  onClose = () => {},
  ...props
}) => {
  const button = (
    <Button startIcon={startIcon} color={color} variant={variant}>
      {text}
    </Button>
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
