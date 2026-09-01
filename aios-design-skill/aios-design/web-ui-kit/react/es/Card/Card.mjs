import { cn, dataAttr } from "../lib/utils.mjs";
import { contentCardVariants, resolveCardShape, resolveCardSize, resolveCardVariant } from "./card-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Card/Card.tsx
function ContentCard({ variant, size, shape, interactive, disabled, title, action, onAction, onClick, footer, media, logo, feature, children, className, ...props }) {
	const resolvedVariant = resolveCardVariant(variant) ?? "soft";
	const resolvedSize = resolveCardSize(variant, size) ?? "md";
	const resolvedShape = resolveCardShape(variant, shape) ?? "rounded";
	const activate = (event) => {
		if (!disabled) onClick?.(event);
	};
	const keydown = (event) => {
		if (!disabled && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			onClick?.(event);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(contentCardVariants({
			variant: resolvedVariant,
			size: resolvedSize,
			shape: resolvedShape,
			interactive,
			disabled
		}), className),
		role: interactive ? "button" : void 0,
		tabIndex: interactive && !disabled ? 0 : void 0,
		onClick: interactive ? activate : void 0,
		onKeyDown: interactive ? keydown : void 0,
		"data-slot": "card",
		"data-variant": dataAttr(resolveCardVariant(variant) ?? "soft"),
		"data-size": dataAttr(resolveCardSize(variant, size) ?? "md"),
		"data-shape": dataAttr(resolveCardShape(variant, shape) ?? "rounded"),
		"data-interactive": dataAttr(interactive),
		"data-disabled": dataAttr(disabled),
		...props,
		children: [
			logo && /* @__PURE__ */ jsx("div", {
				"data-slot": "card-logo",
				className: "mb-2 inline-flex text-foreground-muted [&_svg]:size-6",
				children: logo
			}),
			(title || action || feature) && /* @__PURE__ */ jsxs("div", {
				"data-slot": "card-header",
				className: "mb-4 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [title && /* @__PURE__ */ jsx("div", {
						"data-slot": "card-title",
						className: "font-mono text-caption uppercase tracking-wider text-foreground-muted",
						children: title
					}), feature && /* @__PURE__ */ jsx("span", {
						"data-slot": "card-feature",
						className: "rounded-pill border border-border-visible px-2 py-0.5 font-mono text-micro uppercase tracking-wider text-foreground-muted",
						children: feature
					})]
				}), action && /* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "card-action",
					className: "cursor-pointer border-none bg-transparent p-0 font-mono text-label uppercase tracking-wider text-foreground-muted hover:text-foreground-display focus-visible:outline-2 focus-visible:outline-interactive",
					onClick: onAction,
					children: action
				})]
			}),
			media && /* @__PURE__ */ jsx("div", {
				"data-slot": "card-media",
				className: "mb-4 overflow-hidden rounded-md [&_img]:w-full",
				children: media
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "card-body",
				className: "text-foreground",
				children
			}),
			footer && /* @__PURE__ */ jsx("div", {
				"data-slot": "card-footer",
				className: "mt-4 flex items-center gap-2 border-t border-border pt-4",
				children: footer
			})
		]
	});
}
ContentCard.displayName = "ContentCard";
const Card = ContentCard;
Card.displayName = "Card";
//#endregion
export { ContentCard, Card as default };

//# sourceMappingURL=Card.mjs.map