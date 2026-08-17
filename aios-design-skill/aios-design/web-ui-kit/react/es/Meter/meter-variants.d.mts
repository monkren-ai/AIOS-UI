//#region src/Meter/meter-variants.d.ts
/**
 * Meter 的视觉变体。
 *
 * 量规与 ProgressBar 的关键区别：进度条是「过程」，meter 是「状态」。所以
 * meter 的分段轨保持中性（填充 = foreground，空 = border），状态色只落在
 * 数值本身上——`--warning` / `--accent` 不会染整条背景。
 */
declare const meterVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 分段轨。高度跟着 size 走。 */
declare const meterTrackVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个刻度块。首尾两段带外圆角，填充态中性，不参与状态色。 */
declare const meterSegmentVariants: (props?: ({
  state?: "empty" | "filled" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 数值本身按 zone 变色：good 用默认前景色，warning 黄，critical 红。 */
declare const meterValueVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  zone?: "warning" | "good" | "critical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 临界值竖标：从轨顶到轨底的 1px 细线，标出 low / high 的位置。 */
declare const meterMarkerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type MeterSize = 'sm' | 'md' | 'lg';
type MeterZone = 'good' | 'warning' | 'critical';
//#endregion
export { MeterSize, MeterZone, meterMarkerVariants, meterSegmentVariants, meterTrackVariants, meterValueVariants, meterVariants };
//# sourceMappingURL=meter-variants.d.mts.map