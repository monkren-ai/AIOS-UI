import { cn, dataAttr } from "../lib/utils.mjs";
import Thumbnail from "../Thumbnail/Thumbnail.mjs";
import { previewCardBodyVariants, previewCardFooterVariants, previewCardMediaVariants, previewCardVariants } from "./preview-card-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/PreviewCard/PreviewCard.tsx
/**
* 媒体预览卡。
*
* 顶部是一张贴边铺满的 `Thumbnail`（图片加载失败会回退到点阵占位），
* 下方是 meta / title / description 的元信息组，可选页脚。卡片本身不依赖
* Base UI 的浮动 PreviewCard 原语——那是 hover 弹层，与本组件「静态内容卡」
* 的语义不同，所以这里用 Card 的视觉语言 + Thumbnail 自实现。
*/
function PreviewCard({ className, title, description, meta, image, imageAlt, footer, size, variant, children, ...props }) {
	const resolvedVariant = variant ?? "default";
	const resolvedSize = size ?? "md";
	const compact = resolvedVariant === "compact";
	return /* @__PURE__ */ jsxs("div", {
		className: cn(previewCardVariants({ variant: resolvedVariant }), className),
		"data-slot": "preview-card",
		"data-variant": dataAttr(resolvedVariant),
		"data-size": dataAttr(resolvedSize),
		...props,
		children: [
			image !== void 0 && /* @__PURE__ */ jsx("div", {
				"data-slot": "preview-card-media",
				className: previewCardMediaVariants({
					size: resolvedSize,
					compact
				}),
				children: /* @__PURE__ */ jsx(Thumbnail, {
					src: image,
					alt: imageAlt ?? "",
					rounded: "none",
					className: "size-full rounded-none border-0"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "preview-card-body",
				className: previewCardBodyVariants({
					size: resolvedSize,
					compact
				}),
				children: [
					meta && /* @__PURE__ */ jsx("div", {
						"data-slot": "preview-card-meta",
						className: "font-mono text-micro uppercase tracking-wider text-foreground-muted",
						children: meta
					}),
					title && /* @__PURE__ */ jsx("div", {
						"data-slot": "preview-card-title",
						className: "font-mono text-sm text-foreground-display",
						children: title
					}),
					description && /* @__PURE__ */ jsx("div", {
						"data-slot": "preview-card-description",
						className: "text-xs text-foreground-muted",
						children: description
					}),
					children
				]
			}),
			footer && /* @__PURE__ */ jsx("div", {
				"data-slot": "preview-card-footer",
				className: previewCardFooterVariants({
					size: resolvedSize,
					compact
				}),
				children: footer
			})
		]
	});
}
PreviewCard.displayName = "PreviewCard";
//#endregion
export { PreviewCard as default };

//# sourceMappingURL=PreviewCard.mjs.map