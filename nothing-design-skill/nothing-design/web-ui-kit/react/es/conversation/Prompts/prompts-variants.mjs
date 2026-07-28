import { cva } from "class-variance-authority";
//#region src/conversation/Prompts/prompts-variants.ts
const promptsVariants = cva("nothing-prompts", {
	variants: {
		variant: {
			default: "",
			bordered: "nothing-prompts--bordered",
			filled: "nothing-prompts--filled"
		},
		layout: {
			grid: "nothing-prompts--grid",
			list: "nothing-prompts--list",
			wrap: "nothing-prompts--wrap"
		},
		size: {
			sm: "nothing-prompts--sm",
			md: "nothing-prompts--md",
			lg: "nothing-prompts--lg"
		}
	},
	defaultVariants: {
		variant: "default",
		layout: "grid",
		size: "md"
	}
});
const promptsItemVariants = cva("nothing-prompts__item", {
	variants: { disabled: {
		true: "nothing-prompts__item--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
//#endregion
export { promptsItemVariants, promptsVariants };

//# sourceMappingURL=prompts-variants.mjs.map