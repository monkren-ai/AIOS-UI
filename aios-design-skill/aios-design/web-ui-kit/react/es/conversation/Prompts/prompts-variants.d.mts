//#region src/conversation/Prompts/prompts-variants.d.ts
declare const promptsVariants: (props?: ({
  variant?: "filled" | "default" | "bordered" | null | undefined;
  layout?: "grid" | "list" | "wrap" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const promptsItemVariants: (props?: ({
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { promptsItemVariants, promptsVariants };
//# sourceMappingURL=prompts-variants.d.mts.map