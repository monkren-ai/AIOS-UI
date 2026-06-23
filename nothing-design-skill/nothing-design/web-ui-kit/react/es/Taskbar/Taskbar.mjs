import { cn, dataAttr } from "../lib/utils.mjs";
import { useNow, useTelemetry } from "../system/hooks.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Taskbar.css";
//#region src/Taskbar/Taskbar.tsx
const taskbarVariants = cva("nothing-taskbar", {
	variants: {
		theme: {
			light: "nothing-taskbar--light",
			dark: "nothing-taskbar--dark"
		},
		fixed: {
			true: "nothing-taskbar--fixed",
			false: ""
		}
	},
	defaultVariants: {
		theme: "dark",
		fixed: false
	}
});
const formatTime = (date) => {
	return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
const StartIcon = () => /* @__PURE__ */ jsxs("svg", {
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
const SearchIcon = () => /* @__PURE__ */ jsxs("svg", {
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
const VolumeIcon = () => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 24 24",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
		/* @__PURE__ */ jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
		/* @__PURE__ */ jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
	]
});
const TaskbarBatteryIcon = ({ percent, charging }) => {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "nothing-taskbar__battery-svg",
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
				fill: "currentColor",
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
const Taskbar = React$1.forwardRef(({ className, theme = "dark", apps = [], showSearch = true, showTime = true, showBattery = true, fixed = false, ...props }, ref) => {
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
		"data-state": dataAttr(fixed ? "fixed" : "inline"),
		"data-battery": dataAttr(batteryReal),
		"data-battery-percent": dataAttr(batteryPercent),
		"data-battery-charging": dataAttr(batteryCharging),
		"data-time-real": dataAttr(true),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-taskbar__left",
				children: [/* @__PURE__ */ jsx("button", {
					className: "nothing-taskbar__start",
					type: "button",
					"aria-label": "Start",
					children: /* @__PURE__ */ jsx(StartIcon, {})
				}), showSearch && /* @__PURE__ */ jsxs("button", {
					className: "nothing-taskbar__search",
					type: "button",
					"aria-label": "Search",
					children: [/* @__PURE__ */ jsx("span", {
						className: "nothing-taskbar__search-icon",
						children: /* @__PURE__ */ jsx(SearchIcon, {})
					}), /* @__PURE__ */ jsx("span", {
						className: "nothing-taskbar__search-text",
						children: "Search"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-taskbar__center",
				children: apps.map((app, index) => /* @__PURE__ */ jsx("button", {
					className: "nothing-taskbar__app",
					type: "button",
					"aria-label": app.name,
					title: app.name,
					onClick: app.onClick,
					"data-state": dataAttr("app"),
					children: /* @__PURE__ */ jsx("span", {
						className: "nothing-taskbar__app-icon",
						children: app.icon ? /* @__PURE__ */ jsx("img", {
							src: app.icon,
							alt: app.name,
							draggable: false
						}) : /* @__PURE__ */ jsx(DefaultAppIcon, { name: app.name })
					})
				}, index))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-taskbar__right",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "nothing-taskbar__tray-icon",
						"aria-label": "Volume",
						children: /* @__PURE__ */ jsx(VolumeIcon, {})
					}),
					showBattery && /* @__PURE__ */ jsxs("span", {
						className: "nothing-taskbar__battery",
						"aria-label": `Battery ${batteryPercent ?? 0}%`,
						children: [/* @__PURE__ */ jsx(TaskbarBatteryIcon, {
							percent: batteryPercent,
							charging: batteryCharging
						}), batteryPercent !== void 0 && /* @__PURE__ */ jsxs("span", {
							className: "nothing-taskbar__battery-percent",
							children: [batteryPercent, "%"]
						})]
					}),
					showTime && /* @__PURE__ */ jsx("span", {
						className: "nothing-taskbar__time",
						children: formatTime(time)
					})
				]
			})
		]
	});
});
Taskbar.displayName = "Taskbar";
//#endregion
export { Taskbar as default, taskbarVariants };

//# sourceMappingURL=Taskbar.mjs.map