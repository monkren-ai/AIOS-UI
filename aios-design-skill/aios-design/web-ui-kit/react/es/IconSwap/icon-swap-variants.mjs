import { cva } from "class-variance-authority";
//#region src/IconSwap/icon-swap-variants.ts
const iconSwapVariants = cva("relative inline-grid place-items-center", {
	variants: { size: {
		sm: "size-4",
		md: "size-5",
		lg: "size-6"
	} },
	defaultVariants: { size: "md" }
});
const iconSwapLayerVariants = cva([
	"col-start-1 row-start-1 inline-flex items-center justify-center",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none motion-reduce:scale-100"
], {
	variants: { active: {
		true: "scale-100 opacity-100",
		false: "pointer-events-none scale-75 opacity-0"
	} },
	defaultVariants: { active: false }
});
//#endregion
export { iconSwapLayerVariants, iconSwapVariants };

//# sourceMappingURL=icon-swap-variants.mjs.map