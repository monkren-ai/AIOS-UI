import { cn, dataAttr } from "../lib/utils.mjs";
import { breadcrumbLinkVariants, breadcrumbVariants } from "./breadcrumb-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Breadcrumb/Breadcrumb.tsx
function Breadcrumb({ className, items, size = "md", separator = "/", ...props }) {
	return /* @__PURE__ */ jsx("nav", {
		className: cn(breadcrumbVariants({ size }), className),
		"data-slot": "breadcrumb",
		"data-size": dataAttr(size),
		"aria-label": "Breadcrumb",
		...props,
		children: /* @__PURE__ */ jsx("ol", {
			"data-slot": "breadcrumb-list",
			className: "m-0 flex list-none flex-wrap items-center gap-0 p-0",
			children: items.map((item, index) => {
				const isLast = index === items.length - 1;
				return /* @__PURE__ */ jsxs("li", {
					"data-slot": "breadcrumb-item",
					"data-current": dataAttr(isLast),
					className: "inline-flex items-center gap-1",
					"aria-current": isLast ? "page" : void 0,
					children: [
						!isLast && item.href && /* @__PURE__ */ jsx("a", {
							"data-slot": "breadcrumb-link",
							className: breadcrumbLinkVariants({ current: false }),
							href: item.href,
							onClick: item.onClick ? (e) => {
								e.preventDefault();
								item.onClick?.();
							} : void 0,
							children: item.label
						}),
						!isLast && !item.href && item.onClick && /* @__PURE__ */ jsx("button", {
							"data-slot": "breadcrumb-link",
							className: breadcrumbLinkVariants({ current: false }),
							onClick: item.onClick,
							type: "button",
							children: item.label
						}),
						!isLast && !item.href && !item.onClick && /* @__PURE__ */ jsx("span", {
							"data-slot": "breadcrumb-link",
							className: breadcrumbLinkVariants({ current: false }),
							children: item.label
						}),
						isLast && /* @__PURE__ */ jsx("span", {
							"data-slot": "breadcrumb-link",
							className: breadcrumbLinkVariants({ current: true }),
							children: item.label
						}),
						!isLast && /* @__PURE__ */ jsx("span", {
							"data-slot": "breadcrumb-separator",
							className: "mx-1 select-none text-foreground-disabled",
							"aria-hidden": "true",
							children: separator
						})
					]
				}, index);
			})
		})
	});
}
Breadcrumb.displayName = "Breadcrumb";
//#endregion
export { Breadcrumb as default };

//# sourceMappingURL=Breadcrumb.mjs.map