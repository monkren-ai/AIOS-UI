import { cva } from "class-variance-authority";
//#region src/Badge/badge-variants.ts
/**
* Badge 的视觉变体。
*
* 单色 + 单点红，层级只靠 background / border 表达。
*/
const badgeVariants = cva([
	"inline-flex shrink-0 select-none items-center justify-center gap-1",
	"whitespace-nowrap font-mono uppercase leading-none tracking-wider",
	"rounded-pill border border-transparent",
	"transition-[background-color,border-color,color] duration-200 ease-nothing",
	"motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_svg]:size-[1.15em] [&_svg]:shrink-0"
], {
	variants: {
		variant: {
			primary: "bg-foreground-display text-background",
			soft: "bg-muted text-foreground-muted",
			outline: "border-border-visible bg-transparent text-foreground",
			destructive: "bg-accent-subtle text-accent"
		},
		size: {
			sm: "h-4 min-w-4 px-1.5 text-micro",
			md: "h-5 min-w-5 px-2 text-label",
			lg: "h-6 min-w-6 px-2.5 text-caption"
		},
		dot: {
			true: "ps-1.5",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		dot: false
	}
});
/** 状态圆点。颜色继承自 badge 自身，destructive 下自然变红。 */
const badgeDotVariants = cva(["inline-block shrink-0 rounded-full bg-current", "motion-safe:animate-pulse motion-reduce:animate-none"], {
	variants: { size: {
		sm: "size-1",
		md: "size-1.5",
		lg: "size-2"
	} },
	defaultVariants: { size: "md" }
});
/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = {
	default: "primary",
	secondary: "soft"
};
function resolveBadgeVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
//#endregion
export { badgeDotVariants, badgeVariants, resolveBadgeVariant };

//# sourceMappingURL=badge-variants.mjs.map