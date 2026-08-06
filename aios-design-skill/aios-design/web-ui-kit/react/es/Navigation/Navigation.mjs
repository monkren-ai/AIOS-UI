import { useDirection } from "../DirectionProvider/DirectionProvider.mjs";
import { cn, dataAttr } from "../lib/utils.mjs";
import { navBackVariants, navIndicatorVariants, navItemVariants, navItemWrapperVariants, navSeparatorVariants, navigationVariants } from "./navigation-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Navigation/Navigation.tsx
function getItemSlug(item, idx) {
	if (item.slug) return item.slug;
	return item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${idx}`;
}
function Navigation({ className, items, activeIndex: controlledIndex, variant = "default", showBack = false, onBack, onChange, syncWithUrl = true, scrollIntoView = false, ref, ...props }) {
	const [internalIndex, setInternalIndex] = React$1.useState(0);
	const isControlled = controlledIndex !== void 0;
	const activeIdx = isControlled ? controlledIndex : internalIndex;
	const navRef = React$1.useRef(null);
	const itemRefs = React$1.useRef([]);
	const [indicatorStyle, setIndicatorStyle] = React$1.useState({
		start: 0,
		width: 0
	});
	const showIndicator = variant !== "bracket";
	const { dir } = useDirection();
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
	const updateIndicator = React$1.useCallback(() => {
		if (!showIndicator) return;
		const nav = navRef.current;
		const btn = itemRefs.current[activeIdx];
		if (!nav || !btn) return;
		const navRect = nav.getBoundingClientRect();
		const btnRect = btn.getBoundingClientRect();
		setIndicatorStyle({
			start: dir === "rtl" ? navRect.right - btnRect.right : btnRect.left - navRect.left,
			width: btnRect.width
		});
	}, [
		activeIdx,
		showIndicator,
		dir
	]);
	React$1.useLayoutEffect(() => {
		updateIndicator();
	}, [updateIndicator]);
	React$1.useEffect(() => {
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
		ref: React$1.useCallback((node) => {
			navRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref && "current" in ref) ref.current = node;
		}, [ref]),
		className: cn(navigationVariants({ variant }), className),
		"data-slot": "navigation",
		"data-variant": dataAttr(variant),
		"data-active-index": dataAttr(activeIdx),
		"data-has-indicator": dataAttr(showIndicator),
		"data-real": dataAttr(syncWithUrl && typeof window !== "undefined"),
		...props,
		children: [
			showBack && /* @__PURE__ */ jsx("button", {
				"data-slot": "navigation-back",
				className: navBackVariants(),
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
				"data-slot": "navigation-item-wrapper",
				className: navItemWrapperVariants(),
				children: [index > 0 && variant === "pipe" && /* @__PURE__ */ jsx("span", {
					"data-slot": "navigation-separator",
					"aria-hidden": "true",
					className: navSeparatorVariants(),
					children: "|"
				}), /* @__PURE__ */ jsxs("button", {
					ref: (node) => {
						itemRefs.current[index] = node;
					},
					"data-slot": "navigation-item",
					className: navItemVariants({
						variant,
						active: index === activeIdx
					}),
					onClick: () => handleSelect(index),
					"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
					"data-active": dataAttr(index === activeIdx),
					"data-slug": dataAttr(getItemSlug(item, index)),
					"aria-current": index === activeIdx ? "page" : void 0,
					children: [item.icon, item.label]
				})]
			}, index)),
			showIndicator && /* @__PURE__ */ jsx("span", {
				"data-slot": "navigation-indicator",
				className: navIndicatorVariants(),
				style: {
					insetInlineStart: indicatorStyle.start,
					width: indicatorStyle.width
				},
				"aria-hidden": "true"
			})
		]
	});
}
Navigation.displayName = "Navigation";
//#endregion
export { Navigation as default };

//# sourceMappingURL=Navigation.mjs.map