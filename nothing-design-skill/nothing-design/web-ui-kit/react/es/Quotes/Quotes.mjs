import { cn, dataAttr } from "../lib/utils.mjs";
import { useNow } from "../system/hooks.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Quotes.css";
//#region src/Quotes/Quotes.tsx
const quotesVariants = cva("nothing-quotes", {
	variants: {
		theme: {
			light: "nothing-quotes--light",
			dark: "nothing-quotes--dark"
		},
		size: {
			sm: "nothing-quotes--sm",
			md: "nothing-quotes--md",
			lg: "nothing-quotes--lg"
		}
	},
	defaultVariants: {
		theme: "dark",
		size: "md"
	}
});
const defaultQuotes = [
	{
		text: "Less, but better.",
		author: "Dieter Rams"
	},
	{
		text: "We remove everything that is unnecessary.",
		author: "Nothing Design Principles"
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
const Quotes = React.forwardRef(({ className, theme = "dark", size = "md", quotes = defaultQuotes, interval = 3e4, ...props }, ref) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const tick = useNow(quotes.length > 1 ? interval : 6e4);
	React.useEffect(() => {
		if (quotes.length <= 1) return;
		setCurrentIndex((prev) => (prev + 1) % quotes.length);
	}, [tick, quotes.length]);
	React.useEffect(() => {
		if (currentIndex >= quotes.length && quotes.length > 0) setCurrentIndex(0);
	}, [quotes.length, currentIndex]);
	const quote = quotes.length > 0 ? quotes[currentIndex] : {
		text: "No quotes available",
		author: ""
	};
	const real = quotes !== defaultQuotes;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(quotesVariants({
			theme,
			size
		}), className),
		"data-state": dataAttr(quotes.length > 0 ? "ready" : "empty"),
		"data-real": dataAttr(real),
		...props,
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "nothing-quotes__svg",
			viewBox: "0 0 200 200",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "nothing-quotes__ring nothing-quotes__ring--bg",
				cx: "100",
				cy: "100",
				r: "95",
				fill: "none"
			}), /* @__PURE__ */ jsx("circle", {
				className: "nothing-quotes__ring nothing-quotes__ring--progress",
				cx: "100",
				cy: "100",
				r: "95",
				fill: "none",
				pathLength: "100",
				strokeDasharray: "100",
				strokeDashoffset: 100 - (currentIndex + 1) / quotes.length * 100
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-quotes__content",
			children: [/* @__PURE__ */ jsx("div", {
				className: "nothing-quotes__text",
				children: quote.text
			}), quote.author && /* @__PURE__ */ jsx("div", {
				className: "nothing-quotes__author",
				children: quote.author
			})]
		})]
	});
});
Quotes.displayName = "Quotes";
//#endregion
export { Quotes as default, quotesVariants };

//# sourceMappingURL=Quotes.mjs.map