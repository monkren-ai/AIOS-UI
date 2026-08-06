import { TagShape, TagSize, TagVariant, tagVariants, tagsVariants } from "./tag-variants.mjs";
import * as React$1 from "react";

//#region src/Tag/Tag.d.ts
type TagProps = Omit<React$1.ComponentPropsWithRef<'span'>, 'onClick'> & {
  /** 视觉样式。 */variant?: TagVariant; /** 高度与字号。 */
  size?: TagSize; /** 胶囊或工业风方角。 */
  shape?: TagShape; /** 选中态。 */
  active?: boolean; /** 渲染尾部的移除按钮。 */
  removable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  children?: React$1.ReactNode;
};
declare function Tag({
  className,
  variant,
  size,
  shape,
  active,
  removable,
  disabled,
  children,
  onClick,
  onRemove,
  ...props
}: TagProps): React$1.JSX.Element;
declare namespace Tag {
  var displayName: string;
}
type TagsProps = React$1.ComponentPropsWithRef<'div'> & {
  children?: React$1.ReactNode; /** 开启邻近高亮：鼠标靠近哪个 Tag，哪个就提亮放大，其余压暗。 */
  proximity?: boolean | 'x' | 'y' | 'xy';
};
declare function Tags({
  className,
  children,
  proximity,
  ref,
  ...props
}: TagsProps): React$1.JSX.Element;
declare namespace Tags {
  var displayName: string;
}
//#endregion
export { Tag, TagProps, Tags, TagsProps };
//# sourceMappingURL=Tag.d.mts.map