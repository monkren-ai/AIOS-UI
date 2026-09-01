import { cn, dataAttr } from "../lib/utils.mjs";
import { numberTickerAffixVariants, numberTickerDigitValueVariants, numberTickerDigitVariants, numberTickerVariants } from "./number-ticker-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/NumberTicker/NumberTicker.tsx
function NumberTicker({ value, prefix, suffix, size = "md", className, ref, ...props }) {
	const next = String(value);
	const [display, setDisplay] = React$1.useState(next);
	const [from, setFrom] = React$1.useState(next);
	const [direction, setDirection] = React$1.useState("up");
	const [generation, setGeneration] = React$1.useState(0);
	React$1.useEffect(() => {
		if (next === display) return;
		const numericNext = Number(next);
		const numericPrev = Number(display);
		if (!Number.isNaN(numericNext) && !Number.isNaN(numericPrev)) setDirection(numericNext >= numericPrev ? "up" : "down");
		setFrom(display);
		setDisplay(next);
		setGeneration((count) => count + 1);
	}, [next, display]);
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(numberTickerVariants({ size }), className),
		"data-slot": "number-ticker",
		"data-size": dataAttr(size),
		"data-direction": direction,
		...props,
		children: [
			prefix != null && prefix !== "" && /* @__PURE__ */ jsx("span", {
				className: numberTickerAffixVariants(),
				"data-slot": "number-ticker-prefix",
				children: prefix
			}),
			display.split("").map((character, index) => {
				const changed = from[index] !== character;
				return /* @__PURE__ */ jsx("span", {
					className: numberTickerDigitVariants(),
					"data-slot": "number-ticker-digit",
					"data-changed": dataAttr(changed),
					children: /* @__PURE__ */ jsx("span", {
						className: changed ? numberTickerDigitValueVariants() : void 0,
						style: changed ? {
							animationDelay: `calc(var(--duration-stagger) * ${index})`,
							["--digit-from"]: direction === "up" ? "100%" : "-100%"
						} : void 0,
						children: character
					})
				}, `${generation}-${index}-${character}`);
			}),
			suffix != null && suffix !== "" && /* @__PURE__ */ jsx("span", {
				className: numberTickerAffixVariants(),
				"data-slot": "number-ticker-suffix",
				children: suffix
			})
		]
	});
}
NumberTicker.displayName = "NumberTicker";
//#endregion
export { NumberTicker as default };

//# sourceMappingURL=NumberTicker.mjs.map