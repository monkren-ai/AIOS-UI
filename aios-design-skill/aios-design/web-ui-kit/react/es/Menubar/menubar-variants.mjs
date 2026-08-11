import { cva } from "class-variance-authority";
//#region src/Menubar/menubar-variants.ts
const menubarRootVariants = cva(["inline-flex w-fit border-border-visible bg-transparent"], {
	variants: { orientation: {
		horizontal: "flex-row items-center border-b",
		vertical: "flex-col items-stretch border-s"
	} },
	defaultVariants: { orientation: "horizontal" }
});
//#endregion
export { menubarRootVariants };

//# sourceMappingURL=menubar-variants.mjs.map