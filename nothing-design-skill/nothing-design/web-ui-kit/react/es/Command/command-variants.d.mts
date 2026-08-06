//#region src/Command/command-variants.d.ts
/** 命令面板容器。 */
declare const commandVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 搜索框。
 *
 * 旧 CSS 的聚焦态是 `box-shadow: inset ...`；阴影在 v2 被禁掉了，
 * 换成向内偏移的 outline，视觉等价但不引入阴影。
 */
declare const commandInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const commandListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const commandGroupVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const commandGroupHeadingVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 单条命令。行高走 36 / 44 / 52 的触达基线。 */
declare const commandItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  selected?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const commandItemIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const commandItemLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 快捷键提示。靠 flex 排在末尾，RTL 下自动跑到另一侧。 */
declare const commandItemShortcutVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const commandEmptyVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type CommandSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { CommandSize, commandEmptyVariants, commandGroupHeadingVariants, commandGroupVariants, commandInputVariants, commandItemIconVariants, commandItemLabelVariants, commandItemShortcutVariants, commandItemVariants, commandListVariants, commandVariants };
//# sourceMappingURL=command-variants.d.mts.map