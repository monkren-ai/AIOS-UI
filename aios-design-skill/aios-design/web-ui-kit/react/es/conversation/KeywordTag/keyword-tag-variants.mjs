import { cva } from "class-variance-authority";
//#region src/conversation/KeywordTag/keyword-tag-variants.ts
const keywordTagVariants = cva("inline-flex min-h-9 items-center gap-2 rounded-tag border border-border bg-surface px-2 font-mono text-caption text-foreground-muted", {
	variants: { kind: {
		context: "",
		model: "border-border-visible text-foreground",
		service: "",
		file: ""
	} },
	defaultVariants: { kind: "context" }
});
//#endregion
export { keywordTagVariants };

//# sourceMappingURL=keyword-tag-variants.mjs.map