import { cva } from "class-variance-authority";
//#region src/NextEvent/next-event-variants.ts
/**
* NextEvent 药丸卡的视觉变体。
*
* `priority` 只影响倒计时的颜色（见 `nextEventCountdownVariants`），
* 容器本身在 v1 里就没有对应样式，这里保持不变。
*
* demo 数据沿用 v1 的 `::after` 角标，靠 `after:content-['SIM']` 实现。
* 角标不能挂在 `data-[real=false]` 上——`dataAttr(false)` 根本不输出属性，
* 选择器永远选不中，所以走 `real` 这个布尔变体。
*/
const nextEventVariants = cva([
	"box-border flex flex-col justify-center gap-0.5 overflow-hidden",
	"h-[var(--widget-pill-height)] w-[var(--widget-size-lg)] rounded-pill px-4 py-2",
	"transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"
], {
	variants: {
		theme: {
			light: "bg-widget-card",
			dark: "bg-widget-dark"
		},
		priority: {
			low: "",
			normal: "",
			high: ""
		},
		real: {
			true: "",
			false: ["after:content-['SIM'] after:self-end after:font-mono after:text-[9px]", "after:tracking-[0.12em] after:text-widget-grey after:opacity-50"]
		}
	},
	defaultVariants: {
		theme: "dark",
		priority: "normal",
		real: true
	}
});
/** 「NEXT EVENT:」提示行。 */
const nextEventLabelVariants = cva(["font-ndot text-micro uppercase leading-[1.4] tracking-normal"], {
	variants: { theme: {
		light: "text-[var(--widget-dark-2)]",
		dark: "text-[var(--widget-white)]"
	} },
	defaultVariants: { theme: "dark" }
});
/** 事件标题，过长时省略号。 */
const nextEventTitleVariants = cva(["min-w-0 flex-1 truncate font-body text-[8px] font-normal leading-[1.4] tracking-normal"], {
	variants: { theme: {
		light: "text-[var(--widget-dark-2)]",
		dark: "text-[var(--widget-white)]"
	} },
	defaultVariants: { theme: "dark" }
});
/** 日期数字。 */
const nextEventDateVariants = cva(["shrink-0 font-ndot text-micro leading-none tracking-normal tabular-nums text-accent"]);
/** 月份缩写。 */
const nextEventMonthVariants = cva(["shrink-0 font-display text-xs leading-none tracking-normal text-accent"]);
/** 倒计时。24 小时内的事件（high）转成红色并加粗。 */
const nextEventCountdownVariants = cva(["ms-auto shrink-0 font-mono text-micro uppercase tracking-widest tabular-nums"], {
	variants: { priority: {
		low: "text-widget-grey",
		normal: "text-widget-grey",
		high: "font-semibold text-accent"
	} },
	defaultVariants: { priority: "normal" }
});
//#endregion
export { nextEventCountdownVariants, nextEventDateVariants, nextEventLabelVariants, nextEventMonthVariants, nextEventTitleVariants, nextEventVariants };

//# sourceMappingURL=next-event-variants.mjs.map