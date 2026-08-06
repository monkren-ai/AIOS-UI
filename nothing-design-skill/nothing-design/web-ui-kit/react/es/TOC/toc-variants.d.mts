//#region src/TOC/toc-variants.d.ts
declare const tocVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 单条目录项。
 *
 * 当前节用一条 2px 左条（`--border-width-accent`）高亮，与 DataTable active 行
 * 同一套语言：左条贴着导航容器边缘，文字按 `level` 缩进，所以多级标题的层级
 * 靠缩进表达，而高亮始终对齐在同一根线上。
 */
declare const tocItemVariants: (props?: ({
  level?: "1" | "2" | "3" | null | undefined;
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type TocItemLevel = '1' | '2' | '3';
//#endregion
export { TocItemLevel, tocItemVariants, tocVariants };
//# sourceMappingURL=toc-variants.d.mts.map