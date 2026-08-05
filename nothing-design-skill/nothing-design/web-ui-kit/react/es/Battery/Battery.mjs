import { cn, dataAttr } from "../lib/utils.mjs";
import DotMatrixIcon from "../components/DotMatrixIcon.mjs";
import { componentIconSvg } from "../widgets/icon-svg-registry.mjs";
import { batteryDeviceIconVariants, batteryDeviceNameVariants, batteryDevicePercentVariants, batteryDeviceVariants, batteryDevicesVariants, batteryPercentVariants, batteryProgressVariants, batteryRingContentVariants, batteryRingIconVariants, batteryRingInnerVariants, batteryRingOuterVariants, batteryRingPercentVariants, batteryRingProgressVariants, batteryRingSvgVariants, batteryRingVariants, batterySegmentVariants, batteryStatusVariants, batteryVariants, batteryWidgetPercentVariants, batteryWidgetStatusVariants } from "./battery-variants.mjs";
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/Battery/Battery.tsx
const CIRCUMFERENCE = 2 * Math.PI * 95;
const BatteryIcon = ({ percent, isCharging, variant }) => {
	const svgKey = isCharging ? "batteryCharging" : percent <= 30 ? "batteryLow" : "batteryNormal";
	if (variant === "dot") return /* @__PURE__ */ jsx(DotMatrixIcon, {
		svg: componentIconSvg[svgKey],
		rows: 16,
		cols: 16,
		dotSize: 2,
		gap: 1,
		alphaThreshold: 100,
		baseColor: "var(--widget-white, #FCFAFE)",
		backgroundColor: "transparent"
	});
	if (isCharging) return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ jsx("path", {
			d: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	if (percent <= 30) return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "6",
				width: "18",
				height: "14",
				rx: "2",
				ry: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "20",
				y: "10",
				width: "2",
				height: "6",
				rx: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "12",
				width: "4",
				height: "4",
				rx: "1",
				fill: "currentColor"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "6",
				width: "18",
				height: "14",
				rx: "2",
				ry: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "20",
				y: "10",
				width: "2",
				height: "6",
				rx: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "10",
				width: "8",
				height: "6",
				rx: "1",
				fill: "currentColor"
			})
		]
	});
};
const DeviceTypeIcon = ({ type, variant }) => {
	if (variant === "dot") return /* @__PURE__ */ jsx(DotMatrixIcon, {
		svg: componentIconSvg[`device${type.charAt(0).toUpperCase() + type.slice(1)}`],
		rows: 16,
		cols: 16,
		dotSize: 2,
		gap: 1,
		alphaThreshold: 100,
		baseColor: "var(--widget-white, #FCFAFE)",
		backgroundColor: "transparent"
	});
	switch (type) {
		case "mouse": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "2",
				width: "12",
				height: "20",
				rx: "6",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}), /* @__PURE__ */ jsx("line", {
				x1: "12",
				y1: "2",
				x2: "12",
				y2: "10",
				stroke: "currentColor",
				strokeWidth: "1.5"
			})]
		});
		case "keyboard": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "1",
					y: "6",
					width: "22",
					height: "12",
					rx: "2",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "5",
					y1: "10",
					x2: "7",
					y2: "10",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "9",
					y1: "10",
					x2: "11",
					y2: "10",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "13",
					y1: "10",
					x2: "15",
					y2: "10",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "17",
					y1: "10",
					x2: "19",
					y2: "10",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "7",
					y1: "14",
					x2: "17",
					y2: "14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})
			]
		});
		case "earbuds": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "7",
					cy: "7",
					r: "4",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "17",
					cy: "7",
					r: "4",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M7 11v5a4 4 0 0 0 4 4",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M17 11v5a4 4 0 0 1-4 4",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})
			]
		});
		case "phone": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ jsx("rect", {
				x: "5",
				y: "2",
				width: "14",
				height: "20",
				rx: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}), /* @__PURE__ */ jsx("line", {
				x1: "10",
				y1: "18",
				x2: "14",
				y2: "18",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})]
		});
		case "watch": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "6",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M9 2h6l-1 4H10L9 2z",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M9 22h6l-1-4H10L9 22z",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinejoin: "round"
				})
			]
		});
	}
};
const SmallBatteryIcon = ({ percent }) => {
	const fillWidth = Math.max(1, Math.round(percent / 100 * 8));
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 16 10",
		xmlns: "http://www.w3.org/2000/svg",
		"data-slot": "battery-device-battery-icon",
		className: "h-2.5 w-4 text-[var(--widget-dark-4)]",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "0.5",
				y: "0.5",
				width: "13",
				height: "9",
				rx: "1.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "14",
				y: "3",
				width: "2",
				height: "4",
				rx: "0.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "2",
				width: fillWidth,
				height: "6",
				rx: "0.5",
				fill: "currentColor"
			})
		]
	});
};
const ChargingIcon = () => /* @__PURE__ */ jsx("svg", {
	viewBox: "0 0 12 12",
	xmlns: "http://www.w3.org/2000/svg",
	"data-slot": "battery-device-charging-icon",
	className: "size-2.5 text-success",
	children: /* @__PURE__ */ jsx("path", {
		d: "M7 1L2 7h4l-1 4 5-6H6l1-4z",
		fill: "currentColor"
	})
});
const DeviceList = ({ devices, onDeviceClick, widgetCard = false }) => /* @__PURE__ */ jsx("div", {
	"data-slot": "battery-devices",
	className: cn(batteryDevicesVariants({ widgetCard })),
	children: devices.map((device, idx) => /* @__PURE__ */ jsxs("div", {
		"data-slot": "battery-device",
		className: cn(batteryDeviceVariants({ clickable: !!onDeviceClick })),
		onClick: onDeviceClick ? () => onDeviceClick(device) : void 0,
		role: onDeviceClick ? "button" : void 0,
		tabIndex: onDeviceClick ? 0 : void 0,
		onKeyDown: onDeviceClick ? (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onDeviceClick(device);
			}
		} : void 0,
		"data-state": dataAttr(device.isCharging ? "charging" : device.percent <= 20 ? "low" : "normal"),
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "battery-device-icon",
				className: cn(batteryDeviceIconVariants()),
				children: /* @__PURE__ */ jsx(DeviceTypeIcon, { type: device.type })
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "battery-device-name",
				className: cn(batteryDeviceNameVariants()),
				children: device.name
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "battery-device-level",
				className: "flex shrink-0 items-center gap-1",
				children: [
					device.isCharging && /* @__PURE__ */ jsx(ChargingIcon, {}),
					/* @__PURE__ */ jsxs("span", {
						"data-slot": "battery-device-percent",
						className: cn(batteryDevicePercentVariants()),
						children: [device.percent, "%"]
					}),
					/* @__PURE__ */ jsx(SmallBatteryIcon, { percent: device.percent })
				]
			})
		]
	}, idx))
});
function Battery({ updateInterval = 5e3, totalSegments = 10, percent: initialPercent, isCharging: initialIsCharging, variant = "segmented", theme = "dark", widgetMode = "none", devices, onDeviceClick, className, ref, ...props }) {
	const [internalPercent, setInternalPercent] = React.useState(initialPercent ?? 75);
	const [internalIsCharging, setInternalIsCharging] = React.useState(initialIsCharging ?? false);
	const percent = initialPercent ?? internalPercent;
	const isCharging = initialIsCharging ?? internalIsCharging;
	React.useEffect(() => {
		if (initialPercent !== void 0 || initialIsCharging !== void 0) return;
		const updateBattery = async () => {
			try {
				if ("getBattery" in navigator) {
					const battery = await navigator.getBattery();
					setInternalPercent(Math.round(battery.level * 100));
					setInternalIsCharging(battery.charging);
				}
			} catch {
				const demoPercent = 75;
				const demoCharging = Math.random() > .5;
				setInternalPercent(demoPercent);
				setInternalIsCharging(demoCharging);
			}
		};
		updateBattery();
		const timer = setInterval(updateBattery, updateInterval);
		return () => clearInterval(timer);
	}, [
		updateInterval,
		initialPercent,
		initialIsCharging
	]);
	const ringDashOffset = React.useMemo(() => {
		return CIRCUMFERENCE - percent / 100 * CIRCUMFERENCE;
	}, [percent]);
	const filledSegments = Math.round(percent / 100 * totalSegments);
	let batteryLevel = "high";
	if (isCharging) batteryLevel = "high";
	else if (percent <= 10) batteryLevel = "critical";
	else if (percent <= 20) batteryLevel = "low";
	else if (percent <= 50) batteryLevel = "medium";
	const ringStatus = isCharging ? "charging" : percent <= 30 ? "low" : percent <= 80 ? "mid" : "full";
	const meterProps = {
		role: "meter",
		"aria-valuenow": percent,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": `Battery at ${percent}%, ${isCharging ? "charging" : "discharging"}`
	};
	const renderSegments = (widgetCard) => Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", {
		"data-slot": "battery-segment",
		"data-filled": dataAttr(index < filledSegments),
		className: cn(batterySegmentVariants({
			filled: index < filledSegments,
			level: batteryLevel,
			widgetCard
		}))
	}, index));
	const renderRing = (widgetCard) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
		"data-slot": "battery-ring-svg",
		className: cn(batteryRingSvgVariants({ widgetCard })),
		viewBox: "0 0 200 200",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				"data-slot": "battery-ring-outer",
				className: cn(batteryRingOuterVariants({ theme })),
				cx: "100",
				cy: "100",
				r: "95"
			}),
			/* @__PURE__ */ jsx("circle", {
				"data-slot": "battery-ring-inner",
				className: cn(batteryRingInnerVariants({ theme })),
				cx: "100",
				cy: "100",
				r: "85"
			}),
			/* @__PURE__ */ jsx("circle", {
				"data-slot": "battery-ring-progress",
				className: cn(batteryRingProgressVariants({ status: ringStatus })),
				cx: "100",
				cy: "100",
				r: "95",
				strokeDasharray: `${CIRCUMFERENCE} ${CIRCUMFERENCE}`,
				strokeDashoffset: ringDashOffset
			})
		]
	}), /* @__PURE__ */ jsxs("div", {
		"data-slot": "battery-ring-content",
		className: cn(batteryRingContentVariants({ widgetCard })),
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "battery-ring-icon",
			className: cn(batteryRingIconVariants({ theme })),
			children: /* @__PURE__ */ jsx(BatteryIcon, {
				percent,
				isCharging
			})
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "battery-ring-percent",
			className: cn(batteryRingPercentVariants({ theme })),
			children: [percent, "%"]
		})]
	})] });
	if (widgetMode === "card") return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(batteryVariants({
			variant: "segmented",
			theme,
			level: batteryLevel,
			widgetMode: "card"
		}), className),
		...meterProps,
		"data-slot": "battery",
		"data-variant": "segmented",
		"data-widget-mode": "card",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(isCharging ? "charging" : batteryLevel),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "battery-widget-percent",
				className: cn(batteryWidgetPercentVariants()),
				children: [percent, "%"]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "battery-widget-status",
				"data-charging": dataAttr(isCharging),
				className: cn(batteryWidgetStatusVariants({ charging: isCharging })),
				children: isCharging ? "Charging" : "Discharging"
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "battery-progress",
				className: cn(batteryProgressVariants({ widgetCard: true })),
				children: renderSegments(true)
			}),
			devices && devices.length > 0 && /* @__PURE__ */ jsx(DeviceList, {
				devices,
				onDeviceClick
			})
		]
	});
	if (widgetMode === "ring") return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(batteryRingVariants({
			theme,
			status: ringStatus
		}), batteryVariants({ widgetMode: "ring" }), className),
		...meterProps,
		"data-slot": "battery",
		"data-variant": "ring",
		"data-widget-mode": "ring",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(ringStatus),
		...props,
		children: [renderRing(true), devices && devices.length > 0 && /* @__PURE__ */ jsx(DeviceList, {
			devices,
			onDeviceClick,
			widgetCard: true
		})]
	});
	if (variant === "ring") return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(batteryRingVariants({
			theme,
			status: ringStatus
		}), className),
		"data-slot": "battery",
		"data-variant": "ring",
		"data-widget-mode": "none",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(ringStatus),
		...props,
		children: renderRing(false)
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(batteryVariants({
			variant: "segmented",
			theme,
			level: batteryLevel
		}), className),
		...meterProps,
		"data-slot": "battery",
		"data-variant": "segmented",
		"data-widget-mode": "none",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(batteryLevel),
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			"data-slot": "battery-header",
			className: "mb-4 flex w-full items-baseline justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				"data-slot": "battery-percent",
				className: cn(batteryPercentVariants()),
				children: [percent, "%"]
			}), /* @__PURE__ */ jsx("div", {
				"data-slot": "battery-status",
				"data-charging": dataAttr(isCharging),
				className: cn(batteryStatusVariants({ charging: isCharging })),
				children: isCharging ? "Charging" : "Discharging"
			})]
		}), /* @__PURE__ */ jsx("div", {
			"data-slot": "battery-progress",
			className: cn(batteryProgressVariants()),
			children: renderSegments(false)
		})]
	});
}
Battery.displayName = "Battery";
//#endregion
export { Battery as default };

//# sourceMappingURL=Battery.mjs.map