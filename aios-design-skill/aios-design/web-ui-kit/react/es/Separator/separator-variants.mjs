import { cva } from "class-variance-authority";
//#region src/Separator/separator-variants.ts
/**
* Separator 的视觉变体。
*
* 只有一条 1px 的 border 色细线，可选中缀标签。`size` 控制线两侧留白。
*/
const separatorVariants = cva(["flex shrink-0 items-center"], {
	variants: {
		orientation: {
			horizontal: "h-auto w-full flex-row",
			vertical: "h-full w-auto flex-col"
		},
		size: {
			sm: "",
			md: "",
			lg: ""
		}
	},
	compoundVariants: [
		{
			orientation: "horizontal",
			size: "sm",
			class: "py-1"
		},
		{
			orientation: "horizontal",
			size: "md",
			class: "py-2"
		},
		{
			orientation: "horizontal",
			size: "lg",
			class: "py-4"
		},
		{
			orientation: "vertical",
			size: "sm",
			class: "px-1"
		},
		{
			orientation: "vertical",
			size: "md",
			class: "px-2"
		},
		{
			orientation: "vertical",
			size: "lg",
			class: "px-4"
		}
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "md"
	}
});
/** 细线本体。 */
const separatorLineVariants = cva(["flex-1 bg-border"], {
	variants: { orientation: {
		horizontal: "h-px w-auto",
		vertical: "h-auto w-px"
	} },
	defaultVariants: { orientation: "horizontal" }
});
/** 中缀标签。 */
const separatorLabelVariants = cva(["whitespace-nowrap font-mono uppercase leading-none tracking-wider text-foreground-muted"], {
	variants: {
		orientation: {
			horizontal: "px-2",
			vertical: "py-2"
		},
		size: {
			sm: "text-micro",
			md: "text-caption",
			lg: "text-sm"
		}
	},
	defaultVariants: {
		orientation: "horizontal",
		size: "md"
	}
});
//#endregion
export { separatorLabelVariants, separatorLineVariants, separatorVariants };

//# sourceMappingURL=separator-variants.mjs.map