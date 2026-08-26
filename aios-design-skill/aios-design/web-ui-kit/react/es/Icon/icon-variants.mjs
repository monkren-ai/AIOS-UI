import { cva } from "class-variance-authority";
//#region src/Icon/icon-variants.ts
const iconVariants = cva("inline-block shrink-0 text-current", {
	variants: { size: {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
		xl: "size-8"
	} },
	defaultVariants: { size: "md" }
});
//#endregion
export { iconVariants };

//# sourceMappingURL=icon-variants.mjs.map