//#region src/Taskbar/taskbar-variants.d.ts
/**
 * Taskbar 的视觉变体。
 *
 * 高度在窄屏收到 52px、内边距收到 16px，对应 v1 的 `max-width: 768px` 媒体查询；
 * Tailwind 的断点是 min-width，所以写成「默认取窄屏值、`md:` 起放大」。
 */
declare const taskbarVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
  fixed?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { taskbarVariants };
//# sourceMappingURL=taskbar-variants.d.mts.map