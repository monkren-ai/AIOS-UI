import { AvatarShape, AvatarSize, AvatarVariant, avatarVariants } from "./avatar-variants.mjs";
import * as React$1 from "react";

//#region src/Avatar/Avatar.d.ts
interface AvatarProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 视觉样式。 */
  variant?: AvatarVariant;
  /** 直径。 */
  size?: AvatarSize;
  /** 圆形或工业风方角。 */
  shape?: AvatarShape;
  /** 把样式合并到唯一的子元素上，而不是渲染额外的 div。 */
  asChild?: boolean;
  /** 图片地址。加载失败会自动退回 `fallback`。 */
  src?: string;
  alt?: string;
  /** 图片缺席时展示的缩写。 */
  fallback?: string;
}
declare function Avatar({
  className,
  variant,
  size,
  shape,
  asChild,
  src,
  alt,
  fallback,
  children,
  ...props
}: AvatarProps): React$1.JSX.Element;
declare namespace Avatar {
  var displayName: string;
}
//#endregion
export { Avatar, AvatarProps };
//# sourceMappingURL=Avatar.d.mts.map