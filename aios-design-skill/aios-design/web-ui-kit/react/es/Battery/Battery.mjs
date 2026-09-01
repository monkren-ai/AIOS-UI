import { cn, dataAttr } from "../lib/utils.mjs";
import { batteryDeviceVariants, batteryPercentVariants, batteryProgressVariants, batteryRingVariants, batterySegmentVariants, batteryStatusVariants, batteryVariants } from "./battery-variants.mjs";
import * as React$1 from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/Battery/Battery.tsx
const CIRCUMFERENCE = 2 * Math.PI * 52;
function levelFor(percent, charging) {
	if (charging || percent > 50) return "high";
	if (percent <= 10) return "critical";
	if (percent <= 20) return "low";
	return "medium";
}
function Battery({ updateInterval = 5e3, totalSegments = 10, percent: controlledPercent, isCharging: controlledCharging, variant = "segmented", devices, onDeviceClick, className, ref, ...props }) {
	const [internalPercent, setInternalPercent] = React$1.useState(controlledPercent ?? 75);
	const [internalCharging, setInternalCharging] = React$1.useState(controlledCharging ?? false);
	const percent = Math.max(0, Math.min(100, controlledPercent ?? internalPercent));
	const isCharging = controlledCharging ?? internalCharging;
	React$1.useEffect(() => {
		if (controlledPercent !== void 0 || controlledCharging !== void 0) return;
		const update = async () => {
			const batteryNavigator = navigator;
			if (!batteryNavigator.getBattery) return;
			try {
				const value = await batteryNavigator.getBattery();
				setInternalPercent(Math.round(value.level * 100));
				setInternalCharging(value.charging);
			} catch {}
		};
		update();
		const timer = setInterval(() => void update(), updateInterval);
		return () => clearInterval(timer);
	}, [
		controlledCharging,
		controlledPercent,
		updateInterval
	]);
	const level = levelFor(percent, isCharging);
	const filled = Math.round(percent / 100 * totalSegments);
	const meter = {
		role: "meter",
		"aria-valuenow": percent,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": `Battery at ${percent}%, ${isCharging ? "charging" : "discharging"}`
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(batteryVariants({
			variant,
			level
		}), className),
		"data-slot": "battery",
		"data-variant": dataAttr(variant),
		"data-state": dataAttr(isCharging ? "charging" : level),
		...meter,
		...props,
		children: [variant === "ring" ? /* @__PURE__ */ jsxs("div", {
			className: cn(batteryRingVariants()),
			children: [/* @__PURE__ */ jsxs("svg", {
				className: "absolute inset-2 size-36 -rotate-90",
				viewBox: "0 0 120 120",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("circle", {
					cx: "60",
					cy: "60",
					r: "52",
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: "8"
				}), /* @__PURE__ */ jsx("circle", {
					cx: "60",
					cy: "60",
					r: "52",
					fill: "none",
					stroke: isCharging ? "var(--success)" : level === "low" || level === "critical" ? "var(--warning)" : "var(--accent)",
					strokeWidth: "8",
					strokeLinecap: "round",
					strokeDasharray: CIRCUMFERENCE,
					strokeDashoffset: CIRCUMFERENCE * (1 - percent / 100)
				})]
			}), /* @__PURE__ */ jsxs("span", {
				className: "relative font-display text-heading tabular-nums text-foreground-display",
				children: [percent, "%"]
			})]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex w-full items-baseline justify-between",
			children: [/* @__PURE__ */ jsxs("span", {
				className: cn(batteryPercentVariants()),
				children: [percent, "%"]
			}), /* @__PURE__ */ jsx("span", {
				className: cn(batteryStatusVariants({ charging: isCharging })),
				children: isCharging ? "Charging" : "Discharging"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: cn(batteryProgressVariants()),
			children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("span", {
				"data-filled": dataAttr(index < filled),
				className: cn(batterySegmentVariants({
					filled: index < filled,
					level
				}))
			}, index))
		})] }), devices?.length ? /* @__PURE__ */ jsx("div", {
			className: "mt-4 flex w-full flex-col border-t border-border pt-2",
			children: devices.map((device) => /* @__PURE__ */ jsxs("div", {
				className: cn(batteryDeviceVariants({ clickable: Boolean(onDeviceClick) })),
				role: onDeviceClick ? "button" : void 0,
				tabIndex: onDeviceClick ? 0 : void 0,
				onClick: () => onDeviceClick?.(device),
				onKeyDown: (event) => {
					if (onDeviceClick && (event.key === "Enter" || event.key === " ")) {
						event.preventDefault();
						onDeviceClick(device);
					}
				},
				children: [
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "font-mono text-label uppercase text-foreground-subtle",
						children: device.type.slice(0, 2)
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate text-body-sm text-foreground",
						children: device.name
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "font-mono text-caption tabular-nums text-foreground-muted",
						children: [
							device.isCharging ? "↯ " : "",
							device.percent,
							"%"
						]
					})
				]
			}, `${device.type}-${device.name}`))
		}) : null]
	});
}
Battery.displayName = "Battery";
//#endregion
export { Battery as default };

//# sourceMappingURL=Battery.mjs.map