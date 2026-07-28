import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Pomodoro.css";
//#region src/Pomodoro/Pomodoro.tsx
const pomodoroVariants = cva("nothing-pomodoro", {
	variants: {
		phase: {
			work: "nothing-pomodoro--work",
			break: "nothing-pomodoro--break"
		},
		running: {
			true: "nothing-pomodoro--running",
			false: ""
		}
	},
	defaultVariants: {
		phase: "work",
		running: false
	}
});
const Pomodoro = React.forwardRef(({ className, workMinutes = 25, breakMinutes = 5, totalSegments = 25, updateInterval = 1e3, phase: phaseProp, running: runningProp, style, ...props }, ref) => {
	const [isWorkPhase, setIsWorkPhase] = useState(true);
	const [isRunning, setIsRunning] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(workMinutes * 60);
	const [completedCount, setCompletedCount] = useState(0);
	const phase = phaseProp ?? (isWorkPhase ? "work" : "break");
	const running = runningProp ?? isRunning;
	const formatTime = (totalSeconds) => {
		const mins = Math.floor(totalSeconds / 60);
		const secs = totalSeconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};
	const totalSeconds = isWorkPhase ? workMinutes * 60 : breakMinutes * 60;
	const percent = (totalSeconds - timeRemaining) / totalSeconds * 100;
	const filledSegments = Math.round(percent / 100 * totalSegments);
	useEffect(() => {
		if (!isRunning) return;
		const timer = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) if (isWorkPhase) {
					setCompletedCount((c) => c + 1);
					setIsWorkPhase(false);
					return breakMinutes * 60;
				} else {
					setIsWorkPhase(true);
					return workMinutes * 60;
				}
				return prev - 1;
			});
		}, updateInterval);
		return () => clearInterval(timer);
	}, [
		isRunning,
		isWorkPhase,
		workMinutes,
		breakMinutes,
		updateInterval
	]);
	const handleStartPause = useCallback(() => {
		setIsRunning((prev) => !prev);
	}, []);
	const handleReset = useCallback(() => {
		setIsRunning(false);
		setIsWorkPhase(true);
		setTimeRemaining(workMinutes * 60);
	}, [workMinutes]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(pomodoroVariants({
			phase,
			running
		}), className),
		style,
		"data-phase": dataAttr(phase),
		"data-state": dataAttr(running ? "running" : "paused"),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pomodoro-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: "pomodoro-title",
					children: "Pomodoro"
				}), /* @__PURE__ */ jsxs("div", {
					className: "pomodoro-count",
					children: [completedCount, " completed"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pomodoro-timer-wrapper",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "pomodoro-timer",
						children: formatTime(timeRemaining)
					}),
					/* @__PURE__ */ jsx("div", {
						className: "pomodoro-status",
						children: isWorkPhase ? "[WORK]" : "[BREAK]"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "pomodoro-progress",
						children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn("pomodoro-segment", index < filledSegments && "filled") }, index))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pomodoro-controls",
				children: [/* @__PURE__ */ jsx("button", {
					className: "pomodoro-btn primary",
					onClick: handleStartPause,
					children: isRunning ? "Pause" : "Start"
				}), /* @__PURE__ */ jsx("button", {
					className: "pomodoro-btn",
					onClick: handleReset,
					children: "Reset"
				})]
			})
		]
	});
});
Pomodoro.displayName = "Pomodoro";
//#endregion
export { Pomodoro, Pomodoro as default, pomodoroVariants };

//# sourceMappingURL=Pomodoro.mjs.map