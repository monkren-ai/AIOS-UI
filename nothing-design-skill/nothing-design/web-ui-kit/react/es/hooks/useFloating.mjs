import { useCallback, useState } from "react";
//#region src/hooks/useFloating.ts
function useFloating(placement = "bottom") {
	const [style, setStyle] = useState({
		position: "absolute",
		zIndex: 1e3
	});
	return {
		style,
		update: useCallback((anchor, floating) => {
			const anchorRect = anchor.getBoundingClientRect();
			const floatingRect = floating.getBoundingClientRect();
			const gap = 8;
			let top = 0;
			let left = 0;
			switch (placement) {
				case "top":
					top = anchorRect.top - floatingRect.height - gap;
					left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2;
					break;
				case "bottom":
					top = anchorRect.bottom + gap;
					left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2;
					break;
				case "left":
					top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2;
					left = anchorRect.left - floatingRect.width - gap;
					break;
				case "right":
					top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2;
					left = anchorRect.right + gap;
					break;
			}
			top = Math.max(8, Math.min(top, window.innerHeight - floatingRect.height - 8));
			left = Math.max(8, Math.min(left, window.innerWidth - floatingRect.width - 8));
			setStyle((prev) => ({
				...prev,
				top,
				left
			}));
		}, [placement])
	};
}
//#endregion
export { useFloating };

//# sourceMappingURL=useFloating.mjs.map