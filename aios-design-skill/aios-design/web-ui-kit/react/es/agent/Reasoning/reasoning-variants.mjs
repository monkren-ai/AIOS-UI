import { cva } from "class-variance-authority";
//#region src/agent/Reasoning/reasoning-variants.ts
const reasoningVariants = cva("group/reasoning w-full text-foreground", {
	variants: {
		container: {
			true: "rounded-card border border-border-visible bg-surface",
			false: ""
		},
		status: {
			running: "",
			finished: "",
			error: "text-accent"
		}
	},
	defaultVariants: {
		container: false,
		status: "finished"
	}
});
const reasoningGroupVariants = cva("flex w-full flex-col gap-3");
//#endregion
export { reasoningGroupVariants, reasoningVariants };

//# sourceMappingURL=reasoning-variants.mjs.map