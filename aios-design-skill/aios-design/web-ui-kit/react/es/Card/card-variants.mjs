import { cva } from "class-variance-authority";
//#region src/Card/card-variants.ts
const contentCardVariants = cva(["border transition-colors duration-200 ease-aios motion-reduce:transition-none"], {
	variants: {
		variant: {
			soft: "border-border bg-surface",
			secondary: "border-border bg-surface-raised",
			outline: "border-border bg-transparent",
			ghost: "border-transparent bg-transparent"
		},
		size: {
			sm: "px-4 py-2",
			md: "px-6 py-5",
			lg: "px-8 py-6"
		},
		shape: {
			rounded: "rounded-card",
			technical: "rounded-xs"
		},
		interactive: {
			true: "cursor-pointer select-none hover:border-border-visible active:opacity-85 outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
			false: ""
		},
		disabled: {
			true: "pointer-events-none opacity-40",
			false: ""
		}
	},
	compoundVariants: [{
		size: "sm",
		shape: "rounded",
		class: "rounded-card-compact"
	}],
	defaultVariants: {
		variant: "soft",
		size: "md",
		shape: "rounded",
		interactive: false,
		disabled: false
	}
});
const legacyVariants = {
	default: "soft",
	raised: "secondary",
	borderless: "ghost",
	compact: "soft",
	technical: "soft"
};
function resolveCardVariant(value) {
	return value ? legacyVariants[value] ?? value : void 0;
}
function resolveCardSize(variant, size) {
	return size ?? (variant === "compact" ? "sm" : void 0);
}
function resolveCardShape(variant, shape) {
	return shape ?? (variant === "technical" ? "technical" : void 0);
}
//#endregion
export { contentCardVariants, resolveCardShape, resolveCardSize, resolveCardVariant };

//# sourceMappingURL=card-variants.mjs.map