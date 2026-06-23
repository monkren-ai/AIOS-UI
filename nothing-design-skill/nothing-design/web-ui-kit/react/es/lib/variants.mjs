import { cva } from "class-variance-authority";
//#region src/lib/variants.ts
/**
* 共享 CVA 变体定义。
*
* 集中定义跨组件复用的变体（如 `light/dark/accent` 主题），
* 避免每个组件重复声明。组件可以在自己的 cva() 中通过
* `cn(myVariants({ ... }), sharedVariants({ ... }))` 组合使用。
*
* 命名约定：
* - 主题相关 → `themeVariants`
* - 尺寸相关 → `sizeVariants` / `sizeLayoutVariants`
* - 状态相关 → `stateVariants` / `stateOnOffVariants`
* - 语义相关 → `emphasisVariants` / `statusVariants` / `orientationVariants`
*/
/**
* 主题（明暗/强调）共享变体。
* 适用于 QuickToggle、WidgetCard、WidgetPill 等需要主题切换的组件。
*/
const themeVariants = cva("", {
	variants: { theme: {
		light: "nothing-theme--light",
		dark: "nothing-theme--dark",
		accent: "nothing-theme--accent",
		error: "nothing-theme--error"
	} },
	defaultVariants: { theme: "dark" }
});
/**
* 通用尺寸变体（sm / md / lg）。
* 适用于需要"小/中/大"三档尺寸的组件。
*/
const sizeVariants = cva("", {
	variants: { size: {
		sm: "nothing-size--sm",
		md: "nothing-size--md",
		lg: "nothing-size--lg"
	} },
	defaultVariants: { size: "md" }
});
/**
* 布局尺寸变体（hero / standard / compact / sm / md / lg）。
* 适用于 ProgressBar、Tag、Avatar 等有布局尺寸区分的组件。
*/
const sizeLayoutVariants = cva("", {
	variants: { size: {
		hero: "nothing-size--hero",
		standard: "nothing-size--standard",
		compact: "nothing-size--compact",
		sm: "nothing-size--sm",
		md: "nothing-size--md",
		lg: "nothing-size--lg"
	} },
	defaultVariants: { size: "standard" }
});
/**
* 通用状态变体（on/off/disabled/loading/error）。
* 适用于开关、按钮、激活态等场景。
*/
const stateVariants = cva("", {
	variants: { state: {
		on: "nothing-state--on",
		off: "nothing-state--off",
		disabled: "nothing-state--disabled",
		loading: "nothing-state--loading",
		error: "nothing-state--error"
	} },
	defaultVariants: { state: "off" }
});
/**
* 简化的开/关状态（on/off）。
* 适用于 Switch、Toggle、QuickToggle 等布尔状态组件。
*/
const stateOnOffVariants = cva("", {
	variants: { state: {
		on: "nothing-state--on",
		off: "nothing-state--off"
	} },
	defaultVariants: { state: "off" }
});
/**
* 强调层级变体（primary/secondary/ghost/destructive）。
* 适用于 Button、Toggle、Tag 等可点击交互元素。
*/
const emphasisVariants = cva("", {
	variants: { emphasis: {
		primary: "nothing-emphasis--primary",
		secondary: "nothing-emphasis--secondary",
		ghost: "nothing-emphasis--ghost",
		destructive: "nothing-emphasis--destructive"
	} },
	defaultVariants: { emphasis: "primary" }
});
/**
* 业务状态变体（default/good/warning/overlimit/error）。
* 适用于 ProgressBar、DataGrid、Alert 等需要表达数据状态的组件。
*/
const statusVariants = cva("", {
	variants: { status: {
		default: "",
		good: "nothing-status--good",
		warning: "nothing-status--warning",
		overlimit: "nothing-status--overlimit",
		error: "nothing-status--error"
	} },
	defaultVariants: { status: "default" }
});
/**
* 朝向变体（horizontal/vertical）。
* 适用于 Separator、Resizable、Slider 等有方向区分的组件。
*/
const orientationVariants = cva("", {
	variants: { orientation: {
		horizontal: "nothing-orientation--horizontal",
		vertical: "nothing-orientation--vertical"
	} },
	defaultVariants: { orientation: "horizontal" }
});
//#endregion
export { emphasisVariants, orientationVariants, sizeLayoutVariants, sizeVariants, stateOnOffVariants, stateVariants, statusVariants, themeVariants };

//# sourceMappingURL=variants.mjs.map