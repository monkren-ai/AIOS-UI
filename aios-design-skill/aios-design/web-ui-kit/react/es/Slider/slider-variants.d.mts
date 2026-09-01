//#region src/Slider/slider-variants.d.ts
/**
 * Slider 的视觉变体。
 *
 * `primary` 用单点红做进度，`soft` 退回到中性灰，两者都只靠 background + border 表达层级。
 * 子部件的配色通过根节点的 `data-variant` / `data-disabled` 读取，所以根上带 `group/slider`。
 */
declare const sliderVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  variant?: "primary" | "soft" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** label + value 的一行。 */
declare const sliderHeaderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 字段标签。 */
declare const sliderLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 当前值。 */
declare const sliderValueVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 轨道容器（Base UI Slider.Control）。高度走 36 / 44 / 52 的触达基线。 */
declare const sliderControlVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 轨道（Base UI Slider.Track）。 */
declare const sliderTrackVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 已完成进度（Base UI Slider.Indicator）。 */
declare const sliderFillVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 拖拽把手（Base UI Slider.Thumb）。 */
declare const sliderThumbVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly default: "primary";
  readonly minimal: "soft";
};
type SliderVariant = 'primary' | 'soft' | keyof typeof LEGACY_VARIANTS;
type SliderSize = 'sm' | 'md' | 'lg';
declare function resolveSliderVariant(variant: SliderVariant | null | undefined): string | undefined;
//#endregion
export { SliderSize, SliderVariant, resolveSliderVariant, sliderControlVariants, sliderFillVariants, sliderHeaderVariants, sliderLabelVariants, sliderThumbVariants, sliderTrackVariants, sliderValueVariants, sliderVariants };
//# sourceMappingURL=slider-variants.d.mts.map