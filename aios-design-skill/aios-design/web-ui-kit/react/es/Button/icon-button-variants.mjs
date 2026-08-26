import { cva } from "class-variance-authority";
//#region src/Button/icon-button-variants.ts
const iconButtonVariants = cva("shrink-0", {
	variants: { shape: {
		circle: "rounded-full",
		technical: "rounded-card-technical"
	} },
	defaultVariants: { shape: "circle" }
});
//#endregion
export { iconButtonVariants };

//# sourceMappingURL=icon-button-variants.mjs.map