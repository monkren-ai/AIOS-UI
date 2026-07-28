import { cva } from "class-variance-authority";
//#region src/conversation/Conversations/conversations-variants.ts
const conversationsVariants = cva("nothing-conversations", {
	variants: {
		variant: {
			default: "",
			bordered: "nothing-conversations--bordered",
			filled: "nothing-conversations--filled"
		},
		size: {
			sm: "nothing-conversations--sm",
			md: "nothing-conversations--md",
			lg: "nothing-conversations--lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
const conversationsItemVariants = cva("nothing-conversations__item", {
	variants: {
		active: {
			true: "nothing-conversations__item--active",
			false: ""
		},
		disabled: {
			true: "nothing-conversations__item--disabled",
			false: ""
		}
	},
	defaultVariants: {
		active: false,
		disabled: false
	}
});
//#endregion
export { conversationsItemVariants, conversationsVariants };

//# sourceMappingURL=conversations-variants.mjs.map