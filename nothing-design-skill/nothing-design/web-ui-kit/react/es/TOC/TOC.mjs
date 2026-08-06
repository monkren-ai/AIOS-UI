import { cn, dataAttr } from "../lib/utils.mjs";
import { tocItemVariants, tocVariants } from "./toc-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/TOC/TOC.tsx
function TOC({ className, items, activeId, onActiveChange, container, ...props }) {
	const isControlled = activeId !== void 0;
	const [internalActive, setInternalActive] = React$1.useState(items[0]?.id);
	const currentActive = isControlled ? activeId : internalActive;
	const activeRef = React$1.useRef(currentActive);
	activeRef.current = currentActive;
	const onActiveChangeRef = React$1.useRef(onActiveChange);
	onActiveChangeRef.current = onActiveChange;
	const itemsRef = React$1.useRef(items);
	itemsRef.current = items;
	const itemsKey = items.map((item) => `${item.id}:${item.level ?? 1}`).join("|");
	React$1.useEffect(() => {
		if (isControlled) return;
		if (typeof IntersectionObserver === "undefined") return;
		const root = container ?? null;
		const doc = container ? container.ownerDocument : document;
		const targets = itemsRef.current.map((item) => doc.getElementById(item.id)).filter((el) => Boolean(el));
		if (targets.length === 0) return;
		const visible = /* @__PURE__ */ new Map();
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
			else visible.delete(entry.target.id);
			if (visible.size === 0) return;
			let topId;
			let topY = Infinity;
			visible.forEach((y, id) => {
				if (y < topY) {
					topY = y;
					topId = id;
				}
			});
			if (topId && topId !== activeRef.current) {
				setInternalActive(topId);
				onActiveChangeRef.current?.(topId);
			}
		}, {
			root,
			rootMargin: "0px 0px -70% 0px",
			threshold: [0, 1]
		});
		targets.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [
		itemsKey,
		container,
		isControlled
	]);
	const handleClick = (item) => (event) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		const target = (container ? container.ownerDocument : document).getElementById(item.id);
		if (!target) return;
		event.preventDefault();
		const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		target.scrollIntoView({
			behavior: reduceMotion ? "auto" : "smooth",
			block: "start"
		});
		if (!isControlled) setInternalActive(item.id);
		onActiveChange?.(item.id);
		try {
			if (typeof history !== "undefined" && history.replaceState) history.replaceState(null, "", `#${item.id}`);
		} catch {}
	};
	return /* @__PURE__ */ jsx("nav", {
		className: cn(tocVariants(), className),
		"data-slot": "toc",
		...props,
		"aria-label": props["aria-label"] ?? "Table of contents",
		children: items.map((item) => {
			const level = String(item.level ?? 1);
			const active = currentActive === item.id;
			return /* @__PURE__ */ jsxs("a", {
				href: `#${item.id}`,
				"data-slot": "toc-item",
				"data-active": dataAttr(active),
				"aria-current": active ? "location" : void 0,
				className: tocItemVariants({
					level,
					active
				}),
				onClick: handleClick(item),
				children: [active && /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					"data-slot": "toc-item-bar",
					className: "absolute inset-y-0 start-0 w-0.5 bg-accent"
				}), /* @__PURE__ */ jsx("span", {
					className: "relative py-1.5",
					children: item.label
				})]
			}, item.id);
		})
	});
}
TOC.displayName = "TOC";
//#endregion
export { TOC as default };

//# sourceMappingURL=TOC.mjs.map