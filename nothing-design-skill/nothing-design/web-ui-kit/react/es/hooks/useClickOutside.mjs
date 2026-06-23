import { useEffect } from "react";
//#region src/hooks/useClickOutside.ts
function useClickOutside(ref, handler) {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) return;
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}
//#endregion
export { useClickOutside };

//# sourceMappingURL=useClickOutside.mjs.map