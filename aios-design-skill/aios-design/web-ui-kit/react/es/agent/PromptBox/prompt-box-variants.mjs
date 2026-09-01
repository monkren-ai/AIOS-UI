import { cva } from "class-variance-authority";
//#region src/agent/PromptBox/prompt-box-variants.ts
const promptBoxVariants = cva("w-full", {
	variants: {
		density: {
			comfortable: "",
			compact: "[&_[data-slot=sender]]:min-h-0"
		},
		inset: {
			true: "px-3",
			false: ""
		}
	},
	defaultVariants: {
		density: "comfortable",
		inset: false
	}
});
const promptBoxActionVariants = cva("grid size-11 place-items-center rounded-button font-mono text-caption text-foreground-muted hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive disabled:opacity-40");
//#endregion
export { promptBoxActionVariants, promptBoxVariants };

//# sourceMappingURL=prompt-box-variants.mjs.map