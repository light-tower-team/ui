import React from "react";
import Button, { ButtonProps } from "../../button";

export interface BreadcrumbsLinkProps extends ButtonProps {
  href: string;
}

export const BreadcrumbsLink: React.FC<BreadcrumbsLinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="text"
      color="neutral"
      className={["ui-breadcrumbs__link", className].join(" ")}
    >
      {children}
    </Button>
  );
};

export default BreadcrumbsLink;
