import { cn, dataAttr } from "../lib/utils.mjs";
import { inputControlVariants, inputIconVariants } from "../Input/input-variants.mjs";
import { calendarNavButtonVariants, calendarWeekdayVariants, dayVariants } from "../Calendar/calendar-variants.mjs";
import Popover from "../Popover/Popover.mjs";
import { datePickerVariants } from "./date-picker-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/DatePicker/DatePicker.tsx
const WEEKDAYS = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
/** YYYY-MM-DD → 本地 Date（避免 UTC 偏移）。 */
function parseISODate(iso) {
	if (!iso) return null;
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
	if (!m) return null;
	return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
function pad2(n) {
	return String(n).padStart(2, "0");
}
function toISO(d) {
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfToday() {
	const t = /* @__PURE__ */ new Date();
	return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}
/** 构造 6×7 网格，每格带真实 Date。 */
function buildCells(viewDate) {
	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const firstDay = new Date(year, month, 1).getDay();
	const lastDay = new Date(year, month + 1, 0).getDate();
	const prevLast = new Date(year, month, 0).getDate();
	const today = startOfToday();
	const cells = [];
	for (let i = firstDay - 1; i >= 0; i--) {
		const d = new Date(year, month - 1, prevLast - i);
		cells.push({
			date: d,
			isOtherMonth: true,
			isToday: isSameDay(d, today)
		});
	}
	for (let i = 1; i <= lastDay; i++) {
		const d = new Date(year, month, i);
		cells.push({
			date: d,
			isOtherMonth: false,
			isToday: isSameDay(d, today)
		});
	}
	const remaining = 42 - cells.length;
	for (let i = 1; i <= remaining; i++) {
		const d = new Date(year, month + 1, i);
		cells.push({
			date: d,
			isOtherMonth: true,
			isToday: isSameDay(d, today)
		});
	}
	return cells;
}
/**
* 内嵌的可选日历。
*
* 项目内的 `Calendar` 是只读展示件、没有 `onSelect`，所以 DatePicker 直接复用它的
* 视觉变体（`dayVariants` / `calendarWeekdayVariants` / `calendarNavButtonVariants`），
* 自己持有选中态与翻页逻辑。
*/
function DatePickerCalendar({ value, viewDate, onViewDateChange, onSelect }) {
	const cells = buildCells(viewDate);
	const selected = parseISODate(value);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-72",
		"data-slot": "date-picker-calendar",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex w-full items-baseline justify-between",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-display text-heading font-semibold tracking-[-0.02em] text-foreground-display",
				"data-slot": "date-picker-month-year",
				children: `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "date-picker-nav",
					"data-direction": "prev",
					className: calendarNavButtonVariants(),
					onClick: () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)),
					"aria-label": "Previous month / 上一月",
					children: "<"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "date-picker-nav",
					"data-direction": "next",
					className: calendarNavButtonVariants(),
					onClick: () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)),
					"aria-label": "Next month / 下一月",
					children: ">"
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-7 gap-1",
			role: "grid",
			children: [WEEKDAYS.map((w, i) => /* @__PURE__ */ jsx("div", {
				className: calendarWeekdayVariants(),
				children: w
			}, i)), cells.map((cell, i) => {
				const isSelected = selected ? isSameDay(cell.date, selected) : false;
				return /* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "date-picker-day",
					"data-other-month": dataAttr(cell.isOtherMonth),
					"data-today": dataAttr(cell.isToday),
					"data-selected": dataAttr(isSelected),
					className: cn(dayVariants({
						isOtherMonth: cell.isOtherMonth,
						isToday: cell.isToday
					}), "cursor-pointer rounded-md border border-transparent", isSelected && "border-foreground-display bg-foreground-display font-bold text-background hover:bg-foreground-display hover:text-background"),
					onClick: () => onSelect(cell.date),
					"aria-label": cell.date.toDateString(),
					"aria-pressed": isSelected || void 0,
					children: cell.date.getDate()
				}, i);
			})]
		})]
	});
}
function formatDisplay(iso, locale) {
	if (!iso) return "";
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
	if (!m) return iso;
	const [, y, mo, d] = m;
	return locale === "en" ? `${mo}/${d}/${y}` : `${y}-${mo}-${d}`;
}
/** 日历图标（纯内联，不引入图标包）。 */
function CalendarIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("rect", {
			x: "2.5",
			y: "3.5",
			width: "11",
			height: "10",
			rx: "1"
		}), /* @__PURE__ */ jsx("path", {
			d: "M5 2v2M11 2v2M2.5 6.5h11",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function DatePicker({ value: controlledValue, defaultValue, onValueChange, placeholder = "Select date", label, error, disabled = false, size = "md", locale = "zh", className, ref, ...props }) {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const [open, setOpen] = React$1.useState(false);
	const [viewDate, setViewDate] = React$1.useState(() => parseISODate(value) ?? /* @__PURE__ */ new Date());
	const hasError = Boolean(error);
	const handleSelect = React$1.useCallback((date) => {
		const iso = toISO(date);
		if (controlledValue === void 0) setInternalValue(iso);
		onValueChange?.(iso);
		setViewDate(date);
		setOpen(false);
	}, [controlledValue, onValueChange]);
	const display = formatDisplay(value, locale);
	const trigger = /* @__PURE__ */ jsxs("button", {
		type: "button",
		disabled,
		"data-slot": "date-picker-trigger",
		className: cn(inputControlVariants({
			variant: "outline",
			size,
			hasError,
			disabled
		}), "cursor-pointer justify-between text-left", "focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"),
		children: [/* @__PURE__ */ jsx("span", {
			className: cn("flex-1 font-mono", value ? "text-foreground-display" : "text-foreground-disabled"),
			children: display || placeholder
		}), /* @__PURE__ */ jsx("span", {
			className: inputIconVariants(),
			"data-icon": "end",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx(CalendarIcon, {})
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(datePickerVariants({
			size,
			disabled,
			error: hasError
		}), className),
		"data-slot": "date-picker",
		"data-size": dataAttr(size),
		"data-state": dataAttr(hasError ? "error" : disabled ? "disabled" : "default"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		...props,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "font-mono uppercase tracking-wider text-foreground-muted text-label",
				"data-slot": "date-picker-label",
				children: label
			}),
			disabled ? trigger : /* @__PURE__ */ jsx(Popover, {
				open,
				onOpenChange: setOpen,
				side: "bottom",
				content: /* @__PURE__ */ jsx(DatePickerCalendar, {
					value,
					viewDate,
					onViewDateChange: setViewDate,
					onSelect: handleSelect
				}),
				children: trigger
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				className: "font-mono uppercase tracking-wide text-label text-accent",
				"data-slot": "date-picker-error",
				role: "alert",
				children: error
			})
		]
	});
}
DatePicker.displayName = "DatePicker";
//#endregion
export { DatePicker as default };

//# sourceMappingURL=DatePicker.mjs.map