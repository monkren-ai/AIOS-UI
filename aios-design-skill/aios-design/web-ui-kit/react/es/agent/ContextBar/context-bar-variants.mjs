import { cva } from "class-variance-authority";
//#region src/agent/ContextBar/context-bar-variants.ts
const contextBarVariants = cva("flex w-full flex-col gap-2 border border-border bg-surface-raised p-3", {
	variants: { position: {
		header: "rounded-t-card",
		footer: "rounded-b-card",
		detached: "rounded-card"
	} },
	defaultVariants: { position: "detached" }
});
const contextBarLabelVariants = cva("flex min-h-9 items-center justify-between gap-3 text-sm", {
	variants: {
		status: {
			default: "",
			progress: "",
			loading: "",
			waiting: "text-foreground-muted",
			done: "text-foreground-muted",
			queue: "text-foreground-muted",
			error: "text-accent"
		},
		muted: {
			true: "text-foreground-muted",
			false: "text-foreground"
		}
	},
	defaultVariants: {
		status: "default",
		muted: false
	}
});
//#endregion
export { contextBarLabelVariants, contextBarVariants };

//# sourceMappingURL=context-bar-variants.mjs.map