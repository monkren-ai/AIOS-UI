import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
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
const Navigation = React.forwardRef(({ className, items, activeIndex: controlledIndex, variant = "default", showBack = false, onBack, onChange, syncWithUrl = true, scrollIntoView = false, ...props }, ref) => {
	const [internalIndex, setInternalIndex] = React.useState(0);
	const isControlled = controlledIndex !== void 0;
	const activeIdx = isControlled ? controlledIndex : internalIndex;
	const navRef = React.useRef(null);
	const itemRefs = React.useRef([]);
	const [indicatorStyle, setIndicatorStyle] = React.useState({
		left: 0,
		width: 0
	});
	const showIndicator = variant !== "bracket";
	React.useEffect(() => {
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
	React.useEffect(() => {
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
	const updateIndicator = React.useCallback(() => {
		if (!showIndicator) return;
		const nav = navRef.current;
		const btn = itemRefs.current[activeIdx];
		if (!nav || !btn) return;
		const navRect = nav.getBoundingClientRect();
		const btnRect = btn.getBoundingClientRect();
		setIndicatorStyle({
			left: btnRect.left - navRect.left,
			width: btnRect.width
		});
	}, [activeIdx, showIndicator]);
	React.useLayoutEffect(() => {
		updateIndicator();
	}, [updateIndicator]);
	React.useEffect(() => {
		if (typeof window === "undefined" || !showIndicator) return;
		window.addEventListener("resize", updateIndicator);
		return () => window.removeEventListener("resize", updateIndicator);
	}, [updateIndicator, showIndicator]);
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
		ref: React.useCallback((node) => {
			navRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref && "current" in ref) ref.current = node;
		}, [ref]),
		className: cn(navigationVariants({ variant }), showIndicator && "nothing-nav--has-indicator", className),
		"data-variant": dataAttr(variant),
		"data-active-index": dataAttr(activeIdx),
		"data-real": dataAttr(syncWithUrl && typeof window !== "undefined"),
		...props,
		children: [
			showBack && /* @__PURE__ */ jsx("button", {
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
			}),
			items.map((item, index) => /* @__PURE__ */ jsxs("span", {
				className: "nothing-nav__item-wrapper",
				children: [index > 0 && variant === "pipe" && /* @__PURE__ */ jsx("span", {
					className: "nothing-nav__separator",
					children: "|"
				}), /* @__PURE__ */ jsxs("button", {
					ref: (node) => {
						itemRefs.current[index] = node;
					},
					className: cn(navItemVariants({ active: index === activeIdx })),
					onClick: () => handleSelect(index),
					"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
					"data-slug": dataAttr(getItemSlug(item, index)),
					"aria-current": index === activeIdx ? "page" : void 0,
					children: [item.icon, item.label]
				})]
			}, index)),
			showIndicator && /* @__PURE__ */ jsx("span", {
				className: "nothing-nav__indicator",
				style: {
					left: indicatorStyle.left,
					width: indicatorStyle.width
				},
				"aria-hidden": "true"
			})
		]
	});
});
Navigation.displayName = "Navigation";
//#endregion
export { Navigation, Navigation as default, navItemVariants, navigationVariants };

//# sourceMappingURL=Navigation.mjs.map