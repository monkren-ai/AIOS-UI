import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import { bubbleVariants } from "./bubble-variants.mjs";
import * as React$1 from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/Bubble/Bubble.tsx
function useTypingRender(content, typing) {
	const [displayedText, setDisplayedText] = React$1.useState("");
	const [isTyping, setIsTyping] = React$1.useState(false);
	const text = typeof content === "string" ? content : "";
	React$1.useEffect(() => {
		if (!typing || !text) {
			setDisplayedText(text);
			setIsTyping(false);
			return;
		}
		const options = typeof typing === "object" ? typing : {};
		const step = options.step ?? 1;
		const interval = options.interval ?? 30;
		setIsTyping(true);
		let index = 0;
		const timer = setInterval(() => {
			index += step;
			if (index >= text.length) {
				setDisplayedText(text);
				setIsTyping(false);
				clearInterval(timer);
			} else setDisplayedText(text.slice(0, index));
		}, interval);
		return () => clearInterval(timer);
	}, [text, typing]);
	if (typeof content !== "string") return {
		displayed: content,
		isTyping: false
	};
	return {
		displayed: displayedText,
		isTyping
	};
}
const Bubble = React$1.forwardRef(({ content, placement = "start", variant = "filled", shape = "default", loading = false, typing, avatar, header, footer, extra, className, style, classNames: userClassNames, styles: userStyles, ...rest }, ref) => {
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	const { displayed, isTyping } = useTypingRender(content, typing);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(bubbleVariants({
			placement,
			variant,
			shape,
			loading
		}), classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "bubble",
		"data-placement": dataAttr(placement),
		"data-variant": dataAttr(variant),
		"data-shape": dataAttr(shape),
		"data-loading": dataAttr(loading),
		...rest,
		children: [avatar && /* @__PURE__ */ jsx("div", {
			className: cn("aios-bubble__avatar", classNames.avatar),
			style: styles.avatar,
			"data-slot": "bubble-avatar",
			children: avatar
		}), /* @__PURE__ */ jsxs("div", {
			className: cn("aios-bubble__body", classNames.body),
			style: styles.body,
			"data-slot": "bubble-body",
			children: [
				header && /* @__PURE__ */ jsx("div", {
					className: cn("aios-bubble__header", classNames.header),
					style: styles.header,
					"data-slot": "bubble-header",
					children: header
				}),
				/* @__PURE__ */ jsx("div", {
					className: cn("aios-bubble__content", classNames.content),
					style: styles.content,
					"data-slot": "bubble-content",
					children: loading ? /* @__PURE__ */ jsxs("span", {
						className: "aios-bubble__loading",
						"aria-label": "Loading",
						children: [
							/* @__PURE__ */ jsx("span", { className: "aios-bubble__loading-dot" }),
							/* @__PURE__ */ jsx("span", { className: "aios-bubble__loading-dot" }),
							/* @__PURE__ */ jsx("span", { className: "aios-bubble__loading-dot" })
						]
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [displayed, isTyping && /* @__PURE__ */ jsx("span", {
						className: "aios-bubble__cursor",
						"aria-hidden": "true"
					})] })
				}),
				footer && /* @__PURE__ */ jsx("div", {
					className: cn("aios-bubble__footer", classNames.footer),
					style: styles.footer,
					"data-slot": "bubble-footer",
					children: footer
				}),
				extra && /* @__PURE__ */ jsx("div", {
					className: cn("aios-bubble__extra", classNames.extra),
					style: styles.extra,
					"data-slot": "bubble-extra",
					children: extra
				})
			]
		})]
	});
});
Bubble.displayName = "Bubble";
//#endregion
export { Bubble as default };

//# sourceMappingURL=Bubble.mjs.map