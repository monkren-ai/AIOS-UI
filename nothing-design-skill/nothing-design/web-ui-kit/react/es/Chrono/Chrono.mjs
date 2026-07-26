import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Chrono.css";
//#region src/Chrono/Chrono.tsx
const chronoVariants = cva("nothing-chrono", {
	variants: {
		state: {
			idle: "nothing-chrono--idle",
			running: "nothing-chrono--running",
			paused: "nothing-chrono--paused"
		},
		size: {
			sm: "nothing-chrono--sm",
			md: "nothing-chrono--md",
			lg: "nothing-chrono--lg"
		}
	},
	defaultVariants: {
		state: "idle",
		size: "md"
	}
});
const formatTime = (ms) => {
	const totalSeconds = Math.floor(ms / 1e3);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const centiseconds = Math.floor(ms % 1e3 / 10);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
};
const Chrono = React.forwardRef(({ className, maxLaps = 10, state: stateProp, size = "md", style, ...props }, ref) => {
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
		"data-state": dataAttr(derivedState),
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "chrono-header",
				children: /* @__PURE__ */ jsx("div", {
					className: "chrono-title",
					children: "Chrono"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "chrono-display",
				children: formatTime(elapsed)
			}),
			/* @__PURE__ */ jsx("div", {
				className: "chrono-controls",
				children: /* @__PURE__ */ jsxs("div", {
					className: "chrono-controls-main",
					children: [/* @__PURE__ */ jsx("button", {
						className: cn("chrono-btn", running ? "chrono-btn--pause" : "chrono-btn--start"),
						onClick: handleStartPause,
						type: "button",
						children: running ? "PAUSE" : "START"
					}), /* @__PURE__ */ jsx("button", {
						className: "chrono-btn chrono-btn--lap",
						onClick: handleLap,
						type: "button",
						disabled: !running,
						children: "LAP"
					})]
				})
			}),
			/* @__PURE__ */ jsx("button", {
				className: "chrono-btn chrono-btn--reset",
				onClick: handleReset,
				type: "button",
				disabled: running || elapsed === 0,
				children: "RESET"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "chrono-laps",
				ref: lapsRef,
				children: [...laps].reverse().map((lap) => {
					const originalIndex = lap.number - 1;
					let lapClass = "chrono-lap-item";
					if (laps.length > 1) {
						if (originalIndex === fastestIndex) lapClass += " fastest";
						if (originalIndex === slowestIndex) lapClass += " slowest";
					}
					return /* @__PURE__ */ jsxs("div", {
						className: lapClass,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "chrono-lap-number",
								children: ["LAP ", String(lap.number).padStart(2, "0")]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "chrono-lap-delta",
								children: formatTime(lap.delta)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "chrono-lap-total",
								children: formatTime(lap.total)
							})
						]
					}, lap.number);
				})
			})
		]
	});
});
Chrono.displayName = "Chrono";
//#endregion
export { chronoVariants, Chrono as default };

//# sourceMappingURL=Chrono.mjs.map