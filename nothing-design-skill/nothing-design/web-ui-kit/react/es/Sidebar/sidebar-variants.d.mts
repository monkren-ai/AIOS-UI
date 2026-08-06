//#region src/Sidebar/sidebar-variants.d.ts
/**
 * Sidebar 的视觉变体。
 *
 * 侧栏停靠在行首（inline-start），所以分隔边用 `border-e` 而不是
 * `border-right`——RTL 下它会自动跑到左侧，跟内容区的相对关系不变。
 *
 * v1 引用的 `--sidebar-bg` / `--sidebar-fg` / `--sidebar-border` /
 * `--sidebar-accent-bg` 四个变量在 tokens.css 里从来没有定义过，侧栏因此一直
 * 是透明无边框的。这里改用语义令牌（surface / border / foreground / muted），
 * 视觉上是「修好了」而不是「照搬」。
 */
declare const sidebarVariants: (props?: ({
  collapsed?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 列表项容器。 */
declare const sidebarItemVariants: (props?: ({
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { sidebarItemVariants, sidebarVariants };
//# sourceMappingURL=sidebar-variants.d.mts.map