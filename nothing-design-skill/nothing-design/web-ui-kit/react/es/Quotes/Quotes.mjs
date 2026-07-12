import { cn, dataAttr } from "../lib/utils.mjs";
import { useNow } from "../system/hooks.mjs";
import * as React$1 from "react";
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
		text: "Simplicity is the ultimate sophistication.",
		author: "Leonardo da Vinci"
	},
	{
		text: "Design is not just what it looks like. Design is how it works.",
		author: "Steve Jobs"
	},
	{
		text: "Innovation distinguishes between a leader and a follower.",
		author: "Steve Jobs"
	},
	{
		text: "Stay hungry, stay foolish.",
		author: "Stewart Brand"
	},
	{
		text: "The best way to predict the future is to invent it.",
		author: "Alan Kay"
	},
	{
		text: "Less, but better.",
		author: "Dieter Rams"
	},
	{
		text: "Technology is best when it brings people together.",
		author: "Matt Mullenweg"
	},
	{
		text: "Make it work, make it right, make it fast.",
		author: "Kent Beck"
	}
];
const Quotes = React$1.forwardRef(({ className, theme = "dark", size = "md", quotes = defaultQuotes, interval = 3e4, ...props }, ref) => {
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
			children: [/* @__PURE__ */ jsx("circle", {
				className: "nothing-quotes__outer",
				cx: "100",
				cy: "100",
				r: "95"
			}), /* @__PURE__ */ jsx("circle", {
				className: "nothing-quotes__inner",
				cx: "100",
				cy: "100",
				r: "85"
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