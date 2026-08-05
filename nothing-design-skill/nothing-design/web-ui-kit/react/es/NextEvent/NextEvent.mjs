import { cn, dataAttr } from "../lib/utils.mjs";
import { useNow } from "../system/hooks.mjs";
import { nextEventCountdownVariants, nextEventDateVariants, nextEventLabelVariants, nextEventMonthVariants, nextEventTitleVariants, nextEventVariants } from "./next-event-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/NextEvent/NextEvent.tsx
const MONTHS = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
];
/**
* 默认 3 条 demo 事件:1 个今天,1 个 3 天后,1 个 1 周后。
* 每次实例化时基于当前时间计算。
*/
function makeDefaultEvents() {
	const now = Date.now();
	const day = 864e5;
	return [
		{
			title: "Design review",
			date: now + 7200 * 1e3
		},
		{
			title: "Sprint planning",
			date: now + 3 * day
		},
		{
			title: "Product launch",
			date: now + 7 * day
		}
	];
}
function formatCountdown(ms) {
	if (ms <= 0) return "NOW";
	const totalMin = Math.floor(ms / 6e4);
	const d = Math.floor(totalMin / 1440);
	const h = Math.floor(totalMin % 1440 / 60);
	const m = totalMin % 60;
	if (d > 0) return `${d}D ${pad2(h)}H ${pad2(m)}M`;
	if (h > 0) return `${h}H ${pad2(m)}M`;
	return `${m}M`;
}
function pad2(n) {
	return String(n).padStart(2, "0");
}
function NextEvent({ className, theme = "dark", priority: priorityProp, event, events, ref, ...props }) {
	const now = useNow(6e4);
	const defaultEvents = React.useMemo(makeDefaultEvents, []);
	let displayEvent;
	if (event) displayEvent = event;
	else if (events && events.length > 0) {
		const sorted = [...events].sort((a, b) => a.date - b.date);
		displayEvent = sorted.find((e) => e.date > now.getTime()) || sorted[0];
	} else {
		const sorted = [...defaultEvents].sort((a, b) => a.date - b.date);
		displayEvent = sorted.find((e) => e.date > now.getTime()) || sorted[0];
	}
	const ts = now.getTime();
	const eventDate = new Date(displayEvent.date);
	const diff = displayEvent.date - ts;
	const real = event !== void 0 || events !== void 0 && events.length > 0;
	const priority = priorityProp ?? (diff > 0 && diff < 1440 * 60 * 1e3 ? "high" : "normal");
	const day = eventDate.getDate();
	const monthStr = MONTHS[eventDate.getMonth()];
	const countdown = formatCountdown(diff);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(nextEventVariants({
			theme,
			priority,
			real
		}), className),
		"data-slot": "next-event",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(real ? "has-event" : "demo"),
		"data-priority": dataAttr(priority),
		"data-real": dataAttr(real),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			"data-slot": "next-event-label",
			className: cn(nextEventLabelVariants({ theme })),
			children: "Next Event:"
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "next-event-content",
			className: "flex items-baseline gap-1",
			children: [
				/* @__PURE__ */ jsx("span", {
					"data-slot": "next-event-title",
					className: cn(nextEventTitleVariants({ theme })),
					children: displayEvent.title
				}),
				/* @__PURE__ */ jsx("span", {
					"data-slot": "next-event-date",
					className: cn(nextEventDateVariants()),
					children: day
				}),
				/* @__PURE__ */ jsx("span", {
					"data-slot": "next-event-month",
					className: cn(nextEventMonthVariants()),
					children: monthStr
				}),
				/* @__PURE__ */ jsx("span", {
					"data-slot": "next-event-countdown",
					className: cn(nextEventCountdownVariants({ priority })),
					children: countdown
				})
			]
		})]
	});
}
NextEvent.displayName = "NextEvent";
//#endregion
export { NextEvent as default };

//# sourceMappingURL=NextEvent.mjs.map