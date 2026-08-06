import { cn, dataAttr } from "../lib/utils.mjs";
import { textAnimateVariants } from "./text-animate-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
import "./TextAnimate.css";
//#region src/TextAnimate/TextAnimate.tsx
const TAGS = {
	div: "div",
	span: "span",
	p: "p"
};
function splitSegments(text, mode) {
	if (mode === "char") return Array.from(text);
	if (mode === "line") return text.split("\n");
	return text.split(/(\s+)/);
}
const isWhitespace = (token) => /^\s+$/.test(token);
const REVEAL_ONCE = "motion-safe:animate-[nothing-text-reveal_var(--nothing-text-duration,300ms)_var(--ease-nothing)_1_both]";
const REVEAL_LOOP = "motion-safe:animate-[nothing-text-reveal_var(--nothing-text-duration,300ms)_var(--ease-nothing)_infinite_both]";
function TextAnimate({ children, mode = "word", delay = 40, duration = 300, as = "p", once = true, className, style, ...props }) {
	const Tag = TAGS[as];
	const segmentClass = cn("nothing-text-animate__segment inline-block will-change-[opacity,transform]", once ? REVEAL_ONCE : REVEAL_LOOP, "motion-reduce:animate-none motion-reduce:opacity-100");
	const tokens = splitSegments(children, mode);
	let segmentIndex = 0;
	return /* @__PURE__ */ jsx(Tag, {
		className: cn(textAnimateVariants({ mode }), className),
		style: {
			"--nothing-text-duration": `${duration}ms`,
			...style
		},
		"data-slot": "text-animate",
		"data-mode": dataAttr(mode),
		...props,
		children: tokens.map((token, i) => {
			if (mode !== "char" && isWhitespace(token)) return token;
			const idx = mode === "char" ? i : segmentIndex++;
			return /* @__PURE__ */ jsx("span", {
				"data-slot": "text-animate-segment",
				className: cn(segmentClass, mode === "line" && "block"),
				style: { animationDelay: `${idx * delay}ms` },
				children: token
			}, i);
		})
	});
}
TextAnimate.displayName = "TextAnimate";
//#endregion
export { TextAnimate as default };

//# sourceMappingURL=TextAnimate.mjs.map