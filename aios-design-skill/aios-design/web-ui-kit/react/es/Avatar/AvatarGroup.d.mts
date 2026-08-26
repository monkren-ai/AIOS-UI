import { AvatarSize } from "./avatar-variants.mjs";
import { AvatarProps } from "./Avatar.mjs";
import * as React$1 from "react";

//#region src/Avatar/AvatarGroup.d.ts
interface AvatarGroupProps extends React$1.ComponentPropsWithRef<'div'> {
  children: React$1.ReactElement<AvatarProps> | React$1.ReactElement<AvatarProps>[];
  /** 最多展示的头像数量；其余头像折叠为 +N。 */
  max?: number;
  size?: AvatarSize;
}
declare function AvatarGroup({
  children,
  max,
  size,
  className,
  ref,
  ...props
}: AvatarGroupProps): React$1.JSX.Element;
declare namespace AvatarGroup {
  var displayName: string;
}
//#endregion
export { AvatarGroup, AvatarGroupProps };
//# sourceMappingURL=AvatarGroup.d.mts.map