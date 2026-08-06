import { cva } from "class-variance-authority";
//#region src/conversation/ThoughtChain/thought-chain-variants.ts
const thoughtChainVariants = cva("aios-thought-chain", {
	variants: { line: {
		true: "aios-thought-chain--line",
		false: "",
		solid: "aios-thought-chain--line aios-thought-chain--line-solid",
		dashed: "aios-thought-chain--line aios-thought-chain--line-dashed",
		dotted: "aios-thought-chain--line aios-thought-chain--line-dotted"
	} },
	defaultVariants: { line: true }
});
const thoughtChainItemVariants = cva("aios-thought-chain__item", {
	variants: {
		status: {
			pending: "aios-thought-chain__item--pending",
			active: "aios-thought-chain__item--active",
			success: "aios-thought-chain__item--success",
			error: "aios-thought-chain__item--error"
		},
		collapsible: {
			true: "aios-thought-chain__item--collapsible",
			false: ""
		},
		expanded: {
			true: "aios-thought-chain__item--expanded",
			false: ""
		}
	},
	defaultVariants: {
		status: "pending",
		collapsible: false,
		expanded: false
	}
});
//#endregion
export { thoughtChainItemVariants, thoughtChainVariants };

//# sourceMappingURL=thought-chain-variants.mjs.map