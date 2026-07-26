import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Clipboard.css";
//#region src/Clipboard/Clipboard.tsx
const clipboardVariants = cva("nothing-clipboard", {
	variants: {
		size: {
			sm: "nothing-clipboard--sm",
			md: "nothing-clipboard--md",
			lg: "nothing-clipboard--lg"
		},
		state: {
			idle: "",
			copied: "nothing-clipboard--copied"
		}
	},
	defaultVariants: {
		size: "md",
		state: "idle"
	}
});
const defaultDemoItems = [
	{
		text: "npm install nothing-design@latest",
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
const Clipboard = React.forwardRef(({ className, maxItems = 5, truncateLength = 40, copiedDuration = 2e3, demoItems = defaultDemoItems, size = "md", state: stateProp, style, ...props }, ref) => {
	const [items, setItems] = useState([...demoItems]);
	const [copiedIndex, setCopiedIndex] = useState(null);
	const derivedState = stateProp ?? (copiedIndex !== null ? "copied" : "idle");
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
			size,
			state: derivedState
		}), className),
		style,
		"data-size": dataAttr(size),
		"data-state": dataAttr(derivedState),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "clipboard-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: "clipboard-title",
					children: "Clipboard"
				}), /* @__PURE__ */ jsxs("div", {
					className: "clipboard-count",
					children: [
						items.length,
						"/",
						maxItems
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "clipboard-list",
				children: items.map((item, index) => /* @__PURE__ */ jsxs("div", {
					className: cn("clipboard-item", copiedIndex === index && "copied"),
					role: "button",
					tabIndex: 0,
					onClick: () => handleCopy(index),
					onKeyDown: (e) => handleCopyKeyDown(e, index),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "clipboard-item-content",
							children: [/* @__PURE__ */ jsx("div", {
								className: "clipboard-text",
								children: truncate(item.text)
							}), /* @__PURE__ */ jsx("div", {
								className: "clipboard-time",
								children: formatTime(item.time)
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "clipboard-copied",
							children: "[COPIED]"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "clipboard-delete",
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
				className: "clipboard-clear",
				onClick: handleClearAll,
				children: "Clear All"
			})
		]
	});
});
Clipboard.displayName = "Clipboard";
//#endregion
export { clipboardVariants, Clipboard as default };

//# sourceMappingURL=Clipboard.mjs.map