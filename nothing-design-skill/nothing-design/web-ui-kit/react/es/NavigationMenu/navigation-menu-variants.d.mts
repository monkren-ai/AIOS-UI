//#region src/NavigationMenu/navigation-menu-variants.d.ts
/** NavigationMenu 根导航。 */
declare const navigationMenuVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** menubar / menu 列表。 */
declare const navigationMenuListVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 顶层条目，作为 submenu 的定位锚点。 */
declare const navigationMenuItemVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 顶层链接。 */
declare const navigationMenuLinkVariants: (props?: ({
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 「有子菜单」的三角标记。
 *
 * 旧实现用 `::after` + border 拼三角形，这里换成显式元素，
 * 间距走 `ms-*` 让 RTL 自动落到文字的末端。
 */
declare const navigationMenuCaretVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 下拉子菜单。
 *
 * 收起时保留在 DOM 里（`invisible` + `opacity-0`）以便做淡入淡出，
 * 展开由根元素上的 `data-open` 驱动 `open:` 变体。
 */
declare const navigationMenuSubmenuVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 子菜单里的一行。 */
declare const navigationMenuSubmenuItemVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 子菜单链接。 */
declare const navigationMenuSubmenuLinkVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { navigationMenuCaretVariants, navigationMenuItemVariants, navigationMenuLinkVariants, navigationMenuListVariants, navigationMenuSubmenuItemVariants, navigationMenuSubmenuLinkVariants, navigationMenuSubmenuVariants, navigationMenuVariants };
//# sourceMappingURL=navigation-menu-variants.d.mts.map