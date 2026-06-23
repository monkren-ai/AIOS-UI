import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Navigation.css";
//#region src/Navigation/Navigation.tsx
const navigationVariants = cva("nothing-nav", {
	variants: { variant: {
		default: "",
		bracket: "nothing-nav--bracket",
		pipe: "nothing-nav--pipe"
	} },
	defaultVariants: { variant: "default" }
});
const navItemVariants = cva("nothing-nav__item", {
	variants: { active: {
		true: "nothing-nav__item--active",
		false: ""
	} },
	defaultVariants: { active: false }
});
function getItemSlug(item, idx) {
	if (item.slug) return item.slug;
	return item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${idx}`;
}
const Navigation = React$1.forwardRef(({ className, items, activeIndex: controlledIndex, variant = "default", showBack = false, onBack, onChange, syncWithUrl = true, scrollIntoView = false, ...props }, ref) => {
	const [internalIndex, setInternalIndex] = React$1.useState(0);
	const isControlled = controlledIndex !== void 0;
	const activeIdx = isControlled ? controlledIndex : internalIndex;
	React$1.useEffect(() => {
		if (!syncWithUrl || isControlled || typeof window === "undefined") return;
		const hash = window.location.hash.replace(/^#/, "").toLowerCase();
		if (!hash) return;
		const idx = items.findIndex((it, i) => getItemSlug(it, i).toLowerCase() === hash);
		if (idx >= 0) {
			setInternalIndex(idx);
			onChange?.(idx);
		}
	}, [
		syncWithUrl,
		isControlled,
		items.length
	]);
	React$1.useEffect(() => {
		if (!syncWithUrl || isControlled || typeof window === "undefined") return;
		const onHashChange = () => {
			const hash = window.location.hash.replace(/^#/, "").toLowerCase();
			const idx = items.findIndex((it, i) => getItemSlug(it, i).toLowerCase() === hash);
			if (idx >= 0) {
				setInternalIndex(idx);
				onChange?.(idx);
			}
		};
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, [
		syncWithUrl,
		isControlled,
		items.length
	]);
	const handleSelect = (index) => {
		if (!isControlled) setInternalIndex(index);
		onChange?.(index);
		if (syncWithUrl && typeof window !== "undefined") {
			const slug = getItemSlug(items[index], index);
			const newHash = `#${slug}`;
			if (window.location.hash !== newHash) window.history.replaceState(null, "", newHash);
			if (scrollIntoView) {
				const target = document.getElementById(slug);
				if (target) target.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			}
		}
	};
	return /* @__PURE__ */ jsxs("nav", {
		ref,
		className: cn(navigationVariants({ variant }), className),
		"data-variant": dataAttr(variant),
		"data-active-index": dataAttr(activeIdx),
		"data-real": dataAttr(syncWithUrl && typeof window !== "undefined"),
		...props,
		children: [showBack && /* @__PURE__ */ jsx("button", {
			className: "nothing-nav__back",
			onClick: onBack,
			"aria-label": "Go back",
			children: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("path", {
					d: "M15 18l-6-6 6-6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		}), items.map((item, index) => /* @__PURE__ */ jsxs("span", {
			className: "nothing-nav__item-wrapper",
			children: [index > 0 && variant === "pipe" && /* @__PURE__ */ jsx("span", {
				className: "nothing-nav__separator",
				children: "|"
			}), /* @__PURE__ */ jsxs("button", {
				className: cn(navItemVariants({ active: index === activeIdx })),
				onClick: () => handleSelect(index),
				"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
				"data-slug": dataAttr(getItemSlug(item, index)),
				children: [item.icon, item.label]
			})]
		}, index))]
	});
});
Navigation.displayName = "Navigation";
//#endregion
export { Navigation as default, navItemVariants, navigationVariants };

//# sourceMappingURL=Navigation.mjs.map