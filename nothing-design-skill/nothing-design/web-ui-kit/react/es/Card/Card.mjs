import { cn, dataAttr } from "../lib/utils.mjs";
import "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Card.css";
//#region src/Card/Card.tsx
const contentCardVariants = cva("nothing-card", {
	variants: {
		variant: {
			default: "",
			raised: "nothing-card--raised",
			compact: "nothing-card--compact",
			technical: "nothing-card--technical"
		},
		interactive: {
			true: "nothing-card--interactive",
			false: ""
		},
		disabled: {
			true: "nothing-card--disabled",
			false: ""
		}
	},
	defaultVariants: {
		variant: "default",
		interactive: false,
		disabled: false
	}
});
const widgetCardVariants = cva("nothing-widget-card", {
	variants: {
		size: {
			square: "nothing-widget-card--square",
			wide: "nothing-widget-card--wide",
			tall: "nothing-widget-card--tall",
			auto: "nothing-widget-card--auto"
		},
		shape: {
			rounded: "nothing-widget-card--rounded",
			pill: "nothing-widget-card--pill",
			circle: "nothing-widget-card--circle"
		},
		theme: {
			light: "nothing-widget-card--light",
			dark: "nothing-widget-card--dark",
			accent: "nothing-widget-card--accent"
		},
		variant: {
			default: "",
			compact: "nothing-widget-card--compact"
		},
		align: {
			left: "nothing-widget-card--align-left",
			center: "nothing-widget-card--align-center",
			right: "nothing-widget-card--align-right"
		},
		iconPosition: {
			top: "nothing-widget-card--icon-top",
			left: "nothing-widget-card--icon-left",
			right: "nothing-widget-card--icon-right",
			bottom: "nothing-widget-card--icon-bottom"
		}
	},
	defaultVariants: {
		size: "square",
		shape: "rounded",
		theme: "dark",
		variant: "default",
		align: "center",
		iconPosition: "top"
	}
});
const ContentCard = ({ variant, interactive, disabled, title, action, onAction, onClick, footer, children, className, style, ...props }) => {
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
			variant,
			interactive,
			disabled
		}), className),
		role: interactive ? "button" : void 0,
		tabIndex: interactive && !disabled ? 0 : void 0,
		onClick: interactive ? handleClick : void 0,
		onKeyDown: interactive ? handleKeyDown : void 0,
		style,
		"data-variant": dataAttr(variant),
		"data-state": dataAttr(disabled ? "disabled" : interactive ? "interactive" : "default"),
		...props,
		children: [
			(title || action) && /* @__PURE__ */ jsxs("div", {
				className: "nothing-card__header",
				children: [title && /* @__PURE__ */ jsx("div", {
					className: "nothing-card__title",
					children: title
				}), action && /* @__PURE__ */ jsx("button", {
					className: "nothing-card__action",
					onClick: onAction,
					children: action
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-card__body",
				children
			}),
			footer && /* @__PURE__ */ jsx("div", {
				className: "nothing-card__footer",
				children: footer
			})
		]
	});
};
const WidgetCardRenderer = ({ size, shape, theme, variant, title, value, subtitle, icon, iconPosition, align, className, children, onClick, ...props }) => {
	const hasChildren = Boolean(children);
	const hasOwnContent = title || value !== void 0 || subtitle || icon;
	const handleKeyDown = (e) => {
		if (onClick && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			onClick();
		}
	};
	const renderOwnContent = () => {
		if (!hasOwnContent) return null;
		const content = /* @__PURE__ */ jsx(Fragment, { children: value !== void 0 && /* @__PURE__ */ jsx("div", {
			className: "nothing-widget-card__value",
			children: value
		}) });
		if (!icon) return content;
		switch (iconPosition) {
			case "left": return /* @__PURE__ */ jsxs("div", {
				className: "nothing-widget-card__row",
				children: [/* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__icon",
					children: icon
				}), /* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__text-content",
					children: content
				})]
			});
			case "right": return /* @__PURE__ */ jsxs("div", {
				className: "nothing-widget-card__row",
				children: [/* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__text-content",
					children: content
				}), /* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__icon",
					children: icon
				})]
			});
			case "bottom": return /* @__PURE__ */ jsxs("div", {
				className: "nothing-widget-card__column",
				children: [content, /* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__icon",
					children: icon
				})]
			});
			default: return /* @__PURE__ */ jsxs("div", {
				className: "nothing-widget-card__column",
				children: [/* @__PURE__ */ jsx("div", {
					className: "nothing-widget-card__icon",
					children: icon
				}), content]
			});
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(widgetCardVariants({
			size,
			shape,
			theme,
			variant,
			align,
			iconPosition
		}), hasChildren && "nothing-widget-card--has-children", onClick && "nothing-widget-card--clickable", className),
		onClick,
		role: onClick ? "button" : void 0,
		tabIndex: onClick ? 0 : void 0,
		onKeyDown: onClick ? handleKeyDown : void 0,
		"data-size": dataAttr(size),
		"data-shape": dataAttr(shape),
		"data-theme": dataAttr(theme),
		"data-variant": dataAttr(variant),
		...props,
		children: [
			title && /* @__PURE__ */ jsx("div", {
				className: "nothing-widget-card__title",
				children: title
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-widget-card__content",
				children: [renderOwnContent(), children]
			}),
			subtitle && /* @__PURE__ */ jsx("div", {
				className: "nothing-widget-card__subtitle",
				children: subtitle
			})
		]
	});
};
const Card = (props) => {
	if (props.mode === "widget") {
		const { mode: _mode, ...rest } = props;
		return /* @__PURE__ */ jsx(WidgetCardRenderer, { ...rest });
	}
	const { mode: _mode, ...rest } = props;
	return /* @__PURE__ */ jsx(ContentCard, { ...rest });
};
//#endregion
export { Card, Card as default, WidgetCardRenderer as WidgetCard, contentCardVariants, widgetCardVariants };

//# sourceMappingURL=Card.mjs.map