import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Calendar.css";
//#region src/Calendar/Calendar.tsx
const calendarVariants = cva("", {
	variants: { type: {
		compact: "nothing-calendar-compact",
		full: "nothing-calendar-full"
	} },
	defaultVariants: { type: "compact" }
});
const dayVariants = cva("calendar-day", {
	variants: {
		isOtherMonth: {
			true: "other-month",
			false: ""
		},
		isToday: {
			true: "today",
			false: ""
		}
	},
	defaultVariants: {
		isOtherMonth: false,
		isToday: false
	}
});
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
const months = [
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
const weekdays = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
];
const Calendar = React.forwardRef(({ className, type = "compact", initialDate = /* @__PURE__ */ new Date(), ...props }, ref) => {
	const [currentDate, setCurrentDate] = React.useState(initialDate);
	const dayName = days[currentDate.getDay()];
	const date = currentDate.getDate();
	const monthName = months[currentDate.getMonth()];
	const monthYear = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
	const getCalendarDays = () => {
		const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
		const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
		const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
		const today = /* @__PURE__ */ new Date();
		const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
		const calendarDays = [];
		for (let i = firstDay - 1; i >= 0; i--) calendarDays.push({
			day: prevLastDay - i,
			isOtherMonth: true,
			isToday: false
		});
		for (let i = 1; i <= lastDay; i++) {
			const isToday = isCurrentMonth && today.getDate() === i;
			calendarDays.push({
				day: i,
				isOtherMonth: false,
				isToday
			});
		}
		const remainingDays = 42 - calendarDays.length;
		for (let i = 1; i <= remainingDays; i++) calendarDays.push({
			day: i,
			isOtherMonth: true,
			isToday: false
		});
		return calendarDays;
	};
	const handlePrevMonth = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	};
	const handleNextMonth = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	};
	if (type === "compact") return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(calendarVariants({ type }), className),
		"data-type": dataAttr(type),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "calendar-compact-day",
				children: dayName
			}),
			/* @__PURE__ */ jsx("div", {
				className: "calendar-compact-date",
				children: String(date).padStart(2, "0")
			}),
			/* @__PURE__ */ jsx("div", {
				className: "calendar-compact-month",
				children: monthName
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(calendarVariants({ type }), className),
		"data-type": dataAttr(type),
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "calendar-full-header",
			children: [/* @__PURE__ */ jsx("div", {
				className: "calendar-full-month-year",
				children: monthYear
			}), /* @__PURE__ */ jsxs("div", {
				className: "calendar-full-nav",
				children: [/* @__PURE__ */ jsx("button", {
					className: "calendar-nav-btn",
					onClick: handlePrevMonth,
					"aria-label": "Previous month",
					children: "<"
				}), /* @__PURE__ */ jsx("button", {
					className: "calendar-nav-btn",
					onClick: handleNextMonth,
					"aria-label": "Next month",
					children: ">"
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "calendar-grid",
			role: "grid",
			children: [weekdays.map((day, index) => /* @__PURE__ */ jsx("div", {
				className: "calendar-weekday",
				children: day
			}, index)), getCalendarDays().map((day, index) => /* @__PURE__ */ jsx("div", {
				className: cn(dayVariants({
					isOtherMonth: day.isOtherMonth,
					isToday: day.isToday
				})),
				children: day.day
			}, index))]
		})]
	});
});
Calendar.displayName = "Calendar";
//#endregion
export { Calendar, Calendar as default, calendarVariants, dayVariants };

//# sourceMappingURL=Calendar.mjs.map