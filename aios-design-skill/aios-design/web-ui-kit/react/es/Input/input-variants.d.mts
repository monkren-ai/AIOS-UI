//#region src/Input/input-variants.d.ts
/**
 * Input 的视觉变体。
 *
 * 输入类控件只保留词表里的 `outline`（默认）与 `soft`：
 * 层级靠 background + border 表达，没有阴影、没有 blur、没有渐变。
 */
declare const inputVariants: (props?: ({
  variant?: "outline" | "soft" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 包裹图标 + 原生 input 的一行。边框与背景都长在这里。 */
declare const inputControlVariants: (props?: ({
  variant?: "outline" | "soft" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 原生 input 本体：无边框、无背景，一切交给 control。 */
declare const inputFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 字段标签。 */
declare const inputLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 辅助说明 / 错误文案。
 *
 * 命名刻意避开 `inputMessageVariants` —— 那是独立组件 `InputMessage`（聊天输入框）的。
 */
declare const inputHelperVariants: (props?: ({
  variant?: "default" | "error" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 前后缀图标槽位。 */
declare const inputIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 清除按钮。 */
declare const inputClearVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
declare const LEGACY_VARIANTS: {
  readonly underline: "outline";
  readonly bordered: "soft";
};
type InputVariant = 'outline' | 'soft' | keyof typeof LEGACY_VARIANTS;
type InputSize = 'sm' | 'md' | 'lg';
declare function resolveInputVariant(variant: InputVariant | null | undefined): string | undefined;
//#endregion
export { InputSize, InputVariant, inputClearVariants, inputControlVariants, inputFieldVariants, inputHelperVariants, inputIconVariants, inputLabelVariants, inputVariants, resolveInputVariant };
//# sourceMappingURL=input-variants.d.mts.map