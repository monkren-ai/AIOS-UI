//#region src/Textarea/textarea-variants.d.ts
/**
 * Textarea 的视觉变体。
 *
 * 与 Input 同构：只有 `outline`（默认）与 `soft`，
 * 层级靠 background + border 表达，没有阴影、没有 blur、没有渐变。
 */
declare const textareaVariants: (props?: ({
  variant?: "soft" | "outline" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  focused?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 原生 textarea 本体。 */
declare const textareaFieldVariants: (props?: ({
  variant?: "soft" | "outline" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  autoResize?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 字段标签。focus 时提亮，error 时变红。 */
declare const textareaLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  focused?: boolean | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 辅助说明 / 错误文案。 */
declare const textareaMessageVariants: (props?: ({
  variant?: "error" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly underline: "outline";
  readonly bordered: "soft";
};
type TextareaVariant = 'outline' | 'soft' | keyof typeof LEGACY_VARIANTS;
type TextareaSize = 'sm' | 'md' | 'lg';
declare function resolveTextareaVariant(variant: TextareaVariant | null | undefined): string | undefined;
//#endregion
export { TextareaSize, TextareaVariant, resolveTextareaVariant, textareaFieldVariants, textareaLabelVariants, textareaMessageVariants, textareaVariants };
//# sourceMappingURL=textarea-variants.d.mts.map