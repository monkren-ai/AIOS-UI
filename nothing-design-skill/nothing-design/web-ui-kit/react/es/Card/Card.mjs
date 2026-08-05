import { cn, dataAttr } from "../lib/utils.mjs";
import { contentCardVariants, resolveCardShape, resolveCardSize, resolveCardVariant, resolveWidgetCardDensity, resolveWidgetCardSize, widgetCardSubtitleVariants, widgetCardTitleVariants, widgetCardValueVariants, widgetCardVariants } from "./card-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Card/Card.tsx
function ContentCard({ variant, size, shape, interactive, disabled, title, action, onAction, onClick, footer, media, logo, feature, children, className, ...props }) {
	const resolvedVariant = resolveCardVariant(variant) ?? "soft";
	const resolvedSize = resolveCardSize(variant, size) ?? "md";
	const resolvedShape = resolveCardShape(variant, shape) ?? "rounded";
	const handleClick = (e) => {
		if (disabled) return;
		onClick?.(e);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick?.(e);
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
		onClick: interactive ? handleClick : void 0,
		onKeyDown: interactive ? handleKeyDown : void 0,
		"data-slot": "card",
		"data-variant": dataAttr(resolveCardVariant(variant) ?? "soft"),
		"data-size": dataAttr(resolveCardSize(variant, size) ?? "md"),
		"data-shape": dataAttr(resolveCardShape(variant, shape) ?? "rounded"),
		"data-interactive": dataAttr(interactive),
		"data-disabled": dataAttr(disabled),
		"data-state": dataAttr(disabled ? "disabled" : interactive ? "interactive" : "default"),
		...props,
		children: [
			logo && /* @__PURE__ */ jsx("div", {
				"data-slot": "card-logo",
				className: "mb-2 inline-flex items-center justify-center text-foreground-muted [&_svg]:size-6",
				children: logo
			}),
			(title || action || feature) && /* @__PURE__ */ jsxs("div", {
				"data-slot": "card-header",
				className: "mb-4 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					"data-slot": "card-header-main",
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
					className: cn("cursor-pointer border-none bg-transparent p-0", "font-mono text-label uppercase tracking-wider text-foreground-muted", "transition-colors duration-200 ease-nothing motion-reduce:transition-none", "hover:text-foreground-display", "outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"),
					onClick: onAction,
					children: action
				})]
			}),
			media && /* @__PURE__ */ jsx("div", {
				"data-slot": "card-media",
				className: "mb-4 overflow-hidden rounded-md [&_img]:block [&_img]:h-auto [&_img]:w-full [&_video]:block [&_video]:h-auto [&_video]:w-full",
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
function WidgetCard({ size, shape = "rounded", theme = "dark", variant, title, value, subtitle, icon, iconPosition = "top", align = "center", className, children, onClick, ...props }) {
	const hasChildren = Boolean(children);
	const hasOwnContent = title || value !== void 0 || subtitle || icon;
	const resolvedSize = resolveWidgetCardSize(size) ?? "square";
	const density = resolveWidgetCardDensity(variant) ?? "default";
	const handleKeyDown = (e) => {
		if (onClick && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			onClick();
		}
	};
	const alignItems = align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";
	const renderOwnContent = () => {
		if (!hasOwnContent) return null;
		const content = value !== void 0 ? /* @__PURE__ */ jsx("div", {
			"data-slot": "widget-card-value",
			className: widgetCardValueVariants({
				theme,
				density
			}),
			children: value
		}) : null;
		if (!icon) return content;
		const iconEl = /* @__PURE__ */ jsx("div", {
			"data-slot": "widget-card-icon",
			className: "flex shrink-0 items-center justify-center",
			children: icon
		});
		const textEl = /* @__PURE__ */ jsx("div", {
			"data-slot": "widget-card-text",
			className: "flex flex-1 flex-col gap-1",
			children: content
		});
		switch (iconPosition) {
			case "left": return /* @__PURE__ */ jsxs("div", {
				"data-slot": "widget-card-row",
				className: cn("flex flex-row gap-2", alignItems),
				children: [iconEl, textEl]
			});
			case "right": return /* @__PURE__ */ jsxs("div", {
				"data-slot": "widget-card-row",
				className: cn("flex flex-row gap-2", alignItems),
				children: [textEl, iconEl]
			});
			case "bottom": return /* @__PURE__ */ jsxs("div", {
				"data-slot": "widget-card-column",
				className: cn("flex flex-col gap-2", alignItems),
				children: [content, iconEl]
			});
			default: return /* @__PURE__ */ jsxs("div", {
				"data-slot": "widget-card-column",
				className: cn("flex flex-col gap-2", alignItems),
				children: [iconEl, content]
			});
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(widgetCardVariants({
			size: resolvedSize,
			shape,
			theme,
			density,
			align,
			clickable: Boolean(onClick),
			hasChildren
		}), className),
		onClick,
		role: onClick ? "button" : void 0,
		tabIndex: onClick ? 0 : void 0,
		onKeyDown: onClick ? handleKeyDown : void 0,
		"data-slot": "widget-card",
		"data-size": dataAttr(resolveWidgetCardSize(size) ?? "square"),
		"data-shape": dataAttr(shape),
		"data-widget-theme": dataAttr(theme),
		"data-variant": dataAttr(density),
		"data-align": dataAttr(align),
		"data-has-children": dataAttr(hasChildren),
		...props,
		children: [
			title && /* @__PURE__ */ jsx("div", {
				"data-slot": "widget-card-title",
				className: widgetCardTitleVariants({ theme }),
				children: title
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "widget-card-content",
				className: cn("flex min-h-0 grow flex-col justify-center", hasChildren && "justify-stretch p-0 [&>*]:size-full [&>*]:rounded-[inherit] [&>*:first-child]:grow"),
				children: [renderOwnContent(), children]
			}),
			subtitle && /* @__PURE__ */ jsx("div", {
				"data-slot": "widget-card-subtitle",
				className: widgetCardSubtitleVariants({ theme }),
				children: subtitle
			})
		]
	});
}
WidgetCard.displayName = "WidgetCard";
function Card(props) {
	if (props.mode === "widget") {
		const { mode: _mode, ...rest } = props;
		return /* @__PURE__ */ jsx(WidgetCard, { ...rest });
	}
	const { mode: _mode, ...rest } = props;
	return /* @__PURE__ */ jsx(ContentCard, { ...rest });
}
Card.displayName = "Card";
//#endregion
export { ContentCard, WidgetCard, Card as default };

//# sourceMappingURL=Card.mjs.map