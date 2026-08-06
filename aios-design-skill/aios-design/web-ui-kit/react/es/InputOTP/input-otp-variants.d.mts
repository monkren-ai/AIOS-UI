//#region src/InputOTP/input-otp-variants.d.ts
/**
 * OTP 输入框。
 *
 * 槽位顺序完全交给 flex —— 没有任何 `left` / `right`，
 * `dir="rtl"` 时整排槽位与方向键导航一起镜像。
 */
declare const inputOTPVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个数字槽位。 */
declare const inputOTPSlotVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  active?: boolean | null | undefined;
  filled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 铺满槽位的透明 input。光标隐藏，靠槽位边框表达聚焦。 */
declare const inputOTPInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type InputOTPSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { InputOTPSize, inputOTPInputVariants, inputOTPSlotVariants, inputOTPVariants };
//# sourceMappingURL=input-otp-variants.d.mts.map