import { cn, dataAttr } from "../lib/utils.mjs";
import { monitorItemDetailsVariants, monitorItemLabelVariants, monitorItemStatusVariants, monitorItemValueVariants, monitorItemVariants, monitorSegmentVariants, monitorTitleVariants, systemMonitorVariants } from "./system-monitor-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/SystemMonitor/SystemMonitor.tsx
function SystemMonitor({ className, variant = "default", size = "md", updateInterval = 2e3, totalSegments = 12, cpuPercent: initialCpuPercent, ramPercent: initialRamPercent, storagePercent: initialStoragePercent, ramTotal = 8, storageTotal = 256, netConnected: initialNetConnected, netSpeed: initialNetSpeed, batteryPercent: initialBatteryPercent, batteryCharging: initialBatteryCharging, ref, ...props }) {
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
				const batteryNavigator = navigator;
				if (batteryNavigator.getBattery) {
					const battery = await batteryNavigator.getBattery();
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
	const renderProgress = (type, status, filled) => /* @__PURE__ */ jsx("div", {
		"data-slot": "monitor-progress",
		className: "flex h-3 w-full gap-0.5",
		children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", {
			"data-slot": "monitor-segment",
			"data-filled": dataAttr(index < filled),
			className: cn(monitorSegmentVariants({
				filled: index < filled,
				type,
				status
			}))
		}, index))
	});
	const cpuStatus = getStatusClass(cpuPercent);
	const ramStatus = getStatusClass(ramPercent);
	const storageStatus = getStatusClass(storagePercent);
	const netStatus = netConnected ? "connected" : "disconnected";
	const batteryStatus = getBatteryStatus(batteryPercent, batteryCharging);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(systemMonitorVariants({
			variant,
			size
		}), className),
		"data-slot": "system-monitor",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		"data-state": dataAttr("monitoring"),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "monitor-header",
				className: "mb-6 flex w-full items-baseline justify-between",
				children: /* @__PURE__ */ jsx("div", {
					"data-slot": "monitor-title",
					className: cn(monitorTitleVariants()),
					children: "System"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "monitor-item",
				"data-type": "cpu",
				className: cn(monitorItemVariants({
					type: "cpu",
					status: cpuStatus
				})),
				"data-state": dataAttr(cpuStatus),
				children: [/* @__PURE__ */ jsxs("div", {
					"data-slot": "monitor-item-header",
					className: "mb-1 flex items-baseline justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						"data-slot": "monitor-item-label",
						className: cn(monitorItemLabelVariants()),
						children: "CPU"
					}), /* @__PURE__ */ jsxs("div", {
						"data-slot": "monitor-item-value",
						className: cn(monitorItemValueVariants({ status: cpuStatus })),
						children: [cpuPercent, "%"]
					})]
				}), renderProgress("cpu", cpuStatus, cpuFilledSegments)]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "monitor-item",
				"data-type": "ram",
				className: cn(monitorItemVariants({
					type: "ram",
					status: ramStatus
				})),
				"data-state": dataAttr(ramStatus),
				children: [
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "monitor-item-header",
						className: "mb-1 flex items-baseline justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							"data-slot": "monitor-item-label",
							className: cn(monitorItemLabelVariants()),
							children: "RAM"
						}), /* @__PURE__ */ jsxs("div", {
							"data-slot": "monitor-item-value",
							className: cn(monitorItemValueVariants({ status: ramStatus })),
							children: [ramPercent, "%"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "monitor-item-details",
						className: cn(monitorItemDetailsVariants()),
						children: [
							ramUsed,
							" / ",
							ramTotal,
							" GB"
						]
					}),
					renderProgress("ram", ramStatus, ramFilledSegments)
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "monitor-item",
				"data-type": "storage",
				className: cn(monitorItemVariants({
					type: "storage",
					status: storageStatus
				})),
				"data-state": dataAttr(storageStatus),
				children: [
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "monitor-item-header",
						className: "mb-1 flex items-baseline justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							"data-slot": "monitor-item-label",
							className: cn(monitorItemLabelVariants()),
							children: "Storage"
						}), /* @__PURE__ */ jsxs("div", {
							"data-slot": "monitor-item-value",
							className: cn(monitorItemValueVariants({ status: storageStatus })),
							children: [storagePercent, "%"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "monitor-item-details",
						className: cn(monitorItemDetailsVariants()),
						children: [
							storageUsed,
							" / ",
							storageTotal,
							" GB"
						]
					}),
					renderProgress("storage", storageStatus, storageFilledSegments)
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "monitor-item",
				"data-type": "network",
				className: cn(monitorItemVariants({
					type: "network",
					status: netStatus
				})),
				"data-state": dataAttr(netStatus),
				children: [/* @__PURE__ */ jsxs("div", {
					"data-slot": "monitor-item-header",
					className: "mb-1 flex items-baseline justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						"data-slot": "monitor-item-label",
						className: cn(monitorItemLabelVariants()),
						children: "NET"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
						"data-slot": "monitor-item-value",
						className: cn(monitorItemValueVariants()),
						children: [netSpeed, " MB/s"]
					}), /* @__PURE__ */ jsx("span", {
						"data-slot": "monitor-item-status",
						"data-tone": netConnected ? "connected" : "disconnected",
						className: cn(monitorItemStatusVariants({ tone: netConnected ? "connected" : "disconnected" })),
						children: netConnected ? "Connected" : "Disconnected"
					})] })]
				}), renderProgress("network", netStatus, netFilledSegments)]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "monitor-item",
				"data-type": "battery",
				className: cn(monitorItemVariants({
					type: "battery",
					status: batteryStatus
				})),
				"data-state": dataAttr(batteryStatus),
				children: [/* @__PURE__ */ jsxs("div", {
					"data-slot": "monitor-item-header",
					className: "mb-1 flex items-baseline justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						"data-slot": "monitor-item-label",
						className: cn(monitorItemLabelVariants()),
						children: "Battery"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
						"data-slot": "monitor-item-value",
						className: cn(monitorItemValueVariants({ status: batteryStatus })),
						children: [batteryPercent, "%"]
					}), /* @__PURE__ */ jsx("span", {
						"data-slot": "monitor-item-status",
						"data-tone": batteryCharging ? "charging" : "discharging",
						className: cn(monitorItemStatusVariants({ tone: batteryCharging ? "charging" : "discharging" })),
						children: batteryCharging ? "Charging" : "Discharging"
					})] })]
				}), renderProgress("battery", batteryStatus, batteryFilledSegments)]
			})
		]
	});
}
SystemMonitor.displayName = "SystemMonitor";
//#endregion
export { SystemMonitor as default };

//# sourceMappingURL=SystemMonitor.mjs.map