//#region src/InputMessage/input-message-variants.d.ts
/** 聊天输入器外层：输入行 + 下方的提示/计数。 */
declare const inputMessageVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** textarea + 发送按钮的一行。 */
declare const inputMessageControlVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 自动增高的 textarea。高度由 JS 写在 style 上。 */
declare const inputMessageFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 发送按钮：实心反相。 */
declare const inputMessageSendVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const inputMessageSendIconVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 提示 + 计数一行，两端对齐。 */
declare const inputMessageMetaVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const inputMessageHintVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const inputMessageCountVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type InputMessageSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { InputMessageSize, inputMessageControlVariants, inputMessageCountVariants, inputMessageFieldVariants, inputMessageHintVariants, inputMessageMetaVariants, inputMessageSendIconVariants, inputMessageSendVariants, inputMessageVariants };
//# sourceMappingURL=input-message-variants.d.mts.map