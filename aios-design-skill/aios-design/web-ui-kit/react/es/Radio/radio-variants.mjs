import { cva } from "class-variance-authority";
//#region src/Radio/radio-variants.ts
const radioVariants = cva([
	"inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border-visible bg-transparent",
	"transition-[background-color,border-color,opacity] duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"checked:border-accent disabled:cursor-not-allowed disabled:opacity-40"
], {
	variants: { size: {
		sm: "size-4",
		md: "size-5",
		lg: "size-6"
	} },
	defaultVariants: { size: "md" }
});
const radioIndicatorVariants = cva(["rounded-full bg-accent transition-transform duration-200 ease-aios motion-reduce:transition-none"], {
	variants: { size: {
		sm: "size-2",
		md: "size-2.5",
		lg: "size-3"
	} },
	defaultVariants: { size: "md" }
});
//#endregion
export { radioIndicatorVariants, radioVariants };

//# sourceMappingURL=radio-variants.mjs.map