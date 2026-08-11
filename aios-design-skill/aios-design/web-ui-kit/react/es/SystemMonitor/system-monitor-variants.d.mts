//#region src/SystemMonitor/system-monitor-variants.d.ts
/**
 * SystemMonitor 的视觉变体。
 *
 * v1 的 `variant`（compact / detailed）与 `size`（sm / md / lg）只挂了类名、
 * 没有任何对应 CSS，这里保留 API 形状但不产出类名。
 */
declare const systemMonitorVariants: (props?: ({
  variant?: "default" | "compact" | "detailed" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 单个指标块。
 *
 * 颜色都落在子元素上（数值与分段），这里只负责块与块之间的节奏。
 */
declare const monitorItemVariants: (props?: ({
  type?: "cpu" | "ram" | "storage" | "network" | "battery" | null | undefined;
  status?: "warning" | "none" | "charging" | "low" | "critical" | "connected" | "disconnected" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 进度条的单格。
 *
 * 填充色优先级与 v1 的 CSS 级联一致：critical / warning / low 的告警色
 * 盖过按指标类型分配的常规色。
 */
declare const monitorSegmentVariants: (props?: ({
  filled?: boolean | null | undefined;
  type?: "cpu" | "ram" | "storage" | "network" | "battery" | null | undefined;
  status?: "warning" | "none" | "charging" | "low" | "critical" | "connected" | "disconnected" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { monitorItemVariants, monitorSegmentVariants, systemMonitorVariants };
//# sourceMappingURL=system-monitor-variants.d.mts.map