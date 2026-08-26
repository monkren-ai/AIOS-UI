//#region src/agent/ContextBar/context-bar-variants.d.ts
declare const contextBarVariants: (props?: ({
  position?: "footer" | "header" | "detached" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const contextBarLabelVariants: (props?: ({
  status?: "error" | "default" | "loading" | "done" | "progress" | "waiting" | "queue" | null | undefined;
  muted?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { contextBarLabelVariants, contextBarVariants };
//# sourceMappingURL=context-bar-variants.d.mts.map