import { ThumbnailRatio, ThumbnailRounded, ThumbnailSize, thumbnailVariants } from "./thumbnail-variants.mjs";
import * as React$1 from "react";

//#region src/Thumbnail/Thumbnail.d.ts
interface ThumbnailProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 图片地址。加载失败后自动切到 `fallback`。 */
  src?: string;
  /** 图片替代文本；无图时也会作为兜底元素的 `aria-label`。 */
  alt?: string;
  /**
   * 图片缺席或加载失败时展示的内容。不传时使用点阵占位——
   * 用一个低调的点阵网格而不是灰块来表达「空」，更贴近 AIOS 的视觉语言。
   */
  fallback?: React$1.ReactNode;
  /** 高度：48 / 64 / 96px。 */
  size?: ThumbnailSize;
  /** 圆角。默认 `card`。 */
  rounded?: ThumbnailRounded;
  /** 宽高比。默认 `square`。 */
  ratio?: ThumbnailRatio;
}
declare function Thumbnail({
  className,
  src,
  alt,
  fallback,
  size,
  rounded,
  ratio,
  ...props
}: ThumbnailProps): React$1.JSX.Element;
declare namespace Thumbnail {
  var displayName: string;
}
//#endregion
export { Thumbnail, ThumbnailProps };
//# sourceMappingURL=Thumbnail.d.mts.map