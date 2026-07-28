import { cva } from "class-variance-authority";
//#region src/conversation/Welcome/welcome-variants.ts
const welcomeVariants = cva("nothing-welcome", {
	variants: {
		variant: {
			default: "",
			centered: "nothing-welcome--centered",
			compact: "nothing-welcome--compact"
		},
		size: {
			sm: "nothing-welcome--sm",
			md: "nothing-welcome--md",
			lg: "nothing-welcome--lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
//#endregion
export { welcomeVariants };

//# sourceMappingURL=welcome-variants.mjs.map