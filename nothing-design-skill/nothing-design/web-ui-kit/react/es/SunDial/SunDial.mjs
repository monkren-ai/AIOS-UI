import { cn, dataAttr } from "../lib/utils.mjs";
import { sunDialArcDayVariants, sunDialArcNightVariants, sunDialCurrentTimeVariants, sunDialLocationVariants, sunDialRemainingVariants, sunDialStatusVariants, sunDialSunCoreVariants, sunDialSunGlowVariants, sunDialSunMarkerVariants, sunDialTimeBlockVariants, sunDialTimeLabelVariants, sunDialTimeValueVariants, sunDialVariants } from "./sun-dial-variants.mjs";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/SunDial/SunDial.tsx
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
function SunDial({ className, latitude: propLat, longitude: propLng, updateInterval = 6e4, time: timeProp, theme = "dark", style, ref, ...props }) {
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
		"data-slot": "sun-dial",
		"data-time": dataAttr(time),
		"data-widget-theme": dataAttr(theme),
		"data-located": dataAttr(location !== null),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "sun-dial-header",
				className: "mb-4 flex w-full items-center justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "sun-dial-status",
					className: cn(sunDialStatusVariants({ time: isDay ? "day" : "night" })),
					children: sunTimes ? isDay ? "[DAY]" : "[NIGHT]" : "[--]"
				}), /* @__PURE__ */ jsx("div", {
					"data-slot": "sun-dial-location",
					className: cn(sunDialLocationVariants()),
					children: location ? `${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°` : "LOCATING..."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "sun-dial-arc",
				className: "relative mb-18 w-full max-w-80",
				children: [
					/* @__PURE__ */ jsxs("svg", {
						className: "block w-full overflow-visible",
						viewBox: "0 0 300 170",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ jsx("path", {
								className: cn(sunDialArcNightVariants()),
								d: nightArc
							}),
							/* @__PURE__ */ jsx("path", {
								className: cn(sunDialArcDayVariants()),
								d: dayArc
							}),
							sunPos && /* @__PURE__ */ jsxs("g", {
								"data-slot": "sun-dial-sun",
								className: cn(sunDialSunMarkerVariants()),
								children: [/* @__PURE__ */ jsx("circle", {
									className: cn(sunDialSunGlowVariants()),
									cx: sunPos.x,
									cy: sunPos.y,
									r: "16"
								}), /* @__PURE__ */ jsx("circle", {
									className: cn(sunDialSunCoreVariants()),
									cx: sunPos.x,
									cy: sunPos.y,
									r: "7"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "sun-dial-sunrise",
						className: cn(sunDialTimeBlockVariants({ edge: "sunrise" })),
						children: [/* @__PURE__ */ jsx("div", {
							className: cn(sunDialTimeLabelVariants()),
							children: "Sunrise"
						}), /* @__PURE__ */ jsx("div", {
							className: cn(sunDialTimeValueVariants()),
							children: sunTimes?.sunriseStr ?? "--:--"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "sun-dial-sunset",
						className: cn(sunDialTimeBlockVariants({ edge: "sunset" })),
						children: [/* @__PURE__ */ jsx("div", {
							className: cn(sunDialTimeLabelVariants()),
							children: "Sunset"
						}), /* @__PURE__ */ jsx("div", {
							className: cn(sunDialTimeValueVariants()),
							children: sunTimes?.sunsetStr ?? "--:--"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "sun-dial-current-time",
				className: cn(sunDialCurrentTimeVariants()),
				children: [
					hours,
					":",
					minutes
				]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "sun-dial-remaining",
				className: cn(sunDialRemainingVariants()),
				children: remaining
			})
		]
	});
}
SunDial.displayName = "SunDial";
//#endregion
export { SunDial as default };

//# sourceMappingURL=SunDial.mjs.map