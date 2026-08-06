import { cn, dataAttr } from "../lib/utils.mjs";
import { timeFieldInputVariants, timeFieldSegmentVariants, timeFieldVariants } from "./time-field-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/TimeField/TimeField.tsx
const SEGMENTS = {
	hour: {
		maxLength: 2,
		max: 23,
		placeholder: "HH",
		label: "Hour / 时"
	},
	minute: {
		maxLength: 2,
		max: 59,
		placeholder: "mm",
		label: "Minute / 分"
	},
	second: {
		maxLength: 2,
		max: 59,
		placeholder: "ss",
		label: "Second / 秒"
	}
};
/** 把时间字符串拆成段，缺失补空串（容错部分值）。 */
function parseValue(time) {
	if (!time) return {
		hour: "",
		minute: "",
		second: ""
	};
	const parts = time.split(":");
	return {
		hour: parts[0] ?? "",
		minute: parts[1] ?? "",
		second: parts[2] ?? ""
	};
}
/** 把段拼回字符串；全空返回空串。 */
function stringify(segs, showSeconds) {
	if (!segs.hour && !segs.minute && (!showSeconds || !segs.second)) return "";
	return showSeconds ? `${segs.hour}:${segs.minute}:${segs.second}` : `${segs.hour}:${segs.minute}`;
}
/** 过滤数字、截断到 2 位、按段上限钳制（24 小时制）。 */
function clampSegment(kind, raw) {
	const cfg = SEGMENTS[kind];
	const digits = raw.replace(/\D/g, "").slice(0, cfg.maxLength);
	if (digits.length === cfg.maxLength) {
		if (parseInt(digits, 10) > cfg.max) return String(cfg.max);
	}
	return digits;
}
function TimeField({ value: controlledValue, defaultValue, onValueChange, showSeconds = false, disabled = false, label, error, size = "md", placeholder, className, ref, ...props }) {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const [activeKind, setActiveKind] = React$1.useState(null);
	const inputRefs = React$1.useRef({
		hour: null,
		minute: null,
		second: null
	});
	const order = showSeconds ? [
		"hour",
		"minute",
		"second"
	] : ["hour", "minute"];
	const segments = parseValue(value);
	const hasError = Boolean(error);
	const commit = React$1.useCallback((next) => {
		const joined = stringify(next, showSeconds);
		if (controlledValue === void 0) setInternalValue(joined);
		onValueChange?.(joined);
	}, [
		controlledValue,
		onValueChange,
		showSeconds
	]);
	const setSegment = React$1.useCallback((kind, next) => {
		commit({
			...segments,
			[kind]: next
		});
	}, [segments, commit]);
	const focusKind = React$1.useCallback((kind) => {
		inputRefs.current[kind]?.focus();
	}, []);
	const handleChange = React$1.useCallback((kind, e) => {
		const next = clampSegment(kind, e.target.value);
		setSegment(kind, next);
		const idx = order.indexOf(kind);
		if (next.length === SEGMENTS[kind].maxLength && idx < order.length - 1) focusKind(order[idx + 1]);
	}, [
		order,
		setSegment,
		focusKind
	]);
	const handleKeyDown = React$1.useCallback((kind, e) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			const cur = segments[kind];
			if (cur.length > 0) setSegment(kind, cur.slice(0, -1));
			else {
				const idx = order.indexOf(kind);
				if (idx > 0) {
					const prev = order[idx - 1];
					setSegment(prev, segments[prev].slice(0, -1));
					focusKind(prev);
				}
			}
			return;
		}
		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			const nextIdx = order.indexOf(kind) + (e.key === "ArrowRight" ? 1 : -1);
			if (nextIdx < 0 || nextIdx > order.length - 1) return;
			e.preventDefault();
			focusKind(order[nextIdx]);
		}
	}, [
		order,
		segments,
		setSegment,
		focusKind
	]);
	const handlePaste = React$1.useCallback((kind, e) => {
		e.preventDefault();
		const digits = e.clipboardData.getData("text").replace(/\D/g, "");
		const next = { ...segments };
		const startIdx = order.indexOf(kind);
		let cursor = 0;
		for (let i = startIdx; i < order.length && cursor < digits.length; i++) {
			const k = order[i];
			const cap = SEGMENTS[k].maxLength;
			next[k] = clampSegment(k, digits.slice(cursor, cursor + cap));
			cursor += cap;
		}
		commit(next);
		focusKind(order.find((k) => next[k].length < SEGMENTS[k].maxLength) ?? order[order.length - 1]);
	}, [
		order,
		segments,
		commit,
		focusKind
	]);
	const handleFocus = React$1.useCallback((kind) => setActiveKind(kind), []);
	const handleBlur = React$1.useCallback(() => setActiveKind(null), []);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(timeFieldVariants({
			size,
			disabled,
			error: hasError
		}), className),
		"data-slot": "time-field",
		"data-size": dataAttr(size),
		"data-state": dataAttr(hasError ? "error" : disabled ? "disabled" : "default"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		role: "group",
		"aria-label": label || "Time / 时间",
		...props,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "font-mono uppercase tracking-wider text-foreground-muted text-label",
				"data-slot": "time-field-label",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-xs",
				"data-slot": "time-field-control",
				children: order.map((kind, i) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [i > 0 && /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					"data-slot": "time-field-separator",
					className: "font-mono text-foreground-muted",
					children: ":"
				}), /* @__PURE__ */ jsx("div", {
					className: timeFieldSegmentVariants({
						size,
						kind,
						active: activeKind === kind,
						filled: !!segments[kind],
						error: hasError
					}),
					"data-slot": "time-field-segment",
					"data-kind": kind,
					"data-active": dataAttr(activeKind === kind),
					"data-filled": dataAttr(!!segments[kind]),
					children: /* @__PURE__ */ jsx("input", {
						ref: (el) => {
							inputRefs.current[kind] = el;
						},
						className: timeFieldInputVariants({ size }),
						"data-slot": "time-field-input",
						type: "text",
						inputMode: "numeric",
						maxLength: SEGMENTS[kind].maxLength,
						value: segments[kind],
						placeholder: placeholder ?? SEGMENTS[kind].placeholder,
						disabled,
						onChange: (e) => handleChange(kind, e),
						onKeyDown: (e) => handleKeyDown(kind, e),
						onPaste: (e) => handlePaste(kind, e),
						onFocus: () => handleFocus(kind),
						onBlur: handleBlur,
						"aria-label": SEGMENTS[kind].label,
						"aria-invalid": hasError || void 0
					})
				})] }, kind))
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				className: "font-mono uppercase tracking-wide text-label text-accent",
				"data-slot": "time-field-error",
				role: "alert",
				children: error
			})
		]
	});
}
TimeField.displayName = "TimeField";
//#endregion
export { TimeField as default };

//# sourceMappingURL=TimeField.mjs.map