//#region src/agent/Reasoning/reasoning-variants.d.ts
declare const reasoningVariants: (props?: ({
  container?: boolean | null | undefined;
  status?: "error" | "running" | "finished" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const reasoningGroupVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { reasoningGroupVariants, reasoningVariants };
//# sourceMappingURL=reasoning-variants.d.mts.map