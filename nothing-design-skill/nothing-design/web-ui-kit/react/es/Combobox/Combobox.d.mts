import { ComboboxSize, ComboboxVariant, comboboxContentVariants, comboboxControlVariants, comboboxItemVariants, comboboxVariants } from "./combobox-variants.mjs";
import * as React$1 from "react";
import { Combobox } from "@base-ui/react/combobox";

//#region src/Combobox/Combobox.d.ts
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface ComboboxProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'value' | 'defaultValue' | 'onChange'> {
  /** 选项列表，按 `label` 过滤。 */
  items: ComboboxOption[];
  /**
   * 受控选中值。
   *
   * 非 freeInput 模式下是选中项的 `value`；freeInput 模式下是输入框文本本身。
   */
  value?: string;
  /** 非受控初始值，语义同 `value`。 */
  defaultValue?: string;
  /** 选中值变化回调。 */
  onValueChange?: (value: string) => void;
  /** 输入文本变化回调（用于跟踪过滤关键字）。 */
  onInputValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  /** 高度阶梯。 */
  size?: ComboboxSize;
  /** 视觉样式。 */
  variant?: ComboboxVariant;
  /** 是否显示清除按钮。 */
  clearable?: boolean;
  /**
   * 是否允许输入列表外的任意值。
   *
   * 关闭时（默认），输入仅用于过滤，选中后输入框回填选中项的 `label`，`value` 是选项的 `value`。
   * 开启时，输入文本即 `value`——`onValueChange` 会在每次输入时以当前文本触发，选中选项时则以该选项的 `label` 触发。
   */
  freeInput?: boolean;
}
declare function Combobox$1({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  onInputValueChange,
  placeholder,
  label,
  error,
  disabled,
  size,
  variant,
  clearable,
  freeInput,
  ref,
  ...props
}: ComboboxProps): React$1.JSX.Element;
declare namespace Combobox$1 {
  var displayName: string;
  var Input: typeof ComboboxInput;
  var Content: typeof ComboboxContent;
  var List: typeof ComboboxList;
  var Item: typeof ComboboxItem;
  var ItemIndicator: typeof ComboboxItemIndicator;
  var Empty: typeof ComboboxEmpty;
  var Group: typeof ComboboxGroup;
}
type ComboboxInputProps = React$1.ComponentPropsWithRef<typeof Combobox.Input>;
declare function ComboboxInput({
  className,
  ref,
  ...props
}: ComboboxInputProps): React$1.JSX.Element;
declare namespace ComboboxInput {
  var displayName: string;
}
type ComboboxContentProps = React$1.ComponentPropsWithRef<typeof Combobox.Popup>;
declare function ComboboxContent({
  className,
  ref,
  ...props
}: ComboboxContentProps): React$1.JSX.Element;
declare namespace ComboboxContent {
  var displayName: string;
}
type ComboboxListProps = React$1.ComponentPropsWithRef<typeof Combobox.List>;
declare function ComboboxList({
  className,
  ref,
  ...props
}: ComboboxListProps): React$1.JSX.Element;
declare namespace ComboboxList {
  var displayName: string;
}
type ComboboxItemProps = React$1.ComponentPropsWithRef<typeof Combobox.Item>;
declare function ComboboxItem({
  className,
  ref,
  ...props
}: ComboboxItemProps): React$1.JSX.Element;
declare namespace ComboboxItem {
  var displayName: string;
}
type ComboboxItemIndicatorProps = React$1.ComponentPropsWithRef<typeof Combobox.ItemIndicator>;
declare function ComboboxItemIndicator({
  className,
  ref,
  ...props
}: ComboboxItemIndicatorProps): React$1.JSX.Element;
declare namespace ComboboxItemIndicator {
  var displayName: string;
}
type ComboboxEmptyProps = React$1.ComponentPropsWithRef<typeof Combobox.Empty>;
declare function ComboboxEmpty({
  className,
  children,
  ref,
  ...props
}: ComboboxEmptyProps): React$1.JSX.Element;
declare namespace ComboboxEmpty {
  var displayName: string;
}
type ComboboxGroupProps = React$1.ComponentPropsWithRef<typeof Combobox.Group>;
declare function ComboboxGroup({
  className,
  ref,
  ...props
}: ComboboxGroupProps): React$1.JSX.Element;
declare namespace ComboboxGroup {
  var displayName: string;
}
//#endregion
export { Combobox$1 as Combobox, ComboboxContent, ComboboxContentProps, ComboboxEmpty, ComboboxEmptyProps, ComboboxGroup, ComboboxGroupProps, ComboboxInput, ComboboxInputProps, ComboboxItem, ComboboxItemIndicator, ComboboxItemIndicatorProps, ComboboxItemProps, ComboboxList, ComboboxListProps, ComboboxOption, ComboboxProps };
//# sourceMappingURL=Combobox.d.mts.map