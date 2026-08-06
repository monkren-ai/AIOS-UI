//#region src/ColorPicker/color-picker-variants.d.ts
/** 取色器卡片。 */
declare const colorPickerVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const colorPickerHeaderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const colorPickerTitleVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const colorPickerValueVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const colorPickerSwatchesVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 色块。
 *
 * 选中态旧实现是双层 `box-shadow` 描边；v2 禁止阴影，
 * 改用带 offset 的 outline —— 同样是「留一圈底色再套一圈实线」。
 */
declare const colorPickerSwatchVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  active?: boolean | null | undefined;
  custom?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const colorPickerCustomLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 原生 `<input type="color">`：铺满自定义色块但完全透明。 */
declare const colorPickerNativeVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** hex 输入框前面的小方块预览。 */
declare const colorPickerPreviewVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type ColorPickerSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { ColorPickerSize, colorPickerCustomLabelVariants, colorPickerHeaderVariants, colorPickerNativeVariants, colorPickerPreviewVariants, colorPickerSwatchVariants, colorPickerSwatchesVariants, colorPickerTitleVariants, colorPickerValueVariants, colorPickerVariants };
//# sourceMappingURL=color-picker-variants.d.mts.map