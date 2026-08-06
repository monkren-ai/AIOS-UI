import { cva } from "class-variance-authority";
//#region src/Toolbar/toolbar-variants.ts
/**
* Toolbar 的视觉变体。
*
* 工具条本身只负责排布方向；按钮、分隔、链接各有一套 CVA。
* 配色与 Button / Toggle 同源：monochrome + 单点红，无阴影、无 blur、无渐变。
*/
/** 工具条容器。方向决定主轴；竖向时子项左对齐，分隔线自动换成横向。 */
const toolbarVariants = cva(["inline-flex items-center gap-1"], {
	variants: { orientation: {
		horizontal: "flex-row",
		vertical: "flex-col items-start"
	} },
	defaultVariants: { orientation: "horizontal" }
});
/**
* 工具条按钮。
*
* 默认形态贴近 Button 的 `soft`：surface 底 + border。`pressed` 用于工具栏开关，
* 映射到 `aria-pressed` 与 `data-pressed`，并加粗字重让按下态不只靠颜色表达。
*/
const toolbarButtonVariants = cva([
	"nothing-btn",
	"inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2",
	"rounded-sm border font-mono font-medium uppercase tracking-wider whitespace-nowrap",
	"transition-[background-color,border-color,color,font-weight,scale] duration-200 ease-nothing",
	"motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"active:not-disabled:scale-[0.97] motion-reduce:active:scale-100",
	"disabled:pointer-events-none disabled:opacity-40",
	"[&_[data-icon=start]]:me-2 [&_[data-icon=end]]:ms-2",
	"[&_svg]:size-[1.15em] [&_svg]:shrink-0"
], {
	variants: {
		size: {
			sm: "h-9 px-3 text-caption",
			md: "h-11 px-4 text-sm",
			lg: "h-13 px-6 text-base"
		},
		pressed: {
			true: "border-transparent bg-muted font-bold text-foreground-display",
			false: "border-border bg-surface text-foreground hover:not-disabled:border-border-visible hover:not-disabled:bg-surface-raised hover:not-disabled:text-foreground-display"
		}
	},
	defaultVariants: {
		size: "md",
		pressed: false
	}
});
/**
* 分隔线。
*
* 走 Base UI 的 `data-orientation`：水平工具条里是竖线（`w-px` + 撑满高度），
* 竖向工具条里自动换成横线（`h-px` + 撑满宽度）。
*/
const toolbarSeparatorVariants = cva([
	"shrink-0 bg-border",
	"data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
	"data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"
]);
/** 工具条分组容器。 */
const toolbarGroupVariants = cva(["inline-flex items-center gap-1"], {
	variants: { orientation: {
		horizontal: "flex-row",
		vertical: "flex-col items-start"
	} },
	defaultVariants: { orientation: "horizontal" }
});
/** 工具条链接。 */
const toolbarLinkVariants = cva([
	"inline-flex shrink-0 select-none items-center gap-2 rounded-sm px-2",
	"font-mono text-sm text-foreground-muted",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none",
	"hover:text-foreground-display",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_svg]:size-[1.15em] [&_svg]:shrink-0"
]);
//#endregion
export { toolbarButtonVariants, toolbarGroupVariants, toolbarLinkVariants, toolbarSeparatorVariants, toolbarVariants };

//# sourceMappingURL=toolbar-variants.mjs.map