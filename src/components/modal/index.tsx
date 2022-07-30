import React from "react";
import MUIModal, { ModalProps as MUIModalProps } from "@mui/material/Modal";
import Stack, { StackProps } from "../stack";
import "./index.scss";

export interface ModalContentProps extends StackProps {
  header?: React.ReactElement;
  children?: React.ReactElement;
  footer?: React.ReactElement;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  header,
  children,
  footer,
  ...props
}) => {
  return (
    <Stack className={["ui-modal__content", props.className].join()} {...props}>
      <Stack className="ui-modal__header">{header}</Stack>
      <Stack className="ui-modal__body">{children}</Stack>
      <Stack className="ui-modal__footer">{footer}</Stack>
    </Stack>
  );
};

export type ModalProps = MUIModalProps;

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <MUIModal {...props}>
      <Stack justifyContent="center" alignItems="center" className="ui-modal">
        {children}
      </Stack>
    </MUIModal>
  );
};

export default Modal;
