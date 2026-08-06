//#region src/PhotoCarousel/photo-carousel-variants.d.ts
/**
 * PhotoCarousel 的视觉变体。
 *
 * 轮播的「前进方向」跟着书写方向走：上一张/下一张按钮在 flex 行里靠 RTL
 * 自动换位，箭头本身用 `rtl:-scale-x-100` 翻面，计数器用 `text-end` 贴行尾。
 */
declare const photoCarouselVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
  autoplay?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type PhotoCarouselOrientation = 'horizontal' | 'vertical';
//#endregion
export { PhotoCarouselOrientation, photoCarouselVariants };
//# sourceMappingURL=photo-carousel-variants.d.mts.map