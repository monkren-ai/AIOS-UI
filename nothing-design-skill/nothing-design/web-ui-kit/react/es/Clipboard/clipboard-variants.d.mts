//#region src/Clipboard/clipboard-variants.d.ts
/**
 * Clipboard 卡片容器。
 *
 * 层级只靠 surface + border 表达，没有阴影、没有 blur、没有渐变。
 */
declare const clipboardVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  state?: "idle" | "copied" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 头部一行：标题在前，计数在后。 */
declare const clipboardHeaderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const clipboardTitleVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const clipboardCountVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const clipboardListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 单条剪贴记录。整行可点，所以高度走 36 / 44 / 52 的触达基线。 */
declare const clipboardItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  copied?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const clipboardItemContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 文本行。复制成功时整行转成 success 色。 */
declare const clipboardTextVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const clipboardTimeVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** [COPIED] 标记。默认透明，靠 group-data 淡入。 */
declare const clipboardCopiedVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 删除按钮。 */
declare const clipboardDeleteVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 清空按钮。 */
declare const clipboardClearVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type ClipboardSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { ClipboardSize, clipboardClearVariants, clipboardCopiedVariants, clipboardCountVariants, clipboardDeleteVariants, clipboardHeaderVariants, clipboardItemContentVariants, clipboardItemVariants, clipboardListVariants, clipboardTextVariants, clipboardTimeVariants, clipboardTitleVariants, clipboardVariants };
//# sourceMappingURL=clipboard-variants.d.mts.map