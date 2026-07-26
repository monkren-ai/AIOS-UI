import { useEffect, useState } from "react";
//#region src/hooks/useWeather.ts
/**
* useWeather - Open-Meteo 客户端 (无 key, 免费, CORS 友好).
*
* 失败 / 离线 / 显式 `enabled=false` 时回退到 defaults, 并标记 real=false.
*/
const WMO_CODE = {
	0: "Clear",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Depositing rime fog",
	51: "Drizzle",
	53: "Drizzle",
	55: "Drizzle",
	61: "Rain",
	63: "Rain",
	65: "Heavy rain",
	71: "Snow",
	73: "Snow",
	75: "Heavy snow",
	80: "Rain showers",
	81: "Rain showers",
	82: "Violent rain showers",
	95: "Thunderstorm",
	96: "Thunderstorm",
	99: "Thunderstorm"
};
function dayName(offset) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offset);
	return d.toLocaleDateString(void 0, { weekday: "short" });
}
function useWeather(opts) {
	const { latitude, longitude, city, enabled = true } = opts;
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [real, setReal] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		if (!enabled) {
			setData(null);
			setReal(false);
			setError(null);
			return;
		}
		let cancelled = false;
		setLoading(true);
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=4&timezone=auto`;
		fetch(url).then((r) => {
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return r.json();
		}).then((json) => {
			if (cancelled) return;
			const cur = json.current;
			const daily = json.daily;
			const temp = Math.round(cur.temperature_2m);
			const forecast = [];
			if (daily && Array.isArray(daily.time)) for (let i = 1; i < Math.min(4, daily.time.length); i++) forecast.push({
				day: dayName(i),
				hi: Math.round(daily.temperature_2m_max[i]),
				lo: Math.round(daily.temperature_2m_min[i]),
				condition: WMO_CODE[daily.weather_code[i]] ?? "Clear"
			});
			setData({
				temp,
				hi: forecast[0]?.hi ?? temp + 3,
				lo: forecast[0]?.lo ?? temp - 5,
				condition: WMO_CODE[cur.weather_code] ?? "Clear",
				city: city ?? "CURRENT LOC",
				forecast,
				fetchedAt: Date.now()
			});
			setReal(true);
			setError(null);
		}).catch((e) => {
			if (cancelled) return;
			setReal(false);
			setError(e instanceof Error ? e.message : String(e));
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		latitude,
		longitude,
		city,
		enabled
	]);
	return {
		data,
		loading,
		real,
		error
	};
}
//#endregion
export { useWeather };

//# sourceMappingURL=useWeather.mjs.map