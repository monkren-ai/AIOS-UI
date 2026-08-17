//#region src/conversation/Conversations/conversations-variants.d.ts
declare const conversationsVariants: (props?: ({
  variant?: "default" | "bordered" | "filled" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const conversationsItemVariants: (props?: ({
  active?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { conversationsItemVariants, conversationsVariants };
//# sourceMappingURL=conversations-variants.d.mts.map