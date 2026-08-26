import { cva } from "class-variance-authority";
//#region src/agent/ActivityLabel/activity-label-variants.ts
const activityLabelVariants = cva("inline-flex min-h-5 items-center gap-2 font-mono text-caption uppercase transition-colors duration-200 motion-reduce:transition-none", {
	variants: {
		active: {
			true: "text-foreground",
			false: "text-foreground-muted"
		},
		status: {
			default: "",
			error: "text-accent"
		}
	},
	defaultVariants: {
		active: false,
		status: "default"
	}
});
//#endregion
export { activityLabelVariants };

//# sourceMappingURL=activity-label-variants.mjs.map