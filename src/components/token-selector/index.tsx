import React from "react";
import * as uuid from "uuid";
import Typography from "../typography";
import MenuItem from "../menu/components/item";
import Stack from "../stack";
import MenuPopover from "../menu/components/menu-popover";
import HandleAttacher from "../menu/components/handle-attacher";
import Loading from "../loading";
import attach from "../menu/helpers/attach.helper";
import MenuContext, {
  initialCtx,
  MenuContextType,
  MenuItemType,
} from "../menu/helpers/context.helper";
import keyPressHandler from "../menu/helpers/key-press-handler.helper";
import styles from "./index.module.scss";
import Token from "./components/token";
import TokenGroup from "./components/token-group";
import "./index.module.scss";

export interface TokenType extends Record<string, unknown> {
  uuid: string;
  name: string;
  displayName: string;
  type: string;
}

export type TokenSelectorOption = TokenType;

export interface TokenSelectorProps {
  options: TokenSelectorOption[];
  tokens: TokenType[];
  placeholder?: string;
  loading?: boolean;
  allowUserDefineTokens?: boolean;
  hideOptionsWithoutItems?: boolean;
  onTokenAdded?: (token: TokenType) => void;
  onTokenRemoved?: (token: TokenType) => void;
  onValueChanged?: (value: string) => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  options,
  tokens,
  placeholder,
  loading = false,
  // allowUserDefineTokens = false,
  hideOptionsWithoutItems = false,
  onTokenAdded = () => {},
  onTokenRemoved = () => {},
  onValueChanged = () => {},
}) => {
  const [ctx, setCtx] = React.useState<MenuContextType>(initialCtx);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [confirmClosing, setConfirmClosing] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    const items = attach(
      options
        .filter(t => !value.length || t.displayName.startsWith(value))
        .map(o => <MenuItem key={o.uuid} text={o.displayName} value={o} />),
      {} as MenuItemType,
      {}
    );

    setCtx({
      items,
      currentItemUUIDs: items.length && confirmClosing ? [items[0].__uuid] : [],
      collapse: false,
      hovering: false,
      placement: "bottom-start",
      mutate: newCtx => setCtx({ ...newCtx }),
    });
  }, [value, options, confirmClosing]);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case "ArrowDown": {
        e.preventDefault();

        if (!anchorEl) {
          openMenuHandler(e);
          return;
        }

        keyPressHandler(e, ctx);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();

        keyPressHandler(e, ctx);
        break;
      }
      case "Enter": {
        e.preventDefault();

        keyPressHandler(e, ctx, closeMenuHandler);
        break;
      }
      case "Backspace": {
        if (value.length || !tokens.length) return;

        e.preventDefault();

        const removedToken = tokens[tokens.length - 1];

        setValue(removedToken.displayName);

        onTokenRemoved(removedToken);
        break;
      }
    }
  };

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.currentTarget?.value);

    onValueChanged(e.currentTarget?.value);
  };

  const openMenuHandler = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();

    setAnchorEl(inputRef.current);
  };

  const closeMenuHandler = (token: TokenType | null) => {
    if (token?.uuid) {
      onTokenAdded({ ...token, uuid: uuid.v4() });

      setValue("");
      setConfirmClosing(true);

      return;
    }

    setConfirmClosing(false);
    setAnchorEl(null);
  };

  const groupedTokens = React.useMemo(() => {
    const groupedTokens: React.ReactElement[] = [];

    for (let i = 0; i < tokens.length; i += 3) {
      const group: React.ReactElement[] = [];

      for (let j = i; j < i + 3 && j < tokens.length; ++j) {
        group.push(
          <Token key={tokens[j].uuid} label={tokens[j].displayName} />
        );
      }

      groupedTokens.push(<TokenGroup key={i}>{group}</TokenGroup>);
    }

    return groupedTokens;
  }, [tokens]);

  let items = (
    <HandleAttacher onClick={closeMenuHandler}>{ctx.items}</HandleAttacher>
  );

  if (loading) items = <Loading size={24} />;

  if (!loading && !ctx.items.length && !hideOptionsWithoutItems)
    items = <Typography>Oops! The criteria was not found</Typography>;

  return (
    <MenuContext.Provider value={ctx}>
      <Stack
        direction="row"
        alignItems="center"
        className={styles["ui-token-selector"]}
      >
        <Stack direction="row" alignItems="center">
          {groupedTokens}
        </Stack>
        <input
          ref={inputRef}
          placeholder={tokens.length ? "" : placeholder}
          onKeyDown={onKeyDownHandler}
          onClick={openMenuHandler}
          onInput={inputHandler}
          value={value}
          className={styles["ui-token-selector__input"]}
        />
        <MenuPopover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => closeMenuHandler(null)}
        >
          {items}
        </MenuPopover>
      </Stack>
    </MenuContext.Provider>
  );
};

export default TokenSelector;
