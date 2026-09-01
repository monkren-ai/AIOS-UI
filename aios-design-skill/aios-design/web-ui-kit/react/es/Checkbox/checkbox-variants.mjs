import { cva } from "class-variance-authority";
//#region src/Checkbox/checkbox-variants.ts
/**
* Checkbox 的视觉变体。
*
* 勾选态是「实心反相」：盒子填 `bg-foreground-display`，勾用 `text-background`。
* 行高走 36 / 44 / 52 的触达基线，`md` 正好等于 `--touch-target-min`。
*/
const checkboxVariants = cva(["group/checkbox inline-flex select-none items-center gap-2", "cursor-pointer [-webkit-tap-highlight-color:transparent]"], {
	variants: {
		size: {
			sm: "min-h-9",
			md: "min-h-11",
			lg: "min-h-13"
		},
		isChecked: {
			true: "",
			false: ""
		},
		indeterminate: {
			true: "",
			false: ""
		},
		disabled: {
			true: "cursor-not-allowed opacity-40",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		isChecked: false,
		indeterminate: false,
		disabled: false
	}
});
/** 方形盒子（Base UI Checkbox.Root）。 */
const checkboxBoxVariants = cva([
	"group/checkbox-box relative flex shrink-0 items-center justify-center",
	"rounded-2xs border border-border-visible bg-transparent",
	"transition-[background-color,border-color] duration-200 ease-aios motion-reduce:transition-none",
	"focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"checked:border-foreground-display checked:bg-foreground-display",
	"data-indeterminate:border-foreground-display data-indeterminate:bg-foreground-display",
	"data-disabled:border-border data-disabled:bg-border"
], {
	variants: { size: {
		sm: "size-4",
		md: "size-4.5",
		lg: "size-5.5"
	} },
	defaultVariants: { size: "md" }
});
/** 勾 / 横线的共同容器（Base UI Checkbox.Indicator，keepMounted）。 */
const checkboxIndicatorVariants = cva(["pointer-events-none flex items-center justify-center text-background"]);
/** 勾选标记。未勾选时靠 stroke-dashoffset 藏住，勾选时描边画出。 */
const checkboxCheckVariants = cva([
	"absolute",
	"[&_path]:[stroke-dasharray:16] [&_path]:[stroke-dashoffset:16]",
	"[&_path]:transition-[stroke-dashoffset] [&_path]:duration-[var(--duration-spring-moderate)] [&_path]:ease-spring-moderate",
	"motion-reduce:[&_path]:transition-none",
	"group-data-[checked]/checkbox-box:[&_path]:[stroke-dashoffset:0]"
], {
	variants: { size: {
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5"
	} },
	defaultVariants: { size: "md" }
});
/** 半选横线。 */
const checkboxDashVariants = cva([
	"absolute scale-0 opacity-0",
	"transition-[opacity,transform] duration-200 ease-aios motion-reduce:transition-none",
	"group-data-[indeterminate]/checkbox-box:scale-100 group-data-[indeterminate]/checkbox-box:opacity-100"
], {
	variants: { size: {
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5"
	} },
	defaultVariants: { size: "md" }
});
/** 文字标签。勾选后提亮到 text-foreground。 */
const checkboxLabelVariants = cva([
	"font-mono uppercase tracking-wider text-foreground-muted",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"group-data-[state=checked]/checkbox:text-foreground",
	"group-data-[state=indeterminate]/checkbox:text-foreground"
], {
	variants: { size: {
		sm: "text-micro",
		md: "text-caption",
		lg: "text-sm"
	} },
	defaultVariants: { size: "md" }
});
//#endregion
export { checkboxBoxVariants, checkboxCheckVariants, checkboxDashVariants, checkboxIndicatorVariants, checkboxLabelVariants, checkboxVariants };

//# sourceMappingURL=checkbox-variants.mjs.map