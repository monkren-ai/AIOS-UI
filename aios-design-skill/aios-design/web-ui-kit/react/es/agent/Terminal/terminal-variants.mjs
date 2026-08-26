import { cva } from "class-variance-authority";
//#region src/agent/Terminal/terminal-variants.ts
const terminalVariants = cva("overflow-hidden rounded-card border border-border-visible bg-background font-mono text-sm text-foreground", {
	variants: { failed: {
		true: "border-accent",
		false: ""
	} },
	defaultVariants: { failed: false }
});
//#endregion
export { terminalVariants };

//# sourceMappingURL=terminal-variants.mjs.map