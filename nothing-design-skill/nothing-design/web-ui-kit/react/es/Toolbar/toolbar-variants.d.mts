//#region src/Toolbar/toolbar-variants.d.ts
/**
 * Toolbar 的视觉变体。
 *
 * 工具条本身只负责排布方向；按钮、分隔、链接各有一套 CVA。
 * 配色与 Button / Toggle 同源：monochrome + 单点红，无阴影、无 blur、无渐变。
 */
/** 工具条容器。方向决定主轴；竖向时子项左对齐，分隔线自动换成横向。 */
declare const toolbarVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 工具条按钮。
 *
 * 默认形态贴近 Button 的 `soft`：surface 底 + border。`pressed` 用于工具栏开关，
 * 映射到 `aria-pressed` 与 `data-pressed`，并加粗字重让按下态不只靠颜色表达。
 */
declare const toolbarButtonVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  pressed?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 分隔线。
 *
 * 走 Base UI 的 `data-orientation`：水平工具条里是竖线（`w-px` + 撑满高度），
 * 竖向工具条里自动换成横线（`h-px` + 撑满宽度）。
 */
declare const toolbarSeparatorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 工具条分组容器。 */
declare const toolbarGroupVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 工具条链接。 */
declare const toolbarLinkVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type ToolbarSize = 'sm' | 'md' | 'lg';
type ToolbarOrientation = 'horizontal' | 'vertical';
//#endregion
export { ToolbarOrientation, ToolbarSize, toolbarButtonVariants, toolbarGroupVariants, toolbarLinkVariants, toolbarSeparatorVariants, toolbarVariants };
//# sourceMappingURL=toolbar-variants.d.mts.map