import { cva } from "class-variance-authority";
//#region src/Kbd/kbd-variants.ts
/**
* Kbd 的视觉变体。
*
* 键帽在 Nothing 的语言里就是一块方角的 surface：一条 border 划出边界，
* 不用阴影去伪造按键的立体感。
*/
const kbdVariants = cva([
	"inline-flex shrink-0 select-none items-center justify-center gap-0.5",
	"whitespace-nowrap font-mono uppercase leading-none tracking-wider",
	"rounded-2xs border"
], {
	variants: {
		variant: {
			soft: "border-border bg-surface-raised text-foreground-muted",
			outline: "border-border-visible bg-transparent text-foreground-muted",
			ghost: "border-transparent bg-transparent text-foreground-subtle"
		},
		size: {
			sm: "h-4 min-w-4 px-1 text-micro",
			md: "h-5 min-w-5 px-1.5 text-label",
			lg: "h-6 min-w-6 px-2 text-caption"
		}
	},
	defaultVariants: {
		variant: "soft",
		size: "md"
	}
});
//#endregion
export { kbdVariants };

//# sourceMappingURL=kbd-variants.mjs.map