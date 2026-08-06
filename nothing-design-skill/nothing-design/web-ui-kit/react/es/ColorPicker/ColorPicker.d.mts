import { ColorPickerSize, colorPickerVariants } from "./color-picker-variants.mjs";
import * as React$1 from "react";

//#region src/ColorPicker/ColorPicker.d.ts
interface ColorPickerProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onChange' | 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  title?: string;
  showInput?: boolean;
  inputLabel?: string;
  customLabel?: string;
  /** 色块边长：36 / 44 / 52px。 */
  size?: ColorPickerSize;
}
declare function ColorPicker({
  value: valueProp,
  defaultValue,
  onChange,
  presets,
  title,
  showInput,
  inputLabel,
  customLabel,
  size,
  className,
  ref,
  ...props
}: ColorPickerProps): React$1.JSX.Element;
declare namespace ColorPicker {
  var displayName: string;
}
//#endregion
export { ColorPicker, ColorPickerProps };
//# sourceMappingURL=ColorPicker.d.mts.map