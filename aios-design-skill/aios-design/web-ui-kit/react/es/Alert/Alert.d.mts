import { AlertSize, AlertVariant, alertVariants } from "./alert-variants.mjs";
import * as React$1 from "react";

//#region src/Alert/Alert.d.ts
interface AlertProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 视觉样式。`destructive` 会把 role 提升到 `alert`。 */
  variant?: AlertVariant;
  /** 内边距与字号。 */
  size?: AlertSize;
  /** 标题行。 */
  title?: string;
  /** 起始侧的图标。 */
  icon?: React$1.ReactNode;
  /** 传入后渲染关闭按钮，退场动画结束才回调。 */
  onClose?: () => void;
}
declare function Alert({
  variant,
  size,
  title,
  icon,
  onClose,
  className,
  children,
  ...props
}: AlertProps): React$1.JSX.Element;
declare namespace Alert {
  var displayName: string;
}
//#endregion
export { Alert, AlertProps };
//# sourceMappingURL=Alert.d.mts.map