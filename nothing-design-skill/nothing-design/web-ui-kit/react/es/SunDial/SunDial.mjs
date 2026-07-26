import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./SunDial.css";
//#region src/SunDial/SunDial.tsx
const sunDialVariants = cva("nothing-sun-dial", {
	variants: {
		time: {
			day: "nothing-sun-dial--day",
			night: "nothing-sun-dial--night"
		},
		theme: {
			light: "nothing-sun-dial--light",
			dark: "nothing-sun-dial--dark"
		}
	},
	defaultVariants: {
		time: "day",
		theme: "dark"
	}
});
function getDayOfYear(date) {
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - start.getTime();
	return Math.floor(diff / (1e3 * 60 * 60 * 24));
}
function formatHourMinute(h) {
	const hours = Math.floor(h);
	const minutes = Math.round((h - hours) * 60);
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
function calculateSunTimes(lat, lng) {
	const now = /* @__PURE__ */ new Date();
	const dayOfYear = getDayOfYear(now);
	const decRad = 23.45 * Math.sin(2 * Math.PI / 365 * (dayOfYear - 81)) * Math.PI / 180;
	const latRad = lat * Math.PI / 180;
	const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad);
	let hourAngle;
	if (cosHourAngle > 1) hourAngle = 0;
	else if (cosHourAngle < -1) hourAngle = 180;
	else hourAngle = Math.acos(cosHourAngle) * 180 / Math.PI;
	const sunriseHour = 12 - hourAngle / 15 - lng / 15 + now.getTimezoneOffset() / -60;
	const sunsetHour = 12 + hourAngle / 15 - lng / 15 + now.getTimezoneOffset() / -60;
	return {
		sunrise: sunriseHour * 60,
		sunset: sunsetHour * 60,
		sunriseStr: formatHourMinute(sunriseHour),
		sunsetStr: formatHourMinute(sunsetHour)
	};
}
function describeArc(cx, cy, r, startAngle, endAngle) {
	const startX = cx + r * Math.cos(startAngle);
	const startY = cy - r * Math.sin(startAngle);
	const endX = cx + r * Math.cos(endAngle);
	const endY = cy - r * Math.sin(endAngle);
	return `M ${startX} ${startY} A ${r} ${r} 0 0 ${startAngle > endAngle ? 0 : 1} ${endX} ${endY}`;
}
const SunDial = React.forwardRef(({ className, latitude: propLat, longitude: propLng, updateInterval = 6e4, time: timeProp, theme = "dark", style, ...props }, ref) => {
	const [location, setLocation] = useState(null);
	const [now, setNow] = useState(/* @__PURE__ */ new Date());
	useEffect(() => {
		if (propLat !== void 0 && propLng !== void 0) {
			setLocation({
				lat: propLat,
				lng: propLng
			});
			return;
		}
		if ("geolocation" in navigator) navigator.geolocation.getCurrentPosition((pos) => setLocation({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}), () => setLocation({
			lat: 39.9042,
			lng: 116.4074
		}));
		else setLocation({
			lat: 39.9042,
			lng: 116.4074
		});
	}, [propLat, propLng]);
	useEffect(() => {
		const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), updateInterval);
		return () => clearInterval(timer);
	}, [updateInterval]);
	const sunTimes = location ? calculateSunTimes(location.lat, location.lng) : null;
	const currentMinutes = now.getHours() * 60 + now.getMinutes();
	const isDay = sunTimes ? currentMinutes >= sunTimes.sunrise && currentMinutes <= sunTimes.sunset : false;
	const time = timeProp ?? (isDay ? "day" : "night");
	const remaining = useMemo(() => {
		if (!sunTimes) return "";
		if (isDay) {
			const rem = sunTimes.sunset - currentMinutes;
			return `${Math.floor(rem / 60)}H ${rem % 60}M OF DAYLIGHT REMAINING`;
		} else {
			let nextSunrise;
			if (currentMinutes < sunTimes.sunrise) nextSunrise = sunTimes.sunrise - currentMinutes;
			else nextSunrise = 1440 - currentMinutes + sunTimes.sunrise;
			return `${Math.floor(nextSunrise / 60)}H ${nextSunrise % 60}M UNTIL SUNRISE`;
		}
	}, [
		sunTimes,
		isDay,
		currentMinutes
	]);
	const sunPos = useMemo(() => {
		if (!sunTimes || !isDay) return null;
		const progress = (currentMinutes - sunTimes.sunrise) / (sunTimes.sunset - sunTimes.sunrise);
		const angle = Math.PI - progress * Math.PI;
		const cx = 150;
		const cy = 150;
		const r = 130;
		return {
			x: cx + r * Math.cos(angle),
			y: cy - r * Math.sin(angle)
		};
	}, [
		sunTimes,
		isDay,
		currentMinutes
	]);
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const dayArc = describeArc(150, 150, 130, Math.PI, 0);
	const nightArc = describeArc(150, 150, 130, 0, Math.PI);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(sunDialVariants({
			time,
			theme
		}), className),
		style,
		"data-time": dataAttr(time),
		"data-theme": dataAttr(theme),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "sundial-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: cn("sundial-status", isDay ? "day" : "night"),
					children: sunTimes ? isDay ? "[DAY]" : "[NIGHT]" : "[--]"
				}), /* @__PURE__ */ jsx("div", {
					className: "sundial-location",
					children: location ? `${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°` : "LOCATING..."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "sundial-arc-container",
				children: [
					/* @__PURE__ */ jsxs("svg", {
						className: "sundial-arc-svg",
						viewBox: "0 0 300 170",
						children: [
							/* @__PURE__ */ jsx("path", {
								className: "sundial-arc-night",
								d: nightArc
							}),
							/* @__PURE__ */ jsx("path", {
								className: "sundial-arc-day",
								d: dayArc
							}),
							sunPos && /* @__PURE__ */ jsxs("g", {
								className: "sundial-sun-marker",
								children: [/* @__PURE__ */ jsx("circle", {
									className: "sundial-sun-glow",
									cx: sunPos.x,
									cy: sunPos.y,
									r: "16"
								}), /* @__PURE__ */ jsx("circle", {
									className: "sundial-sun-core",
									cx: sunPos.x,
									cy: sunPos.y,
									r: "7"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sundial-time-block sundial-time-block--sunrise",
						children: [/* @__PURE__ */ jsx("div", {
							className: "sundial-time-label",
							children: "Sunrise"
						}), /* @__PURE__ */ jsx("div", {
							className: "sundial-time-value",
							children: sunTimes?.sunriseStr ?? "--:--"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sundial-time-block sundial-time-block--sunset",
						children: [/* @__PURE__ */ jsx("div", {
							className: "sundial-time-label",
							children: "Sunset"
						}), /* @__PURE__ */ jsx("div", {
							className: "sundial-time-value",
							children: sunTimes?.sunsetStr ?? "--:--"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "sundial-current-time",
				children: [
					hours,
					":",
					minutes
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sundial-remaining",
				children: remaining
			})
		]
	});
});
SunDial.displayName = "SunDial";
//#endregion
export { SunDial as default, sunDialVariants };

//# sourceMappingURL=SunDial.mjs.map