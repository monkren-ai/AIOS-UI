//#region src/Thumbnail/thumbnail-variants.d.ts
/**
 * Thumbnail 的视觉变体。
 *
 * 缩略图只关心尺寸、宽高比与圆角三个正交维度，不承载语义色。
 * `size` 给的是高度（48 / 64 / 96px），宽度由 `ratio` 推出；
 * `square` 下宽高相等，其余比例宽度按比例放大。
 */
declare const thumbnailVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  ratio?: "square" | "4:3" | "16:9" | null | undefined;
  rounded?: "none" | "card" | "input" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ThumbnailSize = 'sm' | 'md' | 'lg';
type ThumbnailRatio = 'square' | '4:3' | '16:9';
type ThumbnailRounded = 'card' | 'input' | 'none';
//#endregion
export { ThumbnailRatio, ThumbnailRounded, ThumbnailSize, thumbnailVariants };
//# sourceMappingURL=thumbnail-variants.d.mts.map