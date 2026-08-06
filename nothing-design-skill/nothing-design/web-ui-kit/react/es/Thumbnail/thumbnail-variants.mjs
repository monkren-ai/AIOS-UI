import { cva } from "class-variance-authority";
//#region src/Thumbnail/thumbnail-variants.ts
/**
* Thumbnail 的视觉变体。
*
* 缩略图只关心尺寸、宽高比与圆角三个正交维度，不承载语义色。
* `size` 给的是高度（48 / 64 / 96px），宽度由 `ratio` 推出；
* `square` 下宽高相等，其余比例宽度按比例放大。
*/
const thumbnailVariants = cva([
	"inline-flex shrink-0 items-center justify-center overflow-hidden",
	"bg-surface border border-border-visible",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: {
		size: {
			sm: "h-12",
			md: "h-16",
			lg: "h-24"
		},
		ratio: {
			square: "aspect-square",
			"4:3": "aspect-[4/3]",
			"16:9": "aspect-[16/9]"
		},
		rounded: {
			card: "rounded-card",
			input: "rounded-input",
			none: "rounded-none"
		}
	},
	defaultVariants: {
		size: "md",
		ratio: "square",
		rounded: "card"
	}
});
//#endregion
export { thumbnailVariants };

//# sourceMappingURL=thumbnail-variants.mjs.map