import { cva } from "class-variance-authority";
//#region src/SuccessCheck/success-check-variants.ts
const successCheckVariants = cva([
	"inline-flex items-center gap-2",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none"
], {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		active: {
			true: "opacity-100",
			false: "opacity-40"
		}
	},
	defaultVariants: {
		size: "md",
		active: false
	}
});
const successCheckMarkVariants = cva([
	"shrink-0 rounded-full border border-border-visible text-foreground-display",
	"transition-[transform,opacity,border-color,background-color] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none motion-reduce:scale-100",
	"[&_path]:[stroke-dasharray:24] [&_path]:[stroke-dashoffset:24]",
	"[&_path]:transition-none"
], {
	variants: {
		size: {
			sm: "size-5",
			md: "size-6",
			lg: "size-8"
		},
		active: {
			true: "scale-100 border-foreground-display bg-foreground-display text-background [&_path]:motion-safe:animate-success-draw [&_path]:motion-reduce:[stroke-dashoffset:0]",
			false: "scale-[var(--scale-overlay-modal)] bg-transparent"
		}
	},
	defaultVariants: {
		size: "md",
		active: false
	}
});
const successCheckLabelVariants = cva("font-mono uppercase tracking-wider text-foreground-muted", {
	variants: { size: {
		sm: "text-micro",
		md: "text-label",
		lg: "text-caption"
	} },
	defaultVariants: { size: "md" }
});
//#endregion
export { successCheckLabelVariants, successCheckMarkVariants, successCheckVariants };

//# sourceMappingURL=success-check-variants.mjs.map