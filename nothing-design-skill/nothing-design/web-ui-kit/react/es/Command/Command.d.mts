import { CommandSize, commandItemVariants } from "./command-variants.mjs";
import * as React$1 from "react";

//#region src/Command/Command.d.ts
interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React$1.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}
interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}
interface CommandProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> {
  groups: CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 搜索框与命令行的高度：36 / 44 / 52px。 */
  size?: CommandSize;
}
declare function Command({
  className,
  groups,
  placeholder,
  emptyMessage,
  open: controlledOpen,
  onOpenChange,
  size,
  ref,
  ...props
}: CommandProps): React$1.JSX.Element;
declare namespace Command {
  var displayName: string;
}
//#endregion
export { Command, CommandGroup, CommandItem, CommandProps };
//# sourceMappingURL=Command.d.mts.map