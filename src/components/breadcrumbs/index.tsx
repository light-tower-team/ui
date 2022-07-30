import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FolderIcon from "@mui/icons-material/Folder";
import Stack, { StackProps } from "../stack";
import Dropdown from "../dropdown";
import DropdownMenuItem from "../dropdown/components/item";
import BreadcrumbsLink, { BreadcrumbsLinkProps } from "./components/link";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import "./index.scss";

type BreadcrumbsChild = React.ReactElement<
  BreadcrumbsLinkProps,
  typeof BreadcrumbsLink
>;

export const separate = (
  children: BreadcrumbsChild[],
  { onRedirect }: { onRedirect: (href: string) => void }
): React.ReactElement[] => {
  const separatedChildren: React.ReactElement[] = [];

  for (let i = 0; i < children.length; ++i) {
    separatedChildren.push(
      React.cloneElement(children[i], {
        key: children[i].props.href,
        onClick: () => onRedirect(children[i].props.href),
      })
    );

    if (i + 1 === children.length) return separatedChildren;

    separatedChildren.push(
      <KeyboardArrowRightIcon
        key={children[i].props.href + "__separator"}
        className="ui-breadcrumbs__separator"
        fontSize="small"
      />
    );
  }

  return separatedChildren;
};

export interface BreadcrumbsProps extends Omit<StackProps, "children"> {
  children: BreadcrumbsChild | BreadcrumbsChild[];
  onRedirect?: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  onRedirect = () => {},
}) => {
  if (!children) return null;

  const links: React.ReactElement<
    BreadcrumbsLinkProps,
    typeof BreadcrumbsLink
  >[] = Array.isArray(children) ? children : [children];

  if (links.length < 5) {
    const breadcrumbs = separate(links, { onRedirect });

    const last = breadcrumbs[breadcrumbs.length - 1];

    return (
      <Stack direction="row" alignItems="center" className="ui-breadcrumbs">
        {[
          ...breadcrumbs.slice(0, breadcrumbs.length - 1),
          React.cloneElement(last, { startIcon: <FolderOpenIcon /> }),
        ]}
      </Stack>
    );
  }

  const dropdown = (
    <Dropdown
      key={-1}
      startIcon={<MoreHorizIcon />}
      variant="text"
      color="neutral"
      rounded
    >
      {links.slice(1, links.length - 1).map(c => (
        <DropdownMenuItem
          key={c.props.href}
          startIcon={<FolderIcon />}
          onClick={() => onRedirect(c.props.href)}
        >
          {c.props.children}
        </DropdownMenuItem>
      ))}
    </Dropdown>
  );

  const firstLink = links[0];
  const lastLink = React.cloneElement(links[links.length - 1], {
    startIcon: <FolderOpenIcon />,
  });

  return (
    <Stack direction="row" alignItems="center" className="ui-breadcrumbs">
      {separate([firstLink, dropdown, lastLink], { onRedirect })}
    </Stack>
  );
};

export default Object.assign(Breadcrumbs, {
  Link: BreadcrumbsLink,
});
