import { cva } from "class-variance-authority";
//#region src/Alert/alert-variants.ts
/**
* Alert 的视觉变体。
*
* 顶部 3px 的粗边是 AIOS 的「仪表盘状态条」，destructive 时换成单点红。
* 进出场只用 opacity + translate，没有阴影也没有 blur。
*/
const alertVariants = cva([
	"flex items-start rounded-md border border-border-visible border-t-[3px]",
	"font-body text-foreground",
	"transition-[opacity,transform] duration-200 ease-aios",
	"motion-reduce:transition-none",
	"data-[state=exiting]:-translate-y-1.5 data-[state=exiting]:opacity-0"
], {
	variants: {
		variant: {
			soft: "border-t-border-visible bg-surface",
			destructive: "border-t-accent bg-accent-subtle"
		},
		size: {
			sm: "gap-2 p-3 pt-[14px] text-xs",
			md: "gap-4 p-4 pt-[18px] text-sm",
			lg: "gap-4 p-6 pt-[26px] text-base"
		}
	},
	defaultVariants: {
		variant: "soft",
		size: "md"
	}
});
/** 图标槽位。destructive 下跟着标题一起变红。 */
const alertIconVariants = cva(["flex shrink-0 items-start leading-none text-foreground-muted"], {
	variants: { variant: {
		soft: "",
		destructive: "text-accent"
	} },
	defaultVariants: { variant: "soft" }
});
/** 标题槽位。 */
const alertTitleVariants = cva(["font-mono font-bold tracking-tight"], {
	variants: { variant: {
		soft: "text-foreground",
		destructive: "text-accent"
	} },
	defaultVariants: { variant: "soft" }
});
/** 正文槽位。 */
const alertMessageVariants = cva([""], {
	variants: { variant: {
		soft: "text-foreground-muted",
		destructive: "text-foreground"
	} },
	defaultVariants: { variant: "soft" }
});
/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = { default: "soft" };
function resolveAlertVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
//#endregion
export { alertIconVariants, alertMessageVariants, alertTitleVariants, alertVariants, resolveAlertVariant };

//# sourceMappingURL=alert-variants.mjs.map