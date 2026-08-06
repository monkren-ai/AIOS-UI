import { fieldsetLegendVariants, fieldsetVariants } from "./fieldset-variants.mjs";
import * as React$1 from "react";

//#region src/Fieldset/Fieldset.d.ts
interface FieldsetProps extends Omit<React$1.ComponentPropsWithRef<'fieldset'>, 'ref'> {
  ref?: React$1.Ref<HTMLElement>;
  legend?: string;
  disabled?: boolean;
  children?: React$1.ReactNode;
}
/**
 * 字段分组。
 *
 * 渲染 `<fieldset>`（隐式 `role="group"`）+ `<legend>`，1px 边框、
 * `rounded-card` 圆角。`disabled` 透传给 Base UI，会连带禁用内部 Field。
 */
declare function Fieldset({
  legend,
  disabled,
  className,
  children,
  ref,
  ...props
}: FieldsetProps): React$1.JSX.Element;
declare namespace Fieldset {
  var displayName: string;
}
//#endregion
export { Fieldset, FieldsetProps };
//# sourceMappingURL=Fieldset.d.mts.map