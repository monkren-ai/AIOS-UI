import { PreviewCardSize, PreviewCardVariant, previewCardBodyVariants, previewCardFooterVariants, previewCardMediaVariants, previewCardVariants } from "./preview-card-variants.mjs";
import * as React$1 from "react";

//#region src/PreviewCard/PreviewCard.d.ts
interface PreviewCardProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 标题。 */
  title?: string;
  /** 描述文字，渲染为 muted 小字。 */
  description?: string;
  /** 副元数据，渲染为 mono caption（Nothing 标签语言）。 */
  meta?: string;
  /** 顶部图片地址。不传则不渲染媒体区。 */
  image?: string;
  imageAlt?: string;
  /** 页脚，常放操作按钮。 */
  footer?: React$1.ReactNode;
  size?: PreviewCardSize;
  variant?: PreviewCardVariant;
}
/**
 * 媒体预览卡。
 *
 * 顶部是一张贴边铺满的 `Thumbnail`（图片加载失败会回退到点阵占位），
 * 下方是 meta / title / description 的元信息组，可选页脚。卡片本身不依赖
 * Base UI 的浮动 PreviewCard 原语——那是 hover 弹层，与本组件「静态内容卡」
 * 的语义不同，所以这里用 Card 的视觉语言 + Thumbnail 自实现。
 */
declare function PreviewCard({
  className,
  title,
  description,
  meta,
  image,
  imageAlt,
  footer,
  size,
  variant,
  children,
  ...props
}: PreviewCardProps): React$1.JSX.Element;
declare namespace PreviewCard {
  var displayName: string;
}
//#endregion
export { PreviewCard, PreviewCardProps };
//# sourceMappingURL=PreviewCard.d.mts.map