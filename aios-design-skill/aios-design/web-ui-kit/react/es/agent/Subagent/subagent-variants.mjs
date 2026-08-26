import { cva } from "class-variance-authority";
//#region src/agent/Subagent/subagent-variants.ts
const subagentVariants = cva("flex flex-col gap-2 rounded-card border border-border bg-surface p-3", {
	variants: { status: {
		running: "",
		done: "text-foreground-muted",
		error: "border-accent text-accent"
	} },
	defaultVariants: { status: "running" }
});
//#endregion
export { subagentVariants };

//# sourceMappingURL=subagent-variants.mjs.map