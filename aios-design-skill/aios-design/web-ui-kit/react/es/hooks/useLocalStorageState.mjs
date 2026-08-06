import { useCallback, useEffect, useState } from "react";
//#region src/hooks/useLocalStorageState.ts
/**
* useLocalStorageState - localStorage 同步 + 跨标签 storage 事件 + SSR safe.
*/
function useLocalStorageState(key, defaultValue) {
	const [value, setValue] = useState(() => {
		if (typeof window === "undefined") return defaultValue;
		try {
			const raw = window.localStorage.getItem(key);
			if (raw === null) return defaultValue;
			return JSON.parse(raw);
		} catch {
			return defaultValue;
		}
	});
	const set = useCallback((v) => {
		setValue((prev) => {
			const next = v instanceof Function ? v(prev) : v;
			try {
				window.localStorage.setItem(key, JSON.stringify(next));
			} catch {}
			return next;
		});
	}, [key]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const onStorage = (e) => {
			if (e.key !== key || e.newValue === null) return;
			try {
				setValue(JSON.parse(e.newValue));
			} catch {}
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, [key]);
	return [value, set];
}
//#endregion
export { useLocalStorageState };

//# sourceMappingURL=useLocalStorageState.mjs.map