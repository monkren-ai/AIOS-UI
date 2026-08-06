import { cn, dataAttr } from "../lib/utils.mjs";
import { clipboardClearVariants, clipboardCopiedVariants, clipboardCountVariants, clipboardDeleteVariants, clipboardHeaderVariants, clipboardItemContentVariants, clipboardItemVariants, clipboardListVariants, clipboardTextVariants, clipboardTimeVariants, clipboardTitleVariants, clipboardVariants, resolveClipboardSize } from "./clipboard-variants.mjs";
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Clipboard/Clipboard.tsx
const defaultDemoItems = [
	{
		text: "npm install aios-design@latest",
		time: /* @__PURE__ */ new Date(Date.now() - 36e5)
	},
	{
		text: "The quick brown fox jumps over the lazy dog and keeps running",
		time: /* @__PURE__ */ new Date(Date.now() - 72e5)
	},
	{
		text: "git commit -m \"feat: add clipboard widget\"",
		time: /* @__PURE__ */ new Date(Date.now() - 108e5)
	}
];
function Clipboard({ className, maxItems = 5, truncateLength = 40, copiedDuration = 2e3, demoItems = defaultDemoItems, size = "md", state: stateProp, style, ref, ...props }) {
	const [items, setItems] = useState([...demoItems]);
	const [copiedIndex, setCopiedIndex] = useState(null);
	const derivedState = stateProp ?? (copiedIndex !== null ? "copied" : "idle");
	const resolvedSize = resolveClipboardSize(size) ?? "md";
	const formatTime = (date) => {
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	const truncate = (text) => {
		return text.length > truncateLength ? text.substring(0, truncateLength) + "..." : text;
	};
	const handleCopy = useCallback(async (index) => {
		const item = items[index];
		if (!item) return;
		try {
			await navigator.clipboard.writeText(item.text);
		} catch {}
		setCopiedIndex(index);
	}, [items]);
	const handleCopyKeyDown = useCallback((e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleCopy(index);
		}
	}, [handleCopy]);
	useEffect(() => {
		if (copiedIndex === null) return;
		const timer = setTimeout(() => setCopiedIndex(null), copiedDuration);
		return () => clearTimeout(timer);
	}, [copiedIndex, copiedDuration]);
	const handleDelete = (index) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	};
	const handleClearAll = () => {
		setItems([]);
	};
	useEffect(() => {
		if (!navigator.clipboard?.readText) return;
		let lastText = "";
		const monitor = setInterval(async () => {
			try {
				const text = await navigator.clipboard.readText();
				if (text && text !== lastText) {
					lastText = text;
					setItems((prev) => {
						return [{
							text: text.trim(),
							time: /* @__PURE__ */ new Date()
						}, ...prev].slice(0, maxItems);
					});
				}
			} catch {}
		}, 2e3);
		return () => clearInterval(monitor);
	}, [maxItems]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(clipboardVariants({
			size: resolvedSize,
			state: derivedState
		}), className),
		style,
		"data-slot": "clipboard",
		"data-size": dataAttr(resolvedSize),
		"data-state": dataAttr(derivedState),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: clipboardHeaderVariants(),
				"data-slot": "clipboard-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: clipboardTitleVariants({ size: resolvedSize }),
					"data-slot": "clipboard-title",
					children: "Clipboard"
				}), /* @__PURE__ */ jsxs("div", {
					className: clipboardCountVariants(),
					"data-slot": "clipboard-count",
					children: [
						items.length,
						"/",
						maxItems
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: clipboardListVariants(),
				"data-slot": "clipboard-list",
				children: items.map((item, index) => /* @__PURE__ */ jsxs("div", {
					className: clipboardItemVariants({
						size: resolvedSize,
						copied: copiedIndex === index
					}),
					"data-slot": "clipboard-item",
					"data-copied": dataAttr(copiedIndex === index),
					role: "button",
					tabIndex: 0,
					onClick: () => handleCopy(index),
					onKeyDown: (e) => handleCopyKeyDown(e, index),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: clipboardItemContentVariants(),
							"data-slot": "clipboard-item-content",
							children: [/* @__PURE__ */ jsx("div", {
								className: clipboardTextVariants(),
								"data-slot": "clipboard-text",
								children: truncate(item.text)
							}), /* @__PURE__ */ jsx("div", {
								className: clipboardTimeVariants(),
								"data-slot": "clipboard-time",
								children: formatTime(item.time)
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: clipboardCopiedVariants(),
							"data-slot": "clipboard-copied",
							children: "[COPIED]"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: clipboardDeleteVariants(),
							"data-slot": "clipboard-delete",
							"aria-label": "Delete item",
							onClick: (e) => {
								e.stopPropagation();
								handleDelete(index);
							},
							children: "×"
						})
					]
				}, index))
			}),
			items.length > 0 && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: clipboardClearVariants({ size: resolvedSize }),
				"data-slot": "clipboard-clear",
				onClick: handleClearAll,
				children: "Clear All"
			})
		]
	});
}
Clipboard.displayName = "Clipboard";
//#endregion
export { Clipboard as default };

//# sourceMappingURL=Clipboard.mjs.map