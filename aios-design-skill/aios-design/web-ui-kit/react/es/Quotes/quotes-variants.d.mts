//#region src/Quotes/quotes-variants.d.ts
/**
 * Quotes 的视觉变体。
 *
 * 这是一个圆形 widget：外圈是进度环，圆心是一段 NDot 语录。
 * `theme` 决定文字色（widget 色板，不随 [data-theme] 走）；
 * `size` 在 v1 里就没有对应样式，这里保留成空档位只为了不改公开 API。
 */
declare const quotesVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type QuotesTheme = 'light' | 'dark';
type QuotesSize = 'sm' | 'md' | 'lg';
//#endregion
export { QuotesSize, QuotesTheme, quotesVariants };
//# sourceMappingURL=quotes-variants.d.mts.map