import { AutocompleteSize, AutocompleteVariant, autocompleteContentVariants, autocompleteControlVariants, autocompleteItemVariants, autocompleteVariants } from "./autocomplete-variants.mjs";
import * as React$1 from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";

//#region src/Autocomplete/Autocomplete.d.ts
interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface AutocompleteProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'value' | 'defaultValue' | 'onChange'> {
  /** 选项列表，按 `label` 过滤。 */
  items: AutocompleteOption[];
  /** 受控输入文本。 */
  value?: string;
  /** 非受控初始输入文本。 */
  defaultValue?: string;
  /** 输入文本变化回调（含选中项后填入的 label）。 */
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  /** 高度阶梯。 */
  size?: AutocompleteSize;
  /** 视觉样式。 */
  variant?: AutocompleteVariant;
  /** 是否显示清除按钮。 */
  clearable?: boolean;
  /** 是否显示右侧下拉箭头。 */
  icon?: boolean;
}
declare function Autocomplete$1({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  label,
  error,
  disabled,
  size,
  variant,
  clearable,
  icon,
  ref,
  ...props
}: AutocompleteProps): React$1.JSX.Element;
declare namespace Autocomplete$1 {
  var displayName: string;
  var Input: typeof AutocompleteInput;
  var Content: typeof AutocompleteContent;
  var List: typeof AutocompleteList;
  var Item: typeof AutocompleteItem;
  var Empty: typeof AutocompleteEmpty;
}
type AutocompleteInputProps = React$1.ComponentPropsWithRef<typeof Autocomplete.Input>;
declare function AutocompleteInput({
  className,
  ref,
  ...props
}: AutocompleteInputProps): React$1.JSX.Element;
declare namespace AutocompleteInput {
  var displayName: string;
}
type AutocompleteContentProps = React$1.ComponentPropsWithRef<typeof Autocomplete.Popup>;
declare function AutocompleteContent({
  className,
  ref,
  ...props
}: AutocompleteContentProps): React$1.JSX.Element;
declare namespace AutocompleteContent {
  var displayName: string;
}
type AutocompleteListProps = React$1.ComponentPropsWithRef<typeof Autocomplete.List>;
declare function AutocompleteList({
  className,
  ref,
  ...props
}: AutocompleteListProps): React$1.JSX.Element;
declare namespace AutocompleteList {
  var displayName: string;
}
type AutocompleteItemProps = React$1.ComponentPropsWithRef<typeof Autocomplete.Item>;
declare function AutocompleteItem({
  className,
  ref,
  ...props
}: AutocompleteItemProps): React$1.JSX.Element;
declare namespace AutocompleteItem {
  var displayName: string;
}
type AutocompleteEmptyProps = React$1.ComponentPropsWithRef<typeof Autocomplete.Empty>;
declare function AutocompleteEmpty({
  className,
  children,
  ref,
  ...props
}: AutocompleteEmptyProps): React$1.JSX.Element;
declare namespace AutocompleteEmpty {
  var displayName: string;
}
//#endregion
export { Autocomplete$1 as Autocomplete, AutocompleteContent, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompleteOption, AutocompleteProps };
//# sourceMappingURL=Autocomplete.d.mts.map