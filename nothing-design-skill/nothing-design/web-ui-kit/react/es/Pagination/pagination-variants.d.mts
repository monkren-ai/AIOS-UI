//#region src/Pagination/pagination-variants.d.ts
/** Pagination 根导航。等宽字，尺寸随字号走。 */
declare const paginationVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 页码列表。 */
declare const paginationListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 单个列表项。 */
declare const paginationItemVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 页码 / 翻页按钮。 */
declare const paginationButtonVariants: (props?: ({
  active?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 省略号占位，宽高与按钮对齐。 */
declare const paginationEllipsisVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 上/下一页的箭头字形。
 *
 * `‹` / `›` 是普通字符，不会跟随书写方向翻转，
 * 所以 RTL 下手动做一次水平镜像。
 */
declare const paginationArrowVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { paginationArrowVariants, paginationButtonVariants, paginationEllipsisVariants, paginationItemVariants, paginationListVariants, paginationVariants };
//# sourceMappingURL=pagination-variants.d.mts.map