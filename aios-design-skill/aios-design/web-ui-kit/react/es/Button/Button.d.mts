import { ButtonSize, ButtonVariant } from "./button-variants.mjs";
import * as React$1 from "react";
import { Button } from "@base-ui/react/button";

//#region src/Button/Button.d.ts
interface ButtonProps extends Omit<React$1.ComponentPropsWithRef<'button'>, 'color'> {
  /** 视觉样式。 */
  variant?: ButtonVariant;
  /** 高度与内边距。`icon-*` 为正方形，用于纯图标按钮。 */
  size?: ButtonSize;
  /** 撑满父容器宽度。 */
  fullWidth?: boolean;
  /** 展示 spinner 并阻止点击。 */
  loading?: boolean;
  /** loading 期间替换的文案；不传则保留 children。 */
  loadingText?: string;
  /** 按下态（如工具栏的 toggle 按钮），会映射到 `aria-pressed`。 */
  active?: boolean;
  /** 换成别的元素或与其它组件组合。渲染链接时请改用 `buttonVariants`。 */
  render?: Button.Props['render'];
  /** 渲染出来的是不是原生 `<button>`。`render` 一个非按钮元素时设为 false。 */
  nativeButton?: boolean;
  /** disabled 后仍保留焦点，避免焦点掉回 body。 */
  focusableWhenDisabled?: boolean;
  /**
   * @deprecated 改用 `data-icon="start"` 标注 children 里的图标。
   */
  leadingIcon?: React$1.ReactNode;
  /**
   * @deprecated 改用 `data-icon="end"` 标注 children 里的图标。
   */
  trailingIcon?: React$1.ReactNode;
}
declare function Button$1({
  variant,
  size,
  fullWidth,
  className,
  loading,
  loadingText,
  leadingIcon,
  trailingIcon,
  active,
  disabled,
  children,
  ...props
}: ButtonProps): React$1.JSX.Element;
declare namespace Button$1 {
  var displayName: string;
}
//#endregion
export { Button$1 as Button, ButtonProps };
//# sourceMappingURL=Button.d.mts.map