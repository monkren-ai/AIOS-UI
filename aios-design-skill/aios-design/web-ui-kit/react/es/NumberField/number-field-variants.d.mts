//#region src/NumberField/number-field-variants.d.ts
/**
 * NumberField 的视觉变体。
 *
 * 结构是 `[−] [Input] [+]`：边框与背景长在 Group 上（复用 Input 的 `soft` 形态——
 * `border + bg-surface-raised`），Input 本体无框、居中、Space Mono 数字，步进按钮是
 * 与高度等宽的方形。没有阴影、没有 blur、没有渐变。
 */
declare const numberFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  hasError?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 字段标签。 */
declare const numberFieldLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * `[−] [Input] [+]` 这一行。
 *
 * 边框 / 背景都在这里，Input 与步进按钮自身透明。`focus-within` 把边框提到
 * `border-visible`，错误态转红。
 */
declare const numberFieldGroupVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Input 本体：无边框、无背景、居中、Space Mono 数字。 */
declare const numberFieldInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 步进按钮。
 *
 * 方形——宽度等于 Group 的高度，`items-stretch` 让它撑满高度。按下时轻微缩放，
 * 悬停垫一层 `muted`，焦点环走 `interactive`。
 */
declare const numberFieldStepperVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 错误文案。 */
declare const numberFieldErrorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type NumberFieldSize = 'sm' | 'md' | 'lg';
//#endregion
export { NumberFieldSize, numberFieldErrorVariants, numberFieldGroupVariants, numberFieldInputVariants, numberFieldLabelVariants, numberFieldStepperVariants, numberFieldVariants };
//# sourceMappingURL=number-field-variants.d.mts.map