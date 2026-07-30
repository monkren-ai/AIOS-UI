import { cva } from "class-variance-authority";
//#region src/Button/button-variants.ts
const buttonVariants = cva("nothing-btn", {
	variants: {
		variant: {
			primary: "nothing-btn--primary",
			secondary: "nothing-btn--secondary",
			ghost: "nothing-btn--ghost",
			destructive: "nothing-btn--destructive",
			tertiary: "nothing-btn--tertiary"
		},
		size: {
			default: "",
			sm: "nothing-btn--sm",
			lg: "nothing-btn--lg",
			icon: "nothing-btn--icon",
			"icon-sm": "nothing-btn--icon-sm",
			"icon-lg": "nothing-btn--icon-lg"
		},
		fullWidth: {
			true: "nothing-btn--full",
			false: ""
		},
		loading: {
			true: "nothing-btn--loading",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
		fullWidth: false,
		loading: false
	}
});
//#endregion
export { buttonVariants };

//# sourceMappingURL=button-variants.mjs.map