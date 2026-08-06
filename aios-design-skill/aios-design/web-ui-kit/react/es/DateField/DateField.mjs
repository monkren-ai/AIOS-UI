import { cn, dataAttr } from "../lib/utils.mjs";
import { dateFieldInputVariants, dateFieldSegmentVariants, dateFieldVariants } from "./date-field-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/DateField/DateField.tsx
const SEGMENTS = {
	year: {
		maxLength: 4,
		max: 9999,
		placeholder: "YYYY",
		label: "Year / 年"
	},
	month: {
		maxLength: 2,
		max: 12,
		placeholder: "MM",
		label: "Month / 月"
	},
	day: {
		maxLength: 2,
		max: 31,
		placeholder: "DD",
		label: "Day / 日"
	}
};
/** locale → 段顺序。zh 默认年月日，en 月日年。 */
const ORDERS = {
	zh: [
		"year",
		"month",
		"day"
	],
	en: [
		"month",
		"day",
		"year"
	]
};
/** 把 ISO 字符串拆成三段，缺失补空串（容错部分值）。 */
function parseValue(iso) {
	if (!iso) return {
		year: "",
		month: "",
		day: ""
	};
	const parts = iso.split("-");
	return {
		year: parts[0] ?? "",
		month: parts[1] ?? "",
		day: parts[2] ?? ""
	};
}
/** 把三段拼回字符串；全空返回空串。 */
function stringify(segs) {
	if (!segs.year && !segs.month && !segs.day) return "";
	return `${segs.year}-${segs.month}-${segs.day}`;
}
/** 过滤数字、截断到段长、按段上限钳制。 */
function clampSegment(kind, raw) {
	const cfg = SEGMENTS[kind];
	const digits = raw.replace(/\D/g, "").slice(0, cfg.maxLength);
	if (digits.length === cfg.maxLength) {
		const n = parseInt(digits, 10);
		if (kind === "month" && n > 12) return "12";
		if (kind === "day" && n > 31) return "31";
	}
	return digits;
}
function DateField({ value: controlledValue, defaultValue, onValueChange, locale = "zh", disabled = false, label, error, size = "md", placeholder, className, ref, ...props }) {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const [activeKind, setActiveKind] = React$1.useState(null);
	const inputRefs = React$1.useRef({
		year: null,
		month: null,
		day: null
	});
	const order = ORDERS[locale];
	const segments = parseValue(value);
	const hasError = Boolean(error);
	const commit = React$1.useCallback((next) => {
		const joined = stringify(next);
		if (controlledValue === void 0) setInternalValue(joined);
		onValueChange?.(joined);
	}, [controlledValue, onValueChange]);
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
		className: cn(dateFieldVariants({
			size,
			disabled,
			error: hasError
		}), className),
		"data-slot": "date-field",
		"data-size": dataAttr(size),
		"data-state": dataAttr(hasError ? "error" : disabled ? "disabled" : "default"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		role: "group",
		"aria-label": label || "Date / 日期",
		...props,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "font-mono uppercase tracking-wider text-foreground-muted text-label",
				"data-slot": "date-field-label",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-xs",
				"data-slot": "date-field-control",
				children: order.map((kind, i) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [i > 0 && /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					"data-slot": "date-field-separator",
					className: "font-mono text-foreground-muted",
					children: "-"
				}), /* @__PURE__ */ jsx("div", {
					className: dateFieldSegmentVariants({
						size,
						kind,
						active: activeKind === kind,
						filled: !!segments[kind],
						error: hasError
					}),
					"data-slot": "date-field-segment",
					"data-kind": kind,
					"data-active": dataAttr(activeKind === kind),
					"data-filled": dataAttr(!!segments[kind]),
					children: /* @__PURE__ */ jsx("input", {
						ref: (el) => {
							inputRefs.current[kind] = el;
						},
						className: dateFieldInputVariants({ size }),
						"data-slot": "date-field-input",
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
				"data-slot": "date-field-error",
				role: "alert",
				children: error
			})
		]
	});
}
DateField.displayName = "DateField";
//#endregion
export { DateField as default };

//# sourceMappingURL=DateField.mjs.map