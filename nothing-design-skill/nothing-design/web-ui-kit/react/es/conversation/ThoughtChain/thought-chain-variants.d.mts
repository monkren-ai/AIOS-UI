//#region src/conversation/ThoughtChain/thought-chain-variants.d.ts
declare const thoughtChainVariants: (props?: ({
  line?: boolean | "solid" | "dashed" | "dotted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const thoughtChainItemVariants: (props?: ({
  status?: "active" | "error" | "pending" | "success" | null | undefined;
  collapsible?: boolean | null | undefined;
  expanded?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { thoughtChainItemVariants, thoughtChainVariants };
//# sourceMappingURL=thought-chain-variants.d.mts.map