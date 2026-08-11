import { cn, dataAttr } from "../lib/utils.mjs";
import { useNow } from "../system/hooks.mjs";
import { quotesAuthorVariants, quotesContentVariants, quotesRingVariants, quotesSvgVariants, quotesTextVariants, quotesVariants } from "./quotes-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Quotes/Quotes.tsx
const defaultQuotes = [
	{
		text: "Less, but better.",
		author: "Dieter Rams"
	},
	{
		text: "We remove everything that is unnecessary.",
		author: "AIOS Design Principles"
	},
	{
		text: "Weniger, aber besser.",
		author: "Dieter Rams"
	},
	{
		text: "Form follows function.",
		author: "Louis Sullivan"
	},
	{
		text: "Good design is as little design as possible.",
		author: "Dieter Rams"
	},
	{
		text: "The details are not the details. They make the design.",
		author: "Charles Eames"
	},
	{
		text: "Make it work, make it right, make it fast.",
		author: "Kent Beck"
	},
	{
		text: "Innovation distinguishes between a leader and a follower.",
		author: "Steve Jobs"
	}
];
function Quotes({ className, theme = "dark", size = "md", quotes = defaultQuotes, interval = 3e4, ...props }) {
	const [currentIndex, setCurrentIndex] = React$1.useState(0);
	const tick = useNow(quotes.length > 1 ? interval : 6e4);
	React$1.useEffect(() => {
		if (quotes.length <= 1) return;
		setCurrentIndex((prev) => (prev + 1) % quotes.length);
	}, [tick, quotes.length]);
	React$1.useEffect(() => {
		if (currentIndex >= quotes.length && quotes.length > 0) setCurrentIndex(0);
	}, [quotes.length, currentIndex]);
	const quote = quotes.length > 0 ? quotes[currentIndex] : {
		text: "No quotes available",
		author: ""
	};
	const real = quotes !== defaultQuotes;
	const progress = quotes.length > 0 ? (currentIndex + 1) / quotes.length * 100 : 100;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(quotesVariants({
			theme,
			size
		}), className),
		"data-slot": "quotes",
		"data-state": dataAttr(quotes.length > 0 ? "ready" : "empty"),
		"data-quotes-theme": dataAttr(theme),
		"data-size": dataAttr(size),
		"data-index": dataAttr(currentIndex),
		"data-real": dataAttr(real),
		...props,
		children: [/* @__PURE__ */ jsxs("svg", {
			"data-slot": "quotes-progress",
			className: quotesSvgVariants({ theme }),
			viewBox: "0 0 200 200",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				"data-slot": "quotes-ring",
				"data-kind": "bg",
				className: quotesRingVariants({ kind: "bg" }),
				cx: "100",
				cy: "100",
				r: "95",
				fill: "none"
			}), /* @__PURE__ */ jsx("circle", {
				"data-slot": "quotes-ring",
				"data-kind": "progress",
				className: quotesRingVariants({ kind: "progress" }),
				cx: "100",
				cy: "100",
				r: "95",
				fill: "none",
				pathLength: "100",
				strokeDasharray: "100",
				strokeDashoffset: 100 - progress
			})]
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "quotes-content",
			className: quotesContentVariants(),
			children: [/* @__PURE__ */ jsx("div", {
				"data-slot": "quotes-text",
				className: quotesTextVariants({ theme }),
				children: quote.text
			}), quote.author && /* @__PURE__ */ jsx("div", {
				"data-slot": "quotes-author",
				className: quotesAuthorVariants(),
				children: quote.author
			})]
		})]
	});
}
Quotes.displayName = "Quotes";
//#endregion
export { Quotes as default };

//# sourceMappingURL=Quotes.mjs.map