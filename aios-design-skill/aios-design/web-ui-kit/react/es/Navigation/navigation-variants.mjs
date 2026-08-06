import { cva } from "class-variance-authority";
//#region src/Navigation/navigation-variants.ts
/**
* Navigation 的视觉变体。
*
* 断点沿用 v1 的 768/769 分界（Tailwind 的 `md:` 是 min-width:768px，正好差 1px），
* 所以桌面版写成 base、窄屏用 `max-[768px]:` 覆盖成底部标签栏。
*
* `variant` 描述的是选中态的表达方式（滑动下划线 / 方括号 / 竖线分隔），
* 不参与 §3 的强调层级词表。
*/
const navigationVariants = cva([
	"relative flex items-center gap-4",
	"font-mono text-caption uppercase tracking-wider",
	"max-[768px]:fixed max-[768px]:inset-x-0 max-[768px]:bottom-0 max-[768px]:z-100",
	"max-[768px]:justify-around max-[768px]:gap-0 max-[768px]:px-4 max-[768px]:py-2",
	"max-[768px]:border-t max-[768px]:border-border-visible max-[768px]:bg-surface"
], {
	variants: { variant: {
		default: "",
		bracket: "",
		pipe: ""
	} },
	defaultVariants: { variant: "default" }
});
/** 单个导航项。 */
const navItemVariants = cva([
	"relative cursor-pointer select-none whitespace-nowrap border-none bg-transparent py-2",
	"font-mono text-caption uppercase tracking-wider",
	"text-foreground-disabled hover:text-foreground-muted",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[-webkit-tap-highlight-color:transparent]",
	"max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-0.5",
	"max-[768px]:px-2 max-[768px]:py-1 max-[768px]:text-label"
], {
	variants: {
		variant: {
			default: "",
			bracket: "",
			pipe: ""
		},
		active: {
			true: "text-foreground-display",
			false: ""
		}
	},
	compoundVariants: [{
		variant: "bracket",
		active: true,
		class: [
			"before:text-foreground-display before:content-['[_']",
			"after:text-foreground-display after:content-['_]']",
			"max-[768px]:before:content-none",
			"max-[768px]:after:absolute max-[768px]:after:inset-x-0 max-[768px]:after:top-0",
			"max-[768px]:after:mx-auto max-[768px]:after:size-1 max-[768px]:after:rounded-full",
			"max-[768px]:after:bg-foreground-display max-[768px]:after:content-['']"
		].join(" ")
	}],
	defaultVariants: {
		variant: "default",
		active: false
	}
});
/** 包住导航项与分隔符的行内容器。 */
const navItemWrapperVariants = cva(["inline-flex items-center"]);
/** pipe 变体的竖线分隔符。窄屏藏起来。 */
const navSeparatorVariants = cva(["mx-1 text-border-visible max-[768px]:hidden"]);
/**
* 跟随选中项滑动的下划线。
*
* 位置靠 JS 量出来后写在 `inset-inline-start` 上（`Navigation.tsx` 会按
* 书写方向换算），所以 transition 也跟着挂在逻辑属性上。
*/
const navIndicatorVariants = cva([
	"pointer-events-none absolute bottom-0 h-0.5 bg-foreground-display",
	"transition-[inset-inline-start,width] duration-[160ms] ease-spring-moderate",
	"motion-reduce:transition-none",
	"max-[768px]:bottom-auto max-[768px]:top-0"
]);
/** 返回按钮。窄屏钉在视口行首上角。 */
const navBackVariants = cva([
	"inline-flex size-[42px] shrink-0 cursor-pointer items-center justify-center p-0",
	"rounded-full border border-border-visible bg-surface text-foreground-muted",
	"text-subheading leading-none",
	"transition-[background-color,border-color,color] duration-200 ease-aios motion-reduce:transition-none",
	"hover:border-foreground-muted hover:text-foreground-display active:bg-surface-raised",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[-webkit-tap-highlight-color:transparent]",
	"[&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.5]",
	"max-[768px]:fixed max-[768px]:top-4 max-[768px]:start-4 max-[768px]:z-[101]",
	"min-[769px]:me-2"
]);
//#endregion
export { navBackVariants, navIndicatorVariants, navItemVariants, navItemWrapperVariants, navSeparatorVariants, navigationVariants };

//# sourceMappingURL=navigation-variants.mjs.map