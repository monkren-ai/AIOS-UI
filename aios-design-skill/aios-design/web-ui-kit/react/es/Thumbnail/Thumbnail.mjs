import { cn, dataAttr } from "../lib/utils.mjs";
import { thumbnailVariants } from "./thumbnail-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Thumbnail/Thumbnail.tsx
/**
* 点阵占位。
*
* 用 SVG `<pattern>` 画一个 4×4 的点阵，比一整块灰色更克制，也避免了
* 「图片没加载出来」的错觉。`useId` 保证多实例同时渲染时 pattern id 不冲突。
*/
function DotMatrix() {
	const patternId = `thumbnail-dots-${React$1.useId().replace(/:/g, "")}`;
	return /* @__PURE__ */ jsxs("svg", {
		"data-slot": "thumbnail-dots",
		"aria-hidden": "true",
		className: "size-full text-foreground-muted opacity-60 motion-reduce:opacity-70",
		viewBox: "0 0 16 16",
		preserveAspectRatio: "xMidYMid slice",
		children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", {
			id: patternId,
			width: "4",
			height: "4",
			patternUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ jsx("circle", {
				cx: "1",
				cy: "1",
				r: "0.8",
				fill: "currentColor"
			})
		}) }), /* @__PURE__ */ jsx("rect", {
			width: "16",
			height: "16",
			fill: `url(#${patternId})`
		})]
	});
}
function Thumbnail({ className, src, alt = "", fallback, size, rounded, ratio, ...props }) {
	const [imageError, setImageError] = React$1.useState(false);
	React$1.useEffect(() => {
		setImageError(false);
	}, [src]);
	const showImage = Boolean(src) && !imageError;
	const inner = showImage ? /* @__PURE__ */ jsx("img", {
		"data-slot": "thumbnail-img",
		className: "block size-full rounded-[inherit] object-cover",
		src,
		alt,
		onError: () => setImageError(true)
	}) : /* @__PURE__ */ jsx("span", {
		"data-slot": "thumbnail-fallback",
		className: "flex size-full items-center justify-center",
		"aria-label": alt || void 0,
		children: fallback ?? /* @__PURE__ */ jsx(DotMatrix, {})
	});
	return /* @__PURE__ */ jsx("div", {
		className: cn(thumbnailVariants({
			size,
			ratio,
			rounded
		}), className),
		"data-slot": "thumbnail",
		"data-size": dataAttr(size ?? "md"),
		"data-rounded": dataAttr(rounded ?? "card"),
		"data-state": showImage ? "image" : "fallback",
		...props,
		children: inner
	});
}
Thumbnail.displayName = "Thumbnail";
//#endregion
export { Thumbnail as default };

//# sourceMappingURL=Thumbnail.mjs.map