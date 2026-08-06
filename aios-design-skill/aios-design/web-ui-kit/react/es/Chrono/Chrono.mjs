import { cn, dataAttr } from "../lib/utils.mjs";
import { chronoButtonVariants, chronoDisplayVariants, chronoLapDeltaVariants, chronoLapItemVariants, chronoLapNumberVariants, chronoLapTotalVariants, chronoLapsVariants, chronoTitleVariants, chronoVariants } from "./chrono-variants.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Chrono/Chrono.tsx
const formatTime = (ms) => {
	const totalSeconds = Math.floor(ms / 1e3);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const centiseconds = Math.floor(ms % 1e3 / 10);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
};
function Chrono({ className, maxLaps = 10, state: stateProp, size = "md", style, ref, ...props }) {
	const [elapsed, setElapsed] = useState(0);
	const [running, setRunning] = useState(false);
	const [laps, setLaps] = useState([]);
	const startTimeRef = useRef(0);
	const elapsedRef = useRef(0);
	const lastLapTimeRef = useRef(0);
	const animationFrameRef = useRef(null);
	const derivedState = stateProp ?? (running ? "running" : elapsed > 0 ? "paused" : "idle");
	const tick = useCallback(() => {
		const current = performance.now() - startTimeRef.current;
		elapsedRef.current = current;
		setElapsed(current);
		animationFrameRef.current = requestAnimationFrame(tick);
	}, []);
	useEffect(() => {
		if (running) {
			startTimeRef.current = performance.now() - elapsedRef.current;
			animationFrameRef.current = requestAnimationFrame(tick);
		} else if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}
		return () => {
			if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
		};
	}, [running, tick]);
	const handleStartPause = () => {
		if (running) {
			elapsedRef.current = performance.now() - startTimeRef.current;
			setRunning(false);
		} else setRunning(true);
	};
	const handleReset = () => {
		setRunning(false);
		setElapsed(0);
		setLaps([]);
		elapsedRef.current = 0;
		startTimeRef.current = 0;
		lastLapTimeRef.current = 0;
	};
	const handleLap = () => {
		if (!running) return;
		const currentElapsed = performance.now() - startTimeRef.current;
		const delta = currentElapsed - lastLapTimeRef.current;
		lastLapTimeRef.current = currentElapsed;
		setLaps((prev) => [...prev, {
			number: prev.length + 1,
			delta,
			total: currentElapsed
		}]);
	};
	let fastestIndex = -1;
	let slowestIndex = -1;
	if (laps.length > 1) {
		let minDelta = Infinity;
		let maxDelta = -Infinity;
		laps.forEach((lap, index) => {
			if (lap.delta < minDelta) {
				minDelta = lap.delta;
				fastestIndex = index;
			}
			if (lap.delta > maxDelta) {
				maxDelta = lap.delta;
				slowestIndex = index;
			}
		});
	}
	const lapsRef = useRef(null);
	useEffect(() => {
		if (lapsRef.current && laps.length > maxLaps) lapsRef.current.scrollTop = 0;
	}, [laps.length, maxLaps]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(chronoVariants({
			state: derivedState,
			size
		}), className),
		style,
		"data-slot": "chrono",
		"data-state": dataAttr(derivedState),
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "chrono-header",
				className: "mb-6 flex w-full items-baseline justify-between",
				children: /* @__PURE__ */ jsx("div", {
					"data-slot": "chrono-title",
					className: cn(chronoTitleVariants()),
					children: "Chrono"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "chrono-display",
				className: cn(chronoDisplayVariants({ size })),
				children: formatTime(elapsed)
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "chrono-controls",
				className: "mb-4 flex gap-2",
				children: /* @__PURE__ */ jsxs("div", {
					"data-slot": "chrono-controls-main",
					className: "flex flex-1 gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						"data-slot": "chrono-button",
						"data-action": running ? "pause" : "start",
						className: cn(chronoButtonVariants({ action: running ? "pause" : "start" })),
						onClick: handleStartPause,
						type: "button",
						children: running ? "PAUSE" : "START"
					}), /* @__PURE__ */ jsx("button", {
						"data-slot": "chrono-button",
						"data-action": "lap",
						className: cn(chronoButtonVariants({ action: "lap" })),
						onClick: handleLap,
						type: "button",
						disabled: !running,
						children: "LAP"
					})]
				})
			}),
			/* @__PURE__ */ jsx("button", {
				"data-slot": "chrono-button",
				"data-action": "reset",
				className: cn(chronoButtonVariants({ action: "reset" })),
				onClick: handleReset,
				type: "button",
				disabled: running || elapsed === 0,
				children: "RESET"
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "chrono-laps",
				className: cn(chronoLapsVariants()),
				ref: lapsRef,
				children: [...laps].reverse().map((lap) => {
					const originalIndex = lap.number - 1;
					let pace = "normal";
					if (laps.length > 1) {
						if (originalIndex === fastestIndex) pace = "fastest";
						if (originalIndex === slowestIndex) pace = "slowest";
					}
					return /* @__PURE__ */ jsxs("div", {
						"data-slot": "chrono-lap",
						"data-pace": dataAttr(pace),
						className: cn(chronoLapItemVariants()),
						children: [
							/* @__PURE__ */ jsxs("div", {
								"data-slot": "chrono-lap-number",
								className: cn(chronoLapNumberVariants()),
								children: ["LAP ", String(lap.number).padStart(2, "0")]
							}),
							/* @__PURE__ */ jsx("div", {
								"data-slot": "chrono-lap-delta",
								className: cn(chronoLapDeltaVariants({ pace })),
								children: formatTime(lap.delta)
							}),
							/* @__PURE__ */ jsx("div", {
								"data-slot": "chrono-lap-total",
								className: cn(chronoLapTotalVariants()),
								children: formatTime(lap.total)
							})
						]
					}, lap.number);
				})
			})
		]
	});
}
Chrono.displayName = "Chrono";
//#endregion
export { Chrono as default };

//# sourceMappingURL=Chrono.mjs.map