import { cva } from "class-variance-authority";
//#region src/NavigationMenu/navigation-menu-variants.ts
/** NavigationMenu 根导航。 */
const navigationMenuVariants = cva("font-mono text-sm", {
	variants: { orientation: {
		horizontal: "",
		vertical: ""
	} },
	defaultVariants: { orientation: "horizontal" }
});
/** menubar / menu 列表。 */
const navigationMenuListVariants = cva("m-0 flex list-none p-0", {
	variants: { orientation: {
		horizontal: "items-center gap-0",
		vertical: "flex-col"
	} },
	defaultVariants: { orientation: "horizontal" }
});
/** 顶层条目，作为 submenu 的定位锚点。 */
const navigationMenuItemVariants = cva("relative");
/** 顶层链接。 */
const navigationMenuLinkVariants = cva([
	"flex cursor-pointer select-none items-center gap-1 whitespace-nowrap",
	"border-none bg-transparent px-4 py-2 no-underline",
	"text-foreground-muted hover:text-interactive",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: { active: {
		true: "text-foreground-display",
		false: ""
	} },
	defaultVariants: { active: false }
});
/**
* 「有子菜单」的三角标记。
*
* 旧实现用 `::after` + border 拼三角形，这里换成显式元素，
* 间距走 `ms-*` 让 RTL 自动落到文字的末端。
*/
const navigationMenuCaretVariants = cva("ms-1 inline-block size-0 shrink-0 border-x-4 border-x-transparent border-t-4 border-t-current");
/**
* 下拉子菜单。
*
* 收起时保留在 DOM 里（`invisible` + `opacity-0`）以便做淡入淡出，
* 展开由根元素上的 `data-open` 驱动 `open:` 变体。
*/
const navigationMenuSubmenuVariants = cva([
	"absolute z-[80] min-w-45 py-1",
	"rounded-sm border border-border-visible bg-popover",
	"invisible -translate-y-1 opacity-0",
	"transition-[opacity,transform,visibility] duration-200 ease-aios",
	"motion-reduce:transition-none",
	"open:visible open:translate-y-0 open:opacity-100"
], {
	variants: { orientation: {
		horizontal: "top-full start-0",
		vertical: "top-0 start-full"
	} },
	defaultVariants: { orientation: "horizontal" }
});
/** 子菜单里的一行。 */
const navigationMenuSubmenuItemVariants = cva("list-none");
/** 子菜单链接。 */
const navigationMenuSubmenuLinkVariants = cva([
	"block cursor-pointer select-none whitespace-nowrap px-4 py-2 no-underline",
	"text-popover-foreground hover:bg-muted",
	"transition-[background-color] duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
]);
//#endregion
export { navigationMenuCaretVariants, navigationMenuItemVariants, navigationMenuLinkVariants, navigationMenuListVariants, navigationMenuSubmenuItemVariants, navigationMenuSubmenuLinkVariants, navigationMenuSubmenuVariants, navigationMenuVariants };

//# sourceMappingURL=navigation-menu-variants.mjs.map