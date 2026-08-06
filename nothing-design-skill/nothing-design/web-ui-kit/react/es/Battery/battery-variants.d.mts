//#region src/Battery/battery-variants.d.ts
/**
 * Battery 分段版的容器。
 *
 * v1 里 `variant` / `theme` 两个维度在 CSS 中没有任何对应规则，
 * `level` 也只作用于分段的填充色（见 `batterySegmentVariants`），
 * 所以这里它们只保留 API 形状、不产出类名。
 *
 * `widgetMode='ring'` 沿用 v1 的用法：与 `batteryRingVariants` 拼接，
 * 靠 tailwind-merge 的「后写覆盖」得到 v1 里那层级联的最终效果。
 */
declare const batteryVariants: (props?: ({
  variant?: "segmented" | "ring" | null | undefined;
  theme?: "light" | "dark" | null | undefined;
  level?: "critical" | "low" | "medium" | "high" | null | undefined;
  widgetMode?: "card" | "none" | "ring" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 圆环版容器。颜色都落在子元素上，theme/status 在这里只是 API 形状。 */
declare const batteryRingVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
  status?: "charging" | "low" | "full" | "mid" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个设备行。 */
declare const batteryDeviceVariants: (props?: ({
  clickable?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { batteryDeviceVariants, batteryRingVariants, batteryVariants };
//# sourceMappingURL=battery-variants.d.mts.map