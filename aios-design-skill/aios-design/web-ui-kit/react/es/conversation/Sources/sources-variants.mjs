import { cva } from "class-variance-authority";
//#region src/conversation/Sources/sources-variants.ts
const sourcesVariants = cva("rounded-card border border-border bg-surface");
const sourceVariants = cva("flex min-h-16 flex-col gap-1 rounded-card border border-border p-3 text-start text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive");
//#endregion
export { sourceVariants, sourcesVariants };

//# sourceMappingURL=sources-variants.mjs.map