import { SuccessCheckSize, successCheckVariants } from "./success-check-variants.mjs";
import * as React$1 from "react";

//#region src/SuccessCheck/SuccessCheck.d.ts
interface SuccessCheckProps extends Omit<React$1.ComponentPropsWithRef<'span'>, 'children'> {
  /** 为 true 时描边画出勾选。 */
  active?: boolean;
  size?: SuccessCheckSize;
  /** 勾选旁的状态文案。默认 `[DONE]`。传 `null` 隐藏。 */
  label?: string | null;
}
declare function SuccessCheck({
  active,
  size,
  label,
  className,
  ref,
  ...props
}: SuccessCheckProps): React$1.JSX.Element;
declare namespace SuccessCheck {
  var displayName: string;
}
//#endregion
export { SuccessCheck, SuccessCheckProps };
//# sourceMappingURL=SuccessCheck.d.mts.map