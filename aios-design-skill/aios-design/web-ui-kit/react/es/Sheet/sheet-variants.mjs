import { cva } from "class-variance-authority";
//#region src/Sheet/sheet-variants.ts
const sheetBackdropVariants = cva([
	"fixed inset-0 z-[var(--z-modal)] bg-overlay-light",
	"transition-[opacity,visibility] duration-[var(--duration-transition)] ease-aios",
	"motion-reduce:transition-none"
], {
	variants: { visible: {
		true: "visible opacity-100",
		false: "invisible opacity-0"
	} },
	defaultVariants: { visible: false }
});
/**
* 抽屉面板。
*
* `side="left" | "right"` 现在按**逻辑**方向落位：left → inline-start，
* right → inline-end，边框与圆角用 `border-s/e` + `rounded-s/e-*`，
* 所以 `<html dir="rtl">` 下整块会自动镜像。滑入方向靠 `rtl:` 变体反号。
*
* 与 v1 一致：收起态是基线，`open:` 把 transform 归零。
*/
const sheetVariants = cva([
	"fixed z-[calc(var(--z-modal)+1)] flex max-h-screen flex-col overflow-y-auto bg-surface",
	"transition-transform duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none"
], {
	variants: {
		side: {
			right: "inset-y-0 end-0 w-80 max-w-[90vw] border-s border-border-visible rounded-s-lg translate-x-full rtl:-translate-x-full open:translate-x-0",
			left: "inset-y-0 start-0 w-80 max-w-[90vw] border-e border-border-visible rounded-e-lg -translate-x-full rtl:translate-x-full open:translate-x-0",
			top: "inset-x-0 top-0 h-auto max-h-[90vh] border-b border-border-visible rounded-b-lg -translate-y-full open:translate-y-0",
			bottom: "inset-x-0 bottom-0 h-auto max-h-[90vh] border-t border-border-visible rounded-t-lg translate-y-full open:translate-y-0"
		},
		full: {
			true: "max-h-screen rounded-none",
			false: ""
		}
	},
	defaultVariants: {
		side: "right",
		full: false
	}
});
const sheetHeaderVariants = cva("flex shrink-0 items-center justify-between border-b border-border px-6 py-4");
const sheetTitleVariants = cva("font-mono text-subheading uppercase tracking-wide text-foreground");
const SHEET_DISMISS_BASE = [
	"flex min-h-11 min-w-11 cursor-pointer items-center justify-center p-1",
	"border-none bg-transparent text-foreground-muted",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:text-foreground-display",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
];
const sheetCloseVariants = cva([...SHEET_DISMISS_BASE, "font-mono text-sm"]);
/** bottom-sheet 模式下的「Done」按钮，绝对定位在标题行的行末。 */
const sheetDismissVariants = cva([
	...SHEET_DISMISS_BASE,
	"absolute end-4 top-1/2 -translate-y-1/2",
	"font-mono text-label uppercase tracking-wider"
]);
const sheetBodyVariants = cva("flex-1 overflow-y-auto p-6 font-body text-base text-foreground");
const sheetHandleVariants = cva("flex cursor-grab justify-center py-2");
const sheetHandleBarVariants = cva("h-0.5 w-8 rounded-[1px] bg-foreground-muted");
const sheetSectionVariants = cva("px-6", {
	variants: { spaced: {
		true: "mt-4",
		false: ""
	} },
	defaultVariants: { spaced: false }
});
const sheetSectionTitleVariants = cva("mb-2 font-mono text-label uppercase tracking-wider text-foreground-muted");
const sheetFooterVariants = cva(["flex items-center justify-end gap-2 border-t border-border px-6 py-4", "pb-[calc(var(--spacing-md)+env(safe-area-inset-bottom,0px))]"]);
//#endregion
export { sheetBackdropVariants, sheetBodyVariants, sheetCloseVariants, sheetDismissVariants, sheetFooterVariants, sheetHandleBarVariants, sheetHandleVariants, sheetHeaderVariants, sheetSectionTitleVariants, sheetSectionVariants, sheetTitleVariants, sheetVariants };

//# sourceMappingURL=sheet-variants.mjs.map