import { cva } from "class-variance-authority";
//#region src/ScrollArea/scroll-area-variants.ts
/** ScrollArea 外框。`group` 让滚动条能跟随整体 hover 淡入。 */
const scrollAreaVariants = cva("group relative overflow-hidden");
/** 真正滚动的视口。原生滚动条被隐藏，改由自绘的 thumb 表达位置。 */
const scrollAreaViewportVariants = cva([
	"h-full overflow-auto scroll-smooth motion-reduce:scroll-auto",
	"[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
]);
/**
* 自绘滚动条轨道。
*
* 贴在行末侧（`end-0`），RTL 下自动挪到左边。
*/
const scrollAreaScrollbarVariants = cva([
	"group/scrollbar absolute inset-y-0 end-0 w-2 bg-transparent",
	"opacity-0 group-hover:opacity-100 group-data-dragging:opacity-100",
	"transition-opacity duration-200 ease-aios motion-reduce:transition-none"
]);
/** 滚动条滑块。 */
const scrollAreaThumbVariants = cva([
	"absolute end-0.5 w-1 cursor-pointer rounded-pill bg-foreground-disabled",
	"hover:bg-foreground-muted group-hover/scrollbar:bg-foreground-muted",
	"transition-[background-color] duration-200 ease-aios motion-reduce:transition-none"
]);
//#endregion
export { scrollAreaScrollbarVariants, scrollAreaThumbVariants, scrollAreaVariants, scrollAreaViewportVariants };

//# sourceMappingURL=scroll-area-variants.mjs.map