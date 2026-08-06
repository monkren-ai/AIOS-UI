import { cva } from "class-variance-authority";
//#region src/ContextMenu/context-menu-variants.ts
const contextMenuVariants = cva("inline-block");
const contextMenuTriggerVariants = cva("inline-block");
/**
* 右键菜单本体。
*
* 位置来自 `clientX/clientY`（视口物理坐标），所以 `top/left` 仍由内联 style
* 下发；这里只负责视觉与显隐过渡。
*/
const contextMenuContentVariants = cva([
	"fixed z-[var(--z-dropdown)] min-w-[180px]",
	"rounded-sm border border-border-visible bg-popover py-1 text-popover-foreground",
	"transition-[opacity,visibility,transform] duration-[var(--duration-micro)] ease-aios",
	"motion-reduce:transition-none"
], {
	variants: { visible: {
		true: "visible scale-100 opacity-100",
		false: "invisible scale-95 opacity-0"
	} },
	defaultVariants: { visible: false }
});
const contextMenuItemVariants = cva([
	"flex cursor-pointer select-none items-center justify-between gap-4 whitespace-nowrap px-4 py-1",
	"font-mono text-sm text-foreground",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:bg-muted",
	"outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
], {
	variants: { disabled: {
		true: "pointer-events-none text-foreground-disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const contextMenuItemLabelVariants = cva("flex-1");
const contextMenuItemShortcutVariants = cva("ms-6 font-mono text-caption text-foreground-disabled");
const contextMenuSeparatorVariants = cva("my-1 h-px bg-border");
//#endregion
export { contextMenuContentVariants, contextMenuItemLabelVariants, contextMenuItemShortcutVariants, contextMenuItemVariants, contextMenuSeparatorVariants, contextMenuTriggerVariants, contextMenuVariants };

//# sourceMappingURL=context-menu-variants.mjs.map