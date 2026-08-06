//#region src/ScrollArea/scroll-area-variants.d.ts
/** ScrollArea 外框。`group` 让滚动条能跟随整体 hover 淡入。 */
declare const scrollAreaVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 真正滚动的视口。原生滚动条被隐藏，改由自绘的 thumb 表达位置。 */
declare const scrollAreaViewportVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 自绘滚动条轨道。
 *
 * 贴在行末侧（`end-0`），RTL 下自动挪到左边。
 */
declare const scrollAreaScrollbarVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 滚动条滑块。 */
declare const scrollAreaThumbVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { scrollAreaScrollbarVariants, scrollAreaThumbVariants, scrollAreaVariants, scrollAreaViewportVariants };
//# sourceMappingURL=scroll-area-variants.d.mts.map