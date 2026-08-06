import { SliderSize, SliderVariant, sliderVariants } from "./slider-variants.mjs";
import * as React$1 from "react";

//#region src/Slider/Slider.d.ts
type SliderProps = Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue' | 'value'> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean; /** 轨道粗细与触达高度阶梯。 */
  size?: SliderSize; /** 视觉样式。`default` / `minimal` 是 v1 别名。 */
  variant?: SliderVariant;
};
declare function Slider({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  min,
  max,
  step,
  disabled,
  label,
  showValue,
  size,
  variant,
  ref,
  ...props
}: SliderProps): React$1.JSX.Element;
declare namespace Slider {
  var displayName: string;
}
//#endregion
export { Slider, SliderProps };
//# sourceMappingURL=Slider.d.mts.map