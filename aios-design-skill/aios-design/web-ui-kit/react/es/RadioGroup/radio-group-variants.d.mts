//#region src/RadioGroup/radio-group-variants.d.ts
/**
 * RadioGroup 的视觉变体。
 *
 * 选中态用单点红（`border-accent` + `bg-accent` 的圆点），
 * 行高走 36 / 44 / 52 的触达基线。
 */
declare const radioGroupVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个选项行。 */
declare const radioGroupItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  checked?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 圆环（Base UI Radio.Root）。 */
declare const radioGroupCircleVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 圆心（Base UI Radio.Indicator，keepMounted）。 */
declare const radioGroupDotVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 选项文字。 */
declare const radioGroupLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type RadioGroupSize = 'sm' | 'md' | 'lg';
//#endregion
export { RadioGroupSize, radioGroupCircleVariants, radioGroupDotVariants, radioGroupItemVariants, radioGroupLabelVariants, radioGroupVariants };
//# sourceMappingURL=radio-group-variants.d.mts.map