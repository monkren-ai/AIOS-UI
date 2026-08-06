//#region src/ContextMenu/context-menu-variants.d.ts
declare const contextMenuVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const contextMenuTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 右键菜单本体。
 *
 * 位置来自 `clientX/clientY`（视口物理坐标），所以 `top/left` 仍由内联 style
 * 下发；这里只负责视觉与显隐过渡。
 */
declare const contextMenuContentVariants: (props?: ({
  visible?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const contextMenuItemVariants: (props?: ({
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const contextMenuItemLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const contextMenuItemShortcutVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const contextMenuSeparatorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { contextMenuContentVariants, contextMenuItemLabelVariants, contextMenuItemShortcutVariants, contextMenuItemVariants, contextMenuSeparatorVariants, contextMenuTriggerVariants, contextMenuVariants };
//# sourceMappingURL=context-menu-variants.d.mts.map