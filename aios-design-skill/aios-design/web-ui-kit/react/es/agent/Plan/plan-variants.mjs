import { cva } from "class-variance-authority";
//#region src/agent/Plan/plan-variants.ts
const planVariants = cva("w-full rounded-card border border-border-visible bg-surface p-3");
const planStepVariants = cva("flex min-h-10 items-start gap-3 py-2 text-sm", {
	variants: { status: {
		done: "text-foreground-muted",
		active: "text-foreground",
		pending: "text-foreground-disabled"
	} },
	defaultVariants: { status: "pending" }
});
//#endregion
export { planStepVariants, planVariants };

//# sourceMappingURL=plan-variants.mjs.map