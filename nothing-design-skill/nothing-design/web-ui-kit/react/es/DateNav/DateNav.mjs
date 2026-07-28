import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./DateNav.css";
//#region src/DateNav/DateNav.tsx
const dateNavVariants = cva("nothing-date-nav", {
	variants: { disabled: {
		true: "nothing-date-nav--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const dateNavLabelVariants = cva("nothing-date-nav__label", {
	variants: { grotesk: {
		true: "nothing-date-nav__label--grotesk",
		false: ""
	} },
	defaultVariants: { grotesk: false }
});
const dateNavArrowVariants = cva("nothing-date-nav__arrow", {
	variants: { disabled: {
		true: "nothing-date-nav__arrow--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
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
const DateNav = React.forwardRef(({ className, label, prevDisabled = false, nextDisabled = false, grotesk = false, disabled = false, onPrev, onNext, initialDate, currentDate: currentDateProp, onDateChange, ...props }, ref) => {
	const isDisabled = !!disabled;
	const isControlled = currentDateProp !== void 0;
	const [internalDate, setInternalDate] = React.useState(() => initialDate ?? /* @__PURE__ */ new Date());
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
		"data-disabled": dataAttr(isDisabled),
		"data-month": dataAttr(month),
		"data-year": dataAttr(year),
		"data-real": dataAttr(real),
		...props,
		children: [
			/* @__PURE__ */ jsx("button", {
				className: cn(dateNavArrowVariants({ disabled: prevDisabled })),
				onClick: handlePrev,
				disabled: prevDisabled || isDisabled,
				"aria-label": "Previous",
				children: "<"
			}),
			/* @__PURE__ */ jsx("div", {
				className: cn(dateNavLabelVariants({ grotesk })),
				children: displayLabel
			}),
			/* @__PURE__ */ jsx("button", {
				className: cn(dateNavArrowVariants({ disabled: nextDisabled })),
				onClick: handleNext,
				disabled: nextDisabled || isDisabled,
				"aria-label": "Next",
				children: ">"
			})
		]
	});
});
DateNav.displayName = "DateNav";
//#endregion
export { DateNav, DateNav as default, dateNavArrowVariants, dateNavLabelVariants, dateNavVariants };

//# sourceMappingURL=DateNav.mjs.map