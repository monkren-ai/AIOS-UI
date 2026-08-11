//#region src/ProgressBar/progress-bar-variants.d.ts
/**
 * ProgressBar 的视觉变体。
 *
 * AIOS 的进度条是「分段刻度」而不是连续条：轨道被切成 N 段，填满的用
 * text-display 色，空的用 border 色。`slim` 是没有读数的 4px 细轨。
 *
 * 注：`variant` 这里描述的是结构（分段 / 细轨）而非 §3 的强调词表——
 * 进度条不参与 primary / secondary 那套语义层级。
 */
declare const progressBarVariants: (props?: ({
  variant?: "segmented" | "slim" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 轨道。高度跟着 size 走，indeterminate 时自己就是底色。 */
declare const progressTrackVariants: (props?: ({
  variant?: "segmented" | "slim" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  indeterminate?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个刻度块。首尾两段带外圆角。 */
declare const progressSegmentVariants: (props?: ({
  state?: "error" | "empty" | "filled" | "warning" | "good" | "overlimit" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  variant?: "segmented" | "slim" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 不定量进度的游标。
 *
 * 动效走 `motion-safe:`；`motion-reduce:` 下换成整条轨道的呼吸，不再横向平移。
 *
 * keyframes 里的 `translateX` 是物理方向，逻辑属性管不到，而 `-scale-x-100`
 * 这类工具类又会被 animation 自己的 `transform` 覆盖掉，所以 RTL 单独挂一条
 * 反向 keyframes，保证游标始终从行首扫向行尾。
 */
declare const progressIndeterminateVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 读数行的数值。 */
declare const progressValueVariants: (props?: ({
  status?: "error" | "default" | "warning" | "good" | "overlimit" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly hero: "lg";
  readonly standard: "md";
  readonly compact: "sm";
};
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly default: "segmented";
};
type ProgressBarVariant = 'segmented' | 'slim' | keyof typeof LEGACY_VARIANTS;
type ProgressBarSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
type ProgressStatus = 'default' | 'good' | 'warning' | 'overlimit' | 'error';
//#endregion
export { ProgressBarSize, ProgressBarVariant, ProgressStatus, progressBarVariants, progressIndeterminateVariants, progressSegmentVariants, progressTrackVariants, progressValueVariants };
//# sourceMappingURL=progress-bar-variants.d.mts.map