//#region src/CodeDiff/code-diff-variants.d.ts
declare const codeDiffVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const codeDiffLineVariants: (props?: ({
  type?: "context" | "add" | "remove" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { codeDiffLineVariants, codeDiffVariants };
//# sourceMappingURL=code-diff-variants.d.mts.map