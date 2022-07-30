import React from "react";
import Stack, { StackProps } from "../stack";
import Dropdown from "../dropdown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropdownMenuItem from "../dropdown/components/item";
import Button, { ButtonProps } from "../button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FolderIcon from "@mui/icons-material/Folder";
import "./index.scss";

export interface BreadcrumbsLinkProps extends ButtonProps {
  text: string;
}

export const BreadcrumbsLink: React.FC<BreadcrumbsLinkProps> = props => {
  return <Button className="ui-breadcrumbs__link" {...props}></Button>;
};

export const separate = (
  children: React.ReactElement[],
  { onRedirect }: { onRedirect: (href: string) => void }
): React.ReactElement[] => {
  const separatedChildren: React.ReactElement[] = [];

  for (let i = 0; i < children.length; ++i) {
    separatedChildren.push(
      React.cloneElement(children[i], {
        ...children[i].props,
        onClick: () => onRedirect(children[i].props.href),
      })
    );

    if (i + 1 === children.length) return separatedChildren;

    separatedChildren.push(
      <KeyboardArrowRightIcon key={i} className="ui-breadcrumbs__separator" />
    );
  }

  return separatedChildren;
};

export interface BreadcrumbsProps extends StackProps {
  onRedirect: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  onRedirect = () => {},
}) => {
  if (!children) return null;

  const c: React.ReactElement[] = Array.isArray(children)
    ? children
    : [children];

  if (c.length < 5) {
    return (
      <Stack direction="row" alignItems="center" className="ui-breadcrumbs">
        {separate(c, { onRedirect })}
      </Stack>
    );
  }

  const dropdown = (
    <Dropdown
      key={-1}
      text=""
      placement="bottom-start"
      variant="outlined"
      startIcon={
        <MoreHorizIcon className="ui-breadcrumbs__collapse-btn-icon" />
      }
      color="neutral"
      onClose={(href: any) => href && onRedirect(href.toString())}
    >
      {c.slice(1, c.length - 1).map(c => (
        <DropdownMenuItem
          key={c.props.href}
          startIcon={
            <FolderIcon className="ui-breadcrumbs__collapse-btn-icon" />
          }
          text={c.props.text}
          value={c.props.href}
          className="ui-breadcrumbs__collapse-item"
        ></DropdownMenuItem>
      ))}
    </Dropdown>
  );

  const firstChild = c[0];
  const lastChild = c[c.length - 1];

  return (
    <Stack direction="row" alignItems="center" className="ui-breadcrumbs">
      {separate([firstChild, dropdown, lastChild], { onRedirect })}
    </Stack>
  );
};

export default Breadcrumbs;
