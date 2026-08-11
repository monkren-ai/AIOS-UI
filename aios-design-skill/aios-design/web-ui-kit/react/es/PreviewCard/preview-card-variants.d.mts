//#region src/PreviewCard/preview-card-variants.d.ts
/**
 * PreviewCard 的视觉变体。
 *
 * 卡片本身只承载背景与圆角；内边距与媒体高度交给 body / media / footer
 * 各自的 CVA，这样顶部缩略图可以贴着卡片边缘铺满，而正文与页脚各自留白。
 */
declare const previewCardVariants: (props?: ({
  variant?: "default" | "compact" | "raised" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 顶部媒体区。`compact` 把高度压到 80px，与正文的紧凑内边距呼应。 */
declare const previewCardMediaVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  compact?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 正文区。内边距与行间距跟着 `size` 走，`compact` 收紧到 sm 一档。 */
declare const previewCardBodyVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  compact?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 页脚。顶部一条分隔线 + 与正文同档的内边距。 */
declare const previewCardFooterVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  compact?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type PreviewCardVariant = 'default' | 'raised' | 'compact';
type PreviewCardSize = 'sm' | 'md' | 'lg';
//#endregion
export { PreviewCardSize, PreviewCardVariant, previewCardBodyVariants, previewCardFooterVariants, previewCardMediaVariants, previewCardVariants };
//# sourceMappingURL=preview-card-variants.d.mts.map