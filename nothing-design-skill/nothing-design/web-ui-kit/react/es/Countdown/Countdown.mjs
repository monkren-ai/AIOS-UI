import { cn, dataAttr } from "../lib/utils.mjs";
import { countdownNumberVariants, countdownVariants } from "./countdown-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Countdown/Countdown.tsx
function pad2(value) {
	return String(value).padStart(2, "0");
}
function Countdown({ target, onComplete, onCompleteText = "DONE", threshold = 10, showDays = false, label, className, ...props }) {
	const targetMs = React$1.useMemo(() => typeof target === "number" ? target : target.getTime(), [target]);
	const [remaining, setRemaining] = React$1.useState(() => Math.max(0, targetMs - Date.now()));
	const intervalRef = React$1.useRef(null);
	const completedRef = React$1.useRef(false);
	const onCompleteRef = React$1.useRef(onComplete);
	onCompleteRef.current = onComplete;
	React$1.useEffect(() => {
		completedRef.current = false;
		const tick = () => {
			const r = targetMs - Date.now();
			if (r <= 0) {
				setRemaining(0);
				if (!completedRef.current) {
					completedRef.current = true;
					onCompleteRef.current?.();
				}
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = null;
				}
				return;
			}
			setRemaining(r);
		};
		tick();
		intervalRef.current = setInterval(tick, 1e3);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [targetMs]);
	const totalSeconds = Math.ceil(remaining / 1e3);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor(totalSeconds % 86400 / 3600);
	const minutes = Math.floor(totalSeconds % 3600 / 60);
	const seconds = totalSeconds % 60;
	const isDone = remaining <= 0;
	const state = isDone ? "done" : !isDone && totalSeconds <= threshold ? "urgent" : "running";
	const parts = showDays ? [
		{
			value: days,
			unit: "D"
		},
		{
			value: hours,
			unit: "H"
		},
		{
			value: minutes,
			unit: "M"
		},
		{
			value: seconds,
			unit: "S"
		}
	] : [
		{
			value: hours,
			unit: "H"
		},
		{
			value: minutes,
			unit: "M"
		},
		{
			value: seconds,
			unit: "S"
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: cn(countdownVariants({ state }), className),
		"data-slot": "countdown",
		"data-state": dataAttr(state),
		role: "timer",
		"aria-live": "off",
		...props,
		children: [label && /* @__PURE__ */ jsx("div", {
			"data-slot": "countdown-label",
			className: "me-1 font-mono text-label uppercase tracking-wider text-foreground-muted",
			children: label
		}), isDone ? /* @__PURE__ */ jsx("span", {
			"data-slot": "countdown-done",
			className: cn(countdownNumberVariants({ state: "done" })),
			children: onCompleteText
		}) : /* @__PURE__ */ jsx("div", {
			"data-slot": "countdown-readout",
			className: "contents",
			children: parts.map((part, i) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [i > 0 && /* @__PURE__ */ jsx("span", {
				"data-slot": "countdown-sep",
				className: "font-display text-display-md leading-none text-foreground-disabled",
				children: ":"
			}), /* @__PURE__ */ jsxs("span", {
				"data-slot": "countdown-part",
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ jsx("span", {
					"data-slot": "countdown-number",
					className: cn(countdownNumberVariants({ state })),
					children: pad2(part.value)
				}), /* @__PURE__ */ jsx("span", {
					"data-slot": "countdown-unit",
					className: "font-mono text-label uppercase tracking-wider text-foreground-muted",
					children: part.unit
				})]
			})] }, part.unit))
		})]
	});
}
Countdown.displayName = "Countdown";
//#endregion
export { Countdown as default };

//# sourceMappingURL=Countdown.mjs.map