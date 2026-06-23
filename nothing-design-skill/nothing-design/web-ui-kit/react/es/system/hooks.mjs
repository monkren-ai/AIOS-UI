import { bus } from "./telemetry.mjs";
import { createContext, useEffect, useState, useSyncExternalStore } from "react";
import "motion/react";
//#region src/system/hooks.ts
function useTelemetry() {
	return useSyncExternalStore(bus.subscribe, bus.get);
}
/**
* 每 N 毫秒触发一次状态更新，返回当前 Date。
* 文档可见性自动暂停（标签页隐藏时不浪费 tick）。
*
* 用于 Clock / WorldClock / TimeWidget / AnalogClockWidget / ClockHero 等时间显示。
*/
function useNow(intervalMs = 1e3) {
	const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
	useEffect(() => {
		let alive = true;
		let id = null;
		const tick = () => {
			if (!alive) return;
			setNow(/* @__PURE__ */ new Date());
			id = window.setTimeout(tick, intervalMs);
		};
		tick();
		return () => {
			alive = false;
			if (id !== null) clearTimeout(id);
		};
	}, [intervalMs]);
	return now;
}
createContext(null);
//#endregion
export { useNow, useTelemetry };

//# sourceMappingURL=hooks.mjs.map