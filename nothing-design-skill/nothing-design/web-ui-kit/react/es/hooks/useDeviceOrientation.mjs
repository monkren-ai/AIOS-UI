import { useEffect, useState } from "react";
//#region src/hooks/useDeviceOrientation.ts
/**
* useDeviceOrientation - 设备方向 → 罗盘 heading (0-360°, 0=北).
*
* - iOS 13+ 需要 DeviceOrientationEvent.requestPermission() 用户授权
* - 部分浏览器 / 桌面不支持, 此时返回 { heading: null, real: false }
* - 'webkit' / 'moz' / 标准的 absolute/webkitCompassHeading 都能 fallback
*/
function isSupported() {
	return typeof window !== "undefined" && "DeviceOrientationEvent" in window;
}
function readHeading(e) {
	if (typeof e.webkitCompassHeading === "number" && !Number.isNaN(e.webkitCompassHeading)) return e.webkitCompassHeading;
	if (typeof e.alpha === "number" && !Number.isNaN(e.alpha)) return (360 - e.alpha) % 360;
	return null;
}
function useDeviceOrientation(autoStart = true) {
	const [state, setState] = useState({
		heading: null,
		real: false
	});
	useEffect(() => {
		if (!autoStart) return;
		if (!isSupported()) {
			setState({
				heading: null,
				real: false
			});
			return;
		}
		const cls = window.DeviceOrientationEvent;
		const start = () => {
			const handler = (e) => {
				const h = readHeading(e);
				if (h !== null) setState({
					heading: h,
					real: true
				});
			};
			window.addEventListener("deviceorientation", handler, true);
			return () => window.removeEventListener("deviceorientation", handler, true);
		};
		let cleanup = null;
		if (cls?.requestPermission) cls.requestPermission().then((res) => {
			if (res === "granted") cleanup = start();
			else setState({
				heading: null,
				real: false
			});
		}).catch(() => setState({
			heading: null,
			real: false
		}));
		else cleanup = start();
		return () => {
			if (cleanup) cleanup();
		};
	}, [autoStart]);
	return state;
}
//#endregion
export { useDeviceOrientation };

//# sourceMappingURL=useDeviceOrientation.mjs.map