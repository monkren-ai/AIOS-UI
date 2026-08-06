import { cva } from "class-variance-authority";
//#region src/Tabs/tabs-variants.ts
/**
* Tabs 的视觉变体。
*
* 三种形态：
* - `default` 底部一条分隔线 + 线性 indicator
* - `pills` 整条 list 变成一个 surface-raised 胶囊容器，选中项反白
* - `subtle` 无容器，正文字体，indicator 收细到 1px
*
* indicator 与 hover 垫层的位移走 `inset-inline-start`，RTL 下自动镜像。
*/
const tabsVariants = cva("flex flex-col", {
	variants: {
		variant: {
			default: "",
			pills: "",
			subtle: ""
		},
		indicator: {
			line: "",
			background: "",
			none: ""
		}
	},
	defaultVariants: {
		variant: "default",
		indicator: "line"
	}
});
/** tablist 容器。变体差异主要落在这里。 */
const tabsListVariants = cva("relative flex", {
	variants: { variant: {
		default: "gap-0 border-b border-border-visible",
		pills: "gap-1 rounded-card-compact border border-border-visible bg-surface-raised p-1",
		subtle: "gap-4"
	} },
	defaultVariants: { variant: "default" }
});
/** 单个 tab 触发器。 */
const tabTriggerVariants = cva([
	"relative z-[1] inline-flex items-center justify-center",
	"cursor-pointer select-none whitespace-nowrap border-none bg-transparent",
	"text-foreground-muted hover:text-foreground",
	"transition-[color,background-color,border-color] duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2",
	"pointer-coarse:min-h-11 pointer-coarse:py-3"
], {
	variants: {
		variant: {
			default: "px-4 py-2 font-mono text-sm uppercase tracking-wider",
			pills: "rounded-pill px-4 py-2 font-mono text-sm uppercase tracking-wider",
			subtle: "px-0 py-2 font-body text-sm normal-case tracking-normal"
		},
		active: {
			true: "text-foreground",
			false: ""
		},
		disabled: {
			true: "cursor-not-allowed text-foreground-disabled hover:text-foreground-disabled",
			false: ""
		}
	},
	compoundVariants: [{
		variant: "pills",
		active: true,
		className: "border border-border-visible bg-surface text-foreground-display"
	}],
	defaultVariants: {
		variant: "default",
		active: false,
		disabled: false
	}
});
/** 线性 indicator。位置由 JS 写进 `inset-inline-start` / `width`。 */
const tabsIndicatorVariants = cva([
	"pointer-events-none absolute start-0 rounded-pill",
	"transition-[inset-inline-start,width,opacity] duration-[160ms] ease-spring-moderate",
	"motion-reduce:transition-none"
], {
	variants: { variant: {
		default: "-bottom-px h-0.5 bg-interactive",
		pills: "-bottom-px h-0.5 bg-interactive",
		subtle: "bottom-0 h-px bg-foreground"
	} },
	defaultVariants: { variant: "default" }
});
/** proximity hover 的背景垫层，压在 trigger 下面。 */
const tabsHoverBackgroundVariants = cva([
	"pointer-events-none absolute top-0 z-0 h-full start-0 rounded-sm bg-muted",
	"transition-[inset-inline-start,width,opacity] duration-[80ms] ease-spring-fast",
	"motion-reduce:transition-none"
]);
/** 面板容器。 */
const tabsPanelVariants = cva(["py-4 outline-none", "focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"]);
//#endregion
export { tabTriggerVariants, tabsHoverBackgroundVariants, tabsIndicatorVariants, tabsListVariants, tabsPanelVariants, tabsVariants };

//# sourceMappingURL=tabs-variants.mjs.map