import { cva } from "class-variance-authority";
//#region src/Switch/switch-variants.ts
/**
* Switch 的视觉变体。
*
* 打开态是「实心反相」：轨道填 `bg-foreground-display`，滑块变 `bg-background`。
* 滑块位移用逻辑属性 `start-*`，RTL 下自动镜像。
*/
const switchVariants = cva(["group/switch inline-flex select-none items-center gap-2", "cursor-pointer [-webkit-tap-highlight-color:transparent]"], {
	variants: {
		size: {
			sm: "min-h-9",
			md: "min-h-11",
			lg: "min-h-13"
		},
		checked: {
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
		checked: false,
		disabled: false
	}
});
/** 轨道（Base UI Switch.Root）。 */
const switchTrackVariants = cva([
	"group/switch-track relative shrink-0 rounded-pill border-0 bg-border-visible p-0",
	"transition-colors duration-[var(--duration-spring-moderate)] ease-spring-moderate motion-reduce:transition-none",
	"focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&:not([data-disabled])]:hover:bg-foreground-muted",
	"checked:bg-foreground-display",
	"checked:[&:not([data-disabled])]:hover:bg-foreground",
	"data-disabled:bg-border"
], {
	variants: { size: {
		sm: "h-5 w-9",
		md: "h-6 w-11",
		lg: "h-8 w-14"
	} },
	defaultVariants: { size: "md" }
});
/** 滑块（Base UI Switch.Thumb）。 */
const switchThumbVariants = cva([
	"absolute top-1/2 -translate-y-1/2 rounded-full bg-foreground-disabled",
	"transition-[inset-inline-start,background-color,scale] duration-[var(--duration-spring-moderate)] ease-spring-moderate motion-reduce:transition-none",
	"group-data-[checked]/switch-track:bg-background",
	"group-data-[disabled]/switch-track:bg-foreground-disabled"
], {
	variants: { size: {
		sm: "size-4 start-0.5 group-data-[checked]/switch-track:start-[18px]",
		md: "size-5 start-0.5 group-data-[checked]/switch-track:start-[22px]",
		lg: "size-6 start-1 group-data-[checked]/switch-track:start-7"
	} },
	defaultVariants: { size: "md" }
});
/** 文字标签。打开后提亮到 text-foreground。 */
const switchLabelVariants = cva([
	"font-mono uppercase tracking-wider text-foreground-muted",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"group-data-[state=on]/switch:text-foreground"
], {
	variants: { size: {
		sm: "text-micro",
		md: "text-caption",
		lg: "text-sm"
	} },
	defaultVariants: { size: "md" }
});
//#endregion
export { switchLabelVariants, switchThumbVariants, switchTrackVariants, switchVariants };

//# sourceMappingURL=switch-variants.mjs.map