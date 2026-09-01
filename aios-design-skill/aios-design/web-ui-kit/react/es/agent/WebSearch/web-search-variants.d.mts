//#region src/agent/WebSearch/web-search-variants.d.ts
declare const webSearchVariants: (props?: ({
  status?: "error" | "running" | "complete" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const webSearchResultVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { webSearchResultVariants, webSearchVariants };
//# sourceMappingURL=web-search-variants.d.mts.map