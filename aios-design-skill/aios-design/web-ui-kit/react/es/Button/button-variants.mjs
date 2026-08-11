import { cva } from "class-variance-authority";
//#region src/Button/button-variants.ts
/**
* Button 的视觉变体。
*
* 变体/尺寸命名对齐 appica-ui，配色收敛到 AIOS 的 monochrome + 单点红：
* 没有阴影、没有 blur、没有渐变，层级只靠 background 与 border 表达。
*
* 直接把返回的类名贴到 `<a>` 上，就能得到一个「长得像按钮的链接」而不丢链接语义。
*/
const buttonVariants = cva([
	"aios-btn",
	"relative inline-flex shrink-0 select-none items-center justify-center",
	"font-mono font-bold uppercase leading-none tracking-wider",
	"cursor-pointer whitespace-nowrap",
	"transition-[background-color,border-color,color,opacity,transform] duration-200 ease-aios",
	"motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40",
	"active:not-disabled:scale-[0.97] motion-reduce:active:scale-100",
	"[&_[data-icon=start]]:me-2 [&_[data-icon=end]]:ms-2",
	"[&_svg]:size-[1.15em] [&_svg]:shrink-0"
], {
	variants: {
		variant: {
			primary: "rounded-button bg-foreground-display text-background hover:not-disabled:opacity-85 active:not-disabled:opacity-70",
			"primary-outline": "rounded-button border border-foreground-display bg-transparent text-foreground-display hover:not-disabled:bg-foreground-display hover:not-disabled:text-background",
			secondary: "rounded-button border border-border-visible bg-transparent text-foreground hover:not-disabled:border-foreground-muted hover:not-disabled:text-foreground-display active:not-disabled:border-foreground",
			soft: "rounded-button border border-border bg-surface-raised text-foreground hover:not-disabled:border-border-visible hover:not-disabled:text-foreground-display active:not-disabled:bg-border",
			outline: "rounded-button border border-border bg-transparent text-foreground-muted hover:not-disabled:border-border-visible hover:not-disabled:text-foreground-display",
			ghost: "rounded-none bg-transparent text-foreground-muted hover:not-disabled:bg-muted hover:not-disabled:text-foreground-display active:not-disabled:text-foreground",
			destructive: "rounded-button border border-accent bg-transparent text-accent hover:not-disabled:bg-accent-subtle active:not-disabled:bg-accent active:not-disabled:text-white"
		},
		size: {
			sm: "h-9 min-w-9 px-4 text-label",
			md: "h-11 min-w-11 px-6 text-xs",
			lg: "h-13 min-w-13 px-8 text-sm",
			"icon-sm": "size-9 p-0",
			"icon-md": "size-11 p-0",
			"icon-lg": "size-13 p-0"
		},
		fullWidth: {
			true: "w-full",
			false: ""
		},
		loading: {
			true: "cursor-wait opacity-85",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		fullWidth: false,
		loading: false
	}
});
/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
const LEGACY_VARIANTS = { tertiary: "soft" };
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
	default: "md",
	icon: "icon-md"
};
function resolveButtonVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
function resolveButtonSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
//#endregion
export { buttonVariants, resolveButtonSize, resolveButtonVariant };

//# sourceMappingURL=button-variants.mjs.map