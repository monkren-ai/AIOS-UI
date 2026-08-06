//#region src/InputCopy/input-copy-variants.d.ts
/** 外层：label 在上，输入行在下。 */
declare const inputCopyVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  copied?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const inputCopyLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 输入 + 复制按钮的一行。边框长在这里。 */
declare const inputCopyControlVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const inputCopyFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 复制按钮。
 *
 * 分隔线用 `border-s`（不是 `border-l`），RTL 下会自动跑到另一侧。
 * 复制成功时的闪光走 `@keyframes nothing-input-copy-flash`（见 InputCopy.css）。
 */
declare const inputCopyButtonVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  copied?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const inputCopyButtonTextVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type InputCopySize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { InputCopySize, inputCopyButtonTextVariants, inputCopyButtonVariants, inputCopyControlVariants, inputCopyFieldVariants, inputCopyLabelVariants, inputCopyVariants };
//# sourceMappingURL=input-copy-variants.d.mts.map