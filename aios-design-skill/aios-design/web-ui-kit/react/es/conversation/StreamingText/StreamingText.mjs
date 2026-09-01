import { cn } from "../../lib/utils.mjs";
import { streamingTextSegmentVariants, streamingTextVariants } from "./streaming-text-variants.mjs";
import * as React$1 from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "./StreamingText.css";
//#region src/conversation/StreamingText/StreamingText.tsx
const SETTLE_MS = 700;
function tokenize(chunk) {
	return chunk.match(/\s*\S+|\s+$/g) ?? [];
}
function StreamingText({ children: text, variant = "fade", streaming = false, className, ref, ...props }) {
	const [state, setState] = React$1.useState(() => ({
		settled: text,
		segments: []
	}));
	const previousText = React$1.useRef(text);
	const previousVariant = React$1.useRef(variant);
	React$1.useLayoutEffect(() => {
		const previous = previousText.current;
		const variantChanged = previousVariant.current !== variant;
		previousText.current = text;
		previousVariant.current = variant;
		if (variant === "plain") return;
		if (!variantChanged && text === previous) return;
		if (!variantChanged && text.length > previous.length && text.startsWith(previous)) {
			const createdAt = Date.now();
			let offset = 0;
			const segments = tokenize(text.slice(previous.length)).map((token) => {
				const segment = {
					key: previous.length + offset,
					text: token,
					createdAt
				};
				offset += token.length;
				return segment;
			});
			setState((current) => ({
				...current,
				segments: [...current.segments, ...segments]
			}));
			return;
		}
		setState({
			settled: text,
			segments: []
		});
	}, [text, variant]);
	React$1.useEffect(() => {
		if (state.segments.length === 0) return;
		const delay = Math.max(0, state.segments[0].createdAt + SETTLE_MS - Date.now());
		const timer = window.setTimeout(() => {
			setState((current) => {
				const cutoff = Date.now() - SETTLE_MS;
				let count = 0;
				let folded = "";
				while (count < current.segments.length && current.segments[count].createdAt <= cutoff) {
					folded += current.segments[count].text;
					count += 1;
				}
				if (count === 0) return current;
				return {
					settled: current.settled + folded,
					segments: current.segments.slice(count)
				};
			});
		}, delay + 20);
		return () => window.clearTimeout(timer);
	}, [state.segments]);
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(streamingTextVariants({ variant }), className),
		"data-slot": "streaming-text",
		"data-variant": variant,
		"data-streaming": streaming || void 0,
		"aria-busy": streaming || void 0,
		"aria-live": "polite",
		"aria-atomic": "false",
		...props,
		children: [variant === "plain" ? text : /* @__PURE__ */ jsxs(Fragment, { children: [
			state.settled,
			state.segments.map((segment) => /* @__PURE__ */ jsx("span", {
				className: streamingTextSegmentVariants({ variant }),
				"data-slot": "streaming-text-segment",
				children: segment.text
			}, segment.key)),
			streaming && /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: "aios-streaming-text__caret",
				"data-slot": "streaming-text-caret"
			})
		] }), variant === "plain" && streaming && /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "aios-streaming-text__caret",
			"data-slot": "streaming-text-caret"
		})]
	});
}
//#endregion
export { StreamingText };

//# sourceMappingURL=StreamingText.mjs.map