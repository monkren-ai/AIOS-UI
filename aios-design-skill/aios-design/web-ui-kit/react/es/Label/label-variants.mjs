import { cva } from "class-variance-authority";
//#region src/Label/label-variants.ts
/**
* Label 的视觉变体。
*
* 控件标签统一走 font-mono + 大写 + 宽字距，颜色停在 text-foreground-muted。
*/
const labelVariants = cva([
	"inline-flex cursor-default items-center gap-0.5",
	"font-mono uppercase tracking-wider text-foreground-muted",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none"
], {
	variants: {
		size: {
			sm: "text-micro",
			md: "text-label",
			lg: "text-caption"
		},
		disabled: {
			true: "cursor-not-allowed text-foreground-disabled",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		disabled: false
	}
});
/** 标签文字本体。 */
const labelTextVariants = cva(["inline"]);
/** 必填星号。唯一允许的红色出现点。 */
const labelRequiredVariants = cva(["text-sm leading-none text-accent"]);
//#endregion
export { labelRequiredVariants, labelTextVariants, labelVariants };

//# sourceMappingURL=label-variants.mjs.map