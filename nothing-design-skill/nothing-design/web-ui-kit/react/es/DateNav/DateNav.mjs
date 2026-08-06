import { cn, dataAttr } from "../lib/utils.mjs";
import { dateNavArrowVariants, dateNavLabelVariants, dateNavVariants } from "./date-nav-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/DateNav/DateNav.tsx
const MONTH_NAMES = [
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
function formatMonth(d) {
	return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}
function shiftMonth(d, delta) {
	const nd = new Date(d);
	nd.setDate(1);
	nd.setMonth(nd.getMonth() + delta);
	return nd;
}
function DateNav({ className, label, prevDisabled = false, nextDisabled = false, grotesk = false, disabled = false, onPrev, onNext, initialDate, currentDate: currentDateProp, onDateChange, ref, ...props }) {
	const isDisabled = !!disabled;
	const isControlled = currentDateProp !== void 0;
	const [internalDate, setInternalDate] = React$1.useState(() => initialDate ?? /* @__PURE__ */ new Date());
	const currentDate = isControlled ? currentDateProp : internalDate;
	const displayLabel = label ?? formatMonth(currentDate);
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();
	const real = !(label !== void 0);
	const handlePrev = () => {
		if (onPrev) onPrev();
		if (!isControlled) {
			const next = shiftMonth(currentDate, -1);
			setInternalDate(next);
			onDateChange?.(next);
		}
	};
	const handleNext = () => {
		if (onNext) onNext();
		if (!isControlled) {
			const next = shiftMonth(currentDate, 1);
			setInternalDate(next);
			onDateChange?.(next);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dateNavVariants({ disabled: isDisabled }), className),
		"data-slot": "date-nav",
		"data-disabled": dataAttr(isDisabled),
		"data-month": dataAttr(month),
		"data-year": dataAttr(year),
		"data-real": dataAttr(real),
		...props,
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"data-slot": "date-nav-arrow",
				"data-direction": "prev",
				"data-disabled": dataAttr(prevDisabled || isDisabled),
				className: cn(dateNavArrowVariants({ disabled: prevDisabled })),
				onClick: handlePrev,
				disabled: prevDisabled || isDisabled,
				"aria-label": "Previous",
				children: "<"
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "date-nav-label",
				className: cn(dateNavLabelVariants({ grotesk })),
				children: displayLabel
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"data-slot": "date-nav-arrow",
				"data-direction": "next",
				"data-disabled": dataAttr(nextDisabled || isDisabled),
				className: cn(dateNavArrowVariants({ disabled: nextDisabled })),
				onClick: handleNext,
				disabled: nextDisabled || isDisabled,
				"aria-label": "Next",
				children: ">"
			})
		]
	});
}
DateNav.displayName = "DateNav";
//#endregion
export { DateNav as default };

//# sourceMappingURL=DateNav.mjs.map