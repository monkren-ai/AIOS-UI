import { cn } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Breadcrumb.css";
//#region src/Breadcrumb/Breadcrumb.tsx
const Breadcrumb = React.forwardRef(({ className, items, separator = "/", ...props }, ref) => /* @__PURE__ */ jsx("nav", {
	ref,
	className: cn("nothing-breadcrumb", className),
	"aria-label": "Breadcrumb",
	...props,
	children: /* @__PURE__ */ jsx("ol", {
		className: "nothing-breadcrumb__list",
		children: items.map((item, index) => {
			const isLast = index === items.length - 1;
			return /* @__PURE__ */ jsxs("li", {
				className: "nothing-breadcrumb__item",
				"aria-current": isLast ? "page" : void 0,
				children: [
					!isLast && item.href && /* @__PURE__ */ jsx("a", {
						className: "nothing-breadcrumb__link",
						href: item.href,
						onClick: item.onClick ? (e) => {
							e.preventDefault();
							item.onClick?.();
						} : void 0,
						children: item.label
					}),
					!isLast && !item.href && item.onClick && /* @__PURE__ */ jsx("button", {
						className: "nothing-breadcrumb__link",
						onClick: item.onClick,
						type: "button",
						children: item.label
					}),
					!isLast && !item.href && !item.onClick && /* @__PURE__ */ jsx("span", {
						className: "nothing-breadcrumb__link",
						children: item.label
					}),
					isLast && /* @__PURE__ */ jsx("span", {
						className: "nothing-breadcrumb__link nothing-breadcrumb__link--current",
						children: item.label
					}),
					!isLast && /* @__PURE__ */ jsx("span", {
						className: "nothing-breadcrumb__separator",
						"aria-hidden": "true",
						children: separator
					})
				]
			}, index);
		})
	})
}));
Breadcrumb.displayName = "Breadcrumb";
//#endregion
export { Breadcrumb as default };

//# sourceMappingURL=Breadcrumb.mjs.map