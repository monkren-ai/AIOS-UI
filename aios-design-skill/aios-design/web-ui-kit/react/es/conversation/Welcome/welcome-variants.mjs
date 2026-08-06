import { cva } from "class-variance-authority";
//#region src/conversation/Welcome/welcome-variants.ts
const welcomeVariants = cva("aios-welcome", {
	variants: {
		variant: {
			default: "",
			centered: "aios-welcome--centered",
			compact: "aios-welcome--compact"
		},
		size: {
			sm: "aios-welcome--sm",
			md: "aios-welcome--md",
			lg: "aios-welcome--lg"
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