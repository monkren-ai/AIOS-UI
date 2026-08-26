import { cva } from "class-variance-authority";
//#region src/agent/AssistantPanel/assistant-panel-variants.ts
const assistantPanelVariants = cva("z-overlay flex flex-col overflow-hidden rounded-card border border-border-visible bg-surface text-foreground", {
	variants: { inline: {
		true: "absolute inset-inline-end-0 bottom-14 h-[min(32rem,calc(100vh-5rem))] w-[min(24rem,calc(100vw-2rem))]",
		false: "fixed inset-inline-end-4 bottom-20 h-[min(32rem,calc(100vh-6rem))] w-[min(24rem,calc(100vw-2rem))]"
	} },
	defaultVariants: { inline: false }
});
//#endregion
export { assistantPanelVariants };

//# sourceMappingURL=assistant-panel-variants.mjs.map