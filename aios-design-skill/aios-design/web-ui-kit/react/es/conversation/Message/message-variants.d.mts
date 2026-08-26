//#region src/conversation/Message/message-variants.d.ts
declare const messageVariants: (props?: ({
  role?: "system" | "assistant" | "user" | null | undefined;
  variant?: "plain" | "surface" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { messageVariants };
//# sourceMappingURL=message-variants.d.mts.map