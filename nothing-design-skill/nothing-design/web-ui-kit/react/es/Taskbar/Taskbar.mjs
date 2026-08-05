import { cn, dataAttr } from "../lib/utils.mjs";
import DotMatrixIcon from "../components/DotMatrixIcon.mjs";
import { componentIconSvg } from "../widgets/icon-svg-registry.mjs";
import { useNow, useTelemetry } from "../system/hooks.mjs";
import { taskbarAppIconVariants, taskbarAppVariants, taskbarBatteryFillVariants, taskbarBatteryPercentVariants, taskbarBatteryVariants, taskbarSearchVariants, taskbarStartVariants, taskbarTimeVariants, taskbarTrayIconVariants, taskbarVariants } from "./taskbar-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Taskbar/Taskbar.tsx
const formatTime = (date) => {
	return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
const StartIcon = ({ variant }) => {
	if (variant === "dot") return /* @__PURE__ */ jsx(DotMatrixIcon, {
		svg: componentIconSvg.startIcon,
		rows: 16,
		cols: 16,
		dotSize: 2,
		gap: 1,
		alphaThreshold: 100,
		baseColor: "var(--widget-white, #FCFAFE)",
		backgroundColor: "transparent"
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "3",
				y: "3",
				width: "8",
				height: "8",
				rx: "1"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "13",
				y: "3",
				width: "8",
				height: "8",
				rx: "1"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "3",
				y: "13",
				width: "8",
				height: "8",
				rx: "1"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "13",
				y: "13",
				width: "8",
				height: "8",
				rx: "1"
			})
		]
	});
};
const SearchIcon = ({ variant }) => {
	if (variant === "dot") return /* @__PURE__ */ jsx(DotMatrixIcon, {
		svg: componentIconSvg.searchIcon,
		rows: 16,
		cols: 16,
		dotSize: 2,
		gap: 1,
		alphaThreshold: 100,
		baseColor: "var(--widget-white, #FCFAFE)",
		backgroundColor: "transparent"
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /* @__PURE__ */ jsx("line", {
			x1: "21",
			y1: "21",
			x2: "16.65",
			y2: "16.65"
		})]
	});
};
const VolumeIcon = ({ variant }) => {
	if (variant === "dot") return /* @__PURE__ */ jsx(DotMatrixIcon, {
		svg: componentIconSvg.volumeIcon,
		rows: 16,
		cols: 16,
		dotSize: 2,
		gap: 1,
		alphaThreshold: 100,
		baseColor: "var(--widget-white, #FCFAFE)",
		backgroundColor: "transparent"
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
			/* @__PURE__ */ jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
			/* @__PURE__ */ jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
		]
	});
};
const TaskbarBatteryIcon = ({ percent, charging }) => {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		"data-slot": "taskbar-battery-icon",
		className: "h-4 w-[22px] shrink-0",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "5",
				width: "18",
				height: "14",
				rx: "2",
				ry: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "20",
				y: "9",
				width: "2",
				height: "6",
				rx: "1",
				fill: "currentColor"
			}),
			percent !== void 0 && /* @__PURE__ */ jsx("rect", {
				x: "5",
				y: "8",
				width: 12 * (Math.max(0, Math.min(100, percent ?? 0)) / 100),
				height: "8",
				rx: "1",
				"data-slot": "taskbar-battery-fill",
				className: cn(taskbarBatteryFillVariants({ charging: Boolean(charging) })),
				"data-charging": dataAttr(charging)
			})
		]
	});
};
const DefaultAppIcon = ({ name }) => {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("text", {
			x: "12",
			y: "17",
			textAnchor: "middle",
			fontSize: "14",
			fontFamily: "var(--font-body)",
			fill: "currentColor",
			children: name.charAt(0).toUpperCase()
		})
	});
};
function Taskbar({ className, theme = "dark", apps = [], showSearch = true, showTime = true, showBattery = true, fixed = false, ref, ...props }) {
	const time = useNow(1e3);
	const snap = useTelemetry();
	const batteryReal = snap.batteryReal;
	const batteryPercent = batteryReal && snap.battery ? Math.round(snap.battery.level * 100) : void 0;
	const batteryCharging = batteryReal && snap.battery ? snap.battery.charging : false;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(taskbarVariants({
			theme,
			fixed
		}), className),
		role: "toolbar",
		"aria-label": "Taskbar",
		"data-slot": "taskbar",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr(fixed ? "fixed" : "inline"),
		"data-battery": dataAttr(batteryReal),
		"data-battery-percent": dataAttr(batteryPercent),
		"data-battery-charging": dataAttr(batteryCharging),
		"data-time-real": dataAttr(true),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "taskbar-left",
				className: "flex shrink-0 items-center gap-4",
				children: [/* @__PURE__ */ jsx("button", {
					"data-slot": "taskbar-start",
					className: cn(taskbarStartVariants({ theme })),
					type: "button",
					"aria-label": "Start",
					children: /* @__PURE__ */ jsx(StartIcon, {})
				}), showSearch && /* @__PURE__ */ jsxs("button", {
					"data-slot": "taskbar-search",
					className: cn(taskbarSearchVariants({ theme })),
					type: "button",
					"aria-label": "Search",
					children: [/* @__PURE__ */ jsx("span", {
						"data-slot": "taskbar-search-icon",
						className: "flex size-4 shrink-0 items-center justify-center [&_svg]:size-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2]",
						children: /* @__PURE__ */ jsx(SearchIcon, {})
					}), /* @__PURE__ */ jsx("span", {
						"data-slot": "taskbar-search-text",
						className: "truncate",
						children: "Search"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "taskbar-center",
				className: "flex flex-1 items-center justify-center gap-1 overflow-x-auto px-2 md:gap-2 md:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
				children: apps.map((app, index) => /* @__PURE__ */ jsx("button", {
					"data-slot": "taskbar-app",
					className: cn(taskbarAppVariants({ theme })),
					type: "button",
					"aria-label": app.name,
					title: app.name,
					onClick: app.onClick,
					"data-state": dataAttr("app"),
					children: /* @__PURE__ */ jsx("span", {
						"data-slot": "taskbar-app-icon",
						className: cn(taskbarAppIconVariants({ theme })),
						children: app.icon ? /* @__PURE__ */ jsx("img", {
							src: app.icon,
							alt: app.name,
							draggable: false
						}) : /* @__PURE__ */ jsx(DefaultAppIcon, { name: app.name })
					})
				}, index))
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "taskbar-right",
				className: "flex shrink-0 items-center gap-2 md:gap-4",
				children: [
					/* @__PURE__ */ jsx("span", {
						"data-slot": "taskbar-tray-icon",
						className: cn(taskbarTrayIconVariants({ theme })),
						"aria-label": "Volume",
						children: /* @__PURE__ */ jsx(VolumeIcon, {})
					}),
					showBattery && /* @__PURE__ */ jsxs("span", {
						"data-slot": "taskbar-battery",
						className: cn(taskbarBatteryVariants({
							theme,
							real: batteryReal
						})),
						"data-real": dataAttr(batteryReal),
						"data-state": dataAttr(batteryReal ? "real" : "simulated"),
						"aria-label": `Battery ${batteryPercent ?? 0}%`,
						children: [/* @__PURE__ */ jsx(TaskbarBatteryIcon, {
							percent: batteryPercent,
							charging: batteryCharging
						}), batteryPercent !== void 0 && /* @__PURE__ */ jsxs("span", {
							"data-slot": "taskbar-battery-percent",
							className: cn(taskbarBatteryPercentVariants()),
							children: [batteryPercent, "%"]
						})]
					}),
					showTime && /* @__PURE__ */ jsx("span", {
						"data-slot": "taskbar-time",
						className: cn(taskbarTimeVariants({ theme })),
						children: formatTime(time)
					})
				]
			})
		]
	});
}
Taskbar.displayName = "Taskbar";
//#endregion
export { Taskbar as default };

//# sourceMappingURL=Taskbar.mjs.map