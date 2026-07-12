import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./SystemMonitor.css";
//#region src/SystemMonitor/SystemMonitor.tsx
const systemMonitorVariants = cva("nothing-system-monitor", {
	variants: {
		variant: {
			default: "",
			compact: "nothing-system-monitor--compact",
			detailed: "nothing-system-monitor--detailed"
		},
		size: {
			sm: "nothing-system-monitor--sm",
			md: "nothing-system-monitor--md",
			lg: "nothing-system-monitor--lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
const monitorItemVariants = cva("monitor-item", {
	variants: {
		type: {
			cpu: "cpu",
			ram: "ram",
			storage: "storage",
			network: "network",
			battery: "battery"
		},
		status: {
			none: "",
			warning: "warning",
			critical: "critical",
			charging: "charging",
			low: "low",
			connected: "connected",
			disconnected: "disconnected"
		}
	},
	defaultVariants: {
		type: "cpu",
		status: "none"
	}
});
const monitorSegmentVariants = cva("monitor-segment", {
	variants: { filled: {
		true: "filled",
		false: ""
	} },
	defaultVariants: { filled: false }
});
const SystemMonitor = React$1.forwardRef(({ className, variant = "default", size = "md", updateInterval = 2e3, totalSegments = 12, cpuPercent: initialCpuPercent, ramPercent: initialRamPercent, storagePercent: initialStoragePercent, ramTotal = 8, storageTotal = 256, netConnected: initialNetConnected, netSpeed: initialNetSpeed, batteryPercent: initialBatteryPercent, batteryCharging: initialBatteryCharging, ...props }, ref) => {
	const [internalCpuPercent, setInternalCpuPercent] = React$1.useState(initialCpuPercent ?? 42);
	const [internalRamPercent, setInternalRamPercent] = React$1.useState(initialRamPercent ?? 67);
	const [internalStoragePercent, setInternalStoragePercent] = React$1.useState(initialStoragePercent ?? 54);
	const [internalNetConnected, setInternalNetConnected] = React$1.useState(initialNetConnected ?? true);
	const [internalNetSpeed, setInternalNetSpeed] = React$1.useState(initialNetSpeed ?? 12.5);
	const [internalBatteryPercent, setInternalBatteryPercent] = React$1.useState(initialBatteryPercent ?? 85);
	const [internalBatteryCharging, setInternalBatteryCharging] = React$1.useState(initialBatteryCharging ?? false);
	const cpuPercent = initialCpuPercent ?? internalCpuPercent;
	const ramPercent = initialRamPercent ?? internalRamPercent;
	const storagePercent = initialStoragePercent ?? internalStoragePercent;
	const netConnected = initialNetConnected ?? internalNetConnected;
	const netSpeed = initialNetSpeed ?? internalNetSpeed;
	const batteryPercent = initialBatteryPercent ?? internalBatteryPercent;
	const batteryCharging = initialBatteryCharging ?? internalBatteryCharging;
	React$1.useEffect(() => {
		if (initialCpuPercent !== void 0 || initialRamPercent !== void 0 || initialStoragePercent !== void 0 || initialNetConnected !== void 0 || initialNetSpeed !== void 0 || initialBatteryPercent !== void 0 || initialBatteryCharging !== void 0) return;
		const updateDemo = () => {
			setInternalCpuPercent(35 + Math.floor(Math.random() * 25));
			setInternalRamPercent(45 + Math.floor(Math.random() * 30));
			setInternalStoragePercent(60 + Math.floor(Math.random() * 20));
			setInternalNetConnected(Math.random() > .1);
			setInternalNetSpeed(parseFloat((5 + Math.random() * 20).toFixed(1)));
		};
		const updateBattery = async () => {
			try {
				if ("getBattery" in navigator) {
					const battery = await navigator.getBattery();
					setInternalBatteryPercent(Math.round(battery.level * 100));
					setInternalBatteryCharging(battery.charging);
				}
			} catch {
				setInternalBatteryPercent(85);
				setInternalBatteryCharging(Math.random() > .5);
			}
		};
		updateDemo();
		updateBattery();
		const timer = setInterval(() => {
			updateDemo();
			updateBattery();
		}, updateInterval);
		return () => clearInterval(timer);
	}, [
		updateInterval,
		initialCpuPercent,
		initialRamPercent,
		initialStoragePercent,
		initialNetConnected,
		initialNetSpeed,
		initialBatteryPercent,
		initialBatteryCharging
	]);
	const getStatusClass = (percent) => {
		if (percent >= 90) return "critical";
		if (percent >= 75) return "warning";
		return "none";
	};
	const getBatteryStatus = (percent, charging) => {
		if (charging) return "charging";
		if (percent <= 10) return "critical";
		if (percent <= 20) return "low";
		return "none";
	};
	const cpuFilledSegments = Math.round(cpuPercent / 100 * totalSegments);
	const ramFilledSegments = Math.round(ramPercent / 100 * totalSegments);
	const storageFilledSegments = Math.round(storagePercent / 100 * totalSegments);
	const netPercent = Math.min(100, netSpeed / 50 * 100);
	const netFilledSegments = Math.round(netPercent / 100 * totalSegments);
	const batteryFilledSegments = Math.round(batteryPercent / 100 * totalSegments);
	const ramUsed = (ramTotal * ramPercent / 100).toFixed(1);
	const storageUsed = (storageTotal * storagePercent / 100).toFixed(0);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(systemMonitorVariants({
			variant,
			size
		}), className),
		"data-state": dataAttr("monitoring"),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "monitor-header",
				children: /* @__PURE__ */ jsx("div", {
					className: "monitor-title",
					children: "System"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn(monitorItemVariants({
					type: "cpu",
					status: getStatusClass(cpuPercent)
				})),
				"data-state": dataAttr(getStatusClass(cpuPercent)),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "monitor-item-header-row",
					children: [/* @__PURE__ */ jsx("div", {
						className: "monitor-item-label",
						children: "CPU"
					}), /* @__PURE__ */ jsxs("div", {
						className: "monitor-item-value",
						children: [cpuPercent, "%"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "monitor-progress",
					children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn(monitorSegmentVariants({ filled: index < cpuFilledSegments })) }, index))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn(monitorItemVariants({
					type: "ram",
					status: getStatusClass(ramPercent)
				})),
				"data-state": dataAttr(getStatusClass(ramPercent)),
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "monitor-item-header-row",
						children: [/* @__PURE__ */ jsx("div", {
							className: "monitor-item-label",
							children: "RAM"
						}), /* @__PURE__ */ jsxs("div", {
							className: "monitor-item-value",
							children: [ramPercent, "%"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "monitor-item-details",
						children: [
							ramUsed,
							" / ",
							ramTotal,
							" GB"
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "monitor-progress",
						children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn(monitorSegmentVariants({ filled: index < ramFilledSegments })) }, index))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn(monitorItemVariants({
					type: "storage",
					status: getStatusClass(storagePercent)
				})),
				"data-state": dataAttr(getStatusClass(storagePercent)),
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "monitor-item-header-row",
						children: [/* @__PURE__ */ jsx("div", {
							className: "monitor-item-label",
							children: "Storage"
						}), /* @__PURE__ */ jsxs("div", {
							className: "monitor-item-value",
							children: [storagePercent, "%"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "monitor-item-details",
						children: [
							storageUsed,
							" / ",
							storageTotal,
							" GB"
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "monitor-progress",
						children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn(monitorSegmentVariants({ filled: index < storageFilledSegments })) }, index))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn(monitorItemVariants({
					type: "network",
					status: netConnected ? "connected" : "disconnected"
				})),
				"data-state": dataAttr(netConnected ? "connected" : "disconnected"),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "monitor-item-header-row",
					children: [/* @__PURE__ */ jsx("div", {
						className: "monitor-item-label",
						children: "NET"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
						className: "monitor-item-value",
						children: [netSpeed, " MB/s"]
					}), /* @__PURE__ */ jsx("span", {
						className: `monitor-item-status ${netConnected ? "connected" : "disconnected"}`,
						children: netConnected ? "Connected" : "Disconnected"
					})] })]
				}), /* @__PURE__ */ jsx("div", {
					className: "monitor-progress",
					children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn(monitorSegmentVariants({ filled: index < netFilledSegments })) }, index))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn(monitorItemVariants({
					type: "battery",
					status: getBatteryStatus(batteryPercent, batteryCharging)
				})),
				"data-state": dataAttr(getBatteryStatus(batteryPercent, batteryCharging)),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "monitor-item-header-row",
					children: [/* @__PURE__ */ jsx("div", {
						className: "monitor-item-label",
						children: "Battery"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
						className: "monitor-item-value",
						children: [batteryPercent, "%"]
					}), /* @__PURE__ */ jsx("span", {
						className: `monitor-item-status ${batteryCharging ? "charging" : "discharging"}`,
						children: batteryCharging ? "Charging" : "Discharging"
					})] })]
				}), /* @__PURE__ */ jsx("div", {
					className: "monitor-progress",
					children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn(monitorSegmentVariants({ filled: index < batteryFilledSegments })) }, index))
				})]
			})
		]
	});
});
SystemMonitor.displayName = "SystemMonitor";
//#endregion
export { SystemMonitor as default, monitorItemVariants, monitorSegmentVariants, systemMonitorVariants };

//# sourceMappingURL=SystemMonitor.mjs.map