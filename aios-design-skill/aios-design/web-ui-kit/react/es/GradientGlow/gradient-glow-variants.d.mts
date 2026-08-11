//#region src/GradientGlow/gradient-glow-variants.d.ts
/**
 * GradientGlow 的变体。
 *
 * 这是 appica `gradient-glow` 的 AIOS 改造版：不渲染渐变光晕，
 * 改用点阵网格 + 中心向外径向衰减的 opacity 阶梯营造氛围。
 * `intensity` 只控制中心点的最大 opacity，不引入色相。
 */
declare const gradientGlowVariants: (props?: ({
  intensity?: "subtle" | "normal" | "strong" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type GradientGlowIntensity = 'subtle' | 'normal' | 'strong';
//#endregion
export { GradientGlowIntensity, gradientGlowVariants };
//# sourceMappingURL=gradient-glow-variants.d.mts.map