import { cn, dataAttr } from "../lib/utils.mjs";
import { pomodoroButtonVariants, pomodoroCountVariants, pomodoroSegmentVariants, pomodoroStatusVariants, pomodoroTimerVariants, pomodoroTitleVariants, pomodoroVariants } from "./pomodoro-variants.mjs";
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Pomodoro/Pomodoro.tsx
function Pomodoro({ className, workMinutes = 25, breakMinutes = 5, totalSegments = 25, updateInterval = 1e3, phase: phaseProp, running: runningProp, style, ref, ...props }) {
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
		"data-slot": "pomodoro",
		"data-phase": dataAttr(phase),
		"data-state": dataAttr(running ? "running" : "paused"),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "pomodoro-header",
				className: "mb-6 flex w-full items-baseline justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "pomodoro-title",
					className: cn(pomodoroTitleVariants()),
					children: "Pomodoro"
				}), /* @__PURE__ */ jsxs("div", {
					"data-slot": "pomodoro-count",
					className: cn(pomodoroCountVariants()),
					children: [completedCount, " completed"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "pomodoro-timer-wrapper",
				className: "mb-6 flex w-full flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						"data-slot": "pomodoro-timer",
						className: cn(pomodoroTimerVariants({ phase })),
						children: formatTime(timeRemaining)
					}),
					/* @__PURE__ */ jsx("div", {
						"data-slot": "pomodoro-status",
						className: cn(pomodoroStatusVariants({ phase })),
						children: phase === "work" ? "[WORK]" : "[BREAK]"
					}),
					/* @__PURE__ */ jsx("div", {
						"data-slot": "pomodoro-progress",
						className: "mb-6 flex h-3 w-full gap-0.5",
						children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", {
							"data-slot": "pomodoro-segment",
							"data-filled": dataAttr(index < filledSegments),
							className: cn(pomodoroSegmentVariants({
								filled: index < filledSegments,
								phase
							}))
						}, index))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "pomodoro-controls",
				className: "mb-6 flex gap-2",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "pomodoro-button",
					"data-action": "start-pause",
					className: cn(pomodoroButtonVariants({ emphasis: "primary" })),
					onClick: handleStartPause,
					children: isRunning ? "Pause" : "Start"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					"data-slot": "pomodoro-button",
					"data-action": "reset",
					className: cn(pomodoroButtonVariants()),
					onClick: handleReset,
					children: "Reset"
				})]
			})
		]
	});
}
Pomodoro.displayName = "Pomodoro";
//#endregion
export { Pomodoro as default };

//# sourceMappingURL=Pomodoro.mjs.map