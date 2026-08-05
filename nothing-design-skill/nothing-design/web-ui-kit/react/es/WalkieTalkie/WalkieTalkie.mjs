import { cn, dataAttr } from "../lib/utils.mjs";
import { walkieChannelButtonVariants, walkieChannelLabelVariants, walkieChannelNumberVariants, walkieChannelVariants, walkiePttAreaVariants, walkiePttVariants, walkiePulseVariants, walkieStatusVariants, walkieTalkieVariants, walkieVolumeLabelVariants, walkieVolumeSegmentVariants, walkieVolumeVariants } from "./walkie-talkie-variants.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./WalkieTalkie.css";
//#region src/WalkieTalkie/WalkieTalkie.tsx
const STATUS_LABELS = {
	ready: "READY",
	transmitting: "TRANSMITTING",
	sent: "SENT"
};
/** 三圈涟漪，相位依次错开 0.4s。 */
const PULSE_RINGS = [
	0,
	1,
	2
];
function WalkieTalkie({ className, channel: initialChannel = 1, minChannel = 1, maxChannel = 22, volumeSegments = 5, volumeLevel = 3, status: statusProp, style, ...props }) {
	const [channel, setChannel] = useState(initialChannel);
	const [isTransmitting, setIsTransmitting] = useState(false);
	const [status, setStatus] = useState("READY");
	const mediaRecorderRef = useRef(null);
	const audioStreamRef = useRef(null);
	const sentTimeoutRef = useRef(null);
	const derivedStatus = statusProp ?? (status === "TRANSMITTING" ? "transmitting" : status === "SENT" ? "sent" : "ready");
	const handleChannelChange = useCallback((delta) => {
		setChannel((prev) => {
			let next = prev + delta;
			if (next > maxChannel) next = minChannel;
			if (next < minChannel) next = maxChannel;
			return next;
		});
	}, [minChannel, maxChannel]);
	const startTransmitting = useCallback(async () => {
		if (isTransmitting) return;
		setIsTransmitting(true);
		setStatus("TRANSMITTING");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			audioStreamRef.current = stream;
			const recorder = new MediaRecorder(stream);
			mediaRecorderRef.current = recorder;
			recorder.start();
		} catch {}
	}, [isTransmitting]);
	const stopTransmitting = useCallback(() => {
		setIsTransmitting(false);
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
		if (audioStreamRef.current) {
			audioStreamRef.current.getTracks().forEach((t) => t.stop());
			audioStreamRef.current = null;
		}
		mediaRecorderRef.current = null;
		setStatus("SENT");
		if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current);
		sentTimeoutRef.current = setTimeout(() => {
			setStatus("READY");
		}, 2e3);
	}, []);
	useEffect(() => {
		return () => {
			if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current);
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
			if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach((t) => t.stop());
		};
	}, []);
	const handlePttDown = (e) => {
		e.preventDefault();
		startTransmitting();
	};
	useEffect(() => {
		const onMouseUp = () => {
			if (isTransmitting) stopTransmitting();
		};
		const onTouchEnd = () => {
			if (isTransmitting) stopTransmitting();
		};
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("touchend", onTouchEnd);
		return () => {
			document.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("touchend", onTouchEnd);
		};
	}, [isTransmitting, stopTransmitting]);
	const segmentHeights = [
		8,
		14,
		20,
		26,
		32
	];
	return /* @__PURE__ */ jsxs("div", {
		className: cn(walkieTalkieVariants({ status: derivedStatus }), className),
		style,
		"data-slot": "walkie-talkie",
		"data-status": dataAttr(derivedStatus),
		"data-channel": dataAttr(channel),
		"data-transmitting": dataAttr(isTransmitting),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "walkie-talkie-channel",
				className: walkieChannelVariants(),
				children: [
					/* @__PURE__ */ jsx("button", {
						"data-slot": "walkie-talkie-channel-down",
						className: walkieChannelButtonVariants(),
						onClick: () => handleChannelChange(-1),
						"aria-label": "Previous channel",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
						})
					}),
					/* @__PURE__ */ jsx("span", {
						"data-slot": "walkie-talkie-channel-label",
						className: walkieChannelLabelVariants(),
						children: "CHANNEL"
					}),
					/* @__PURE__ */ jsx("span", {
						"data-slot": "walkie-talkie-channel-number",
						className: walkieChannelNumberVariants(),
						children: String(channel).padStart(2, "0")
					}),
					/* @__PURE__ */ jsx("button", {
						"data-slot": "walkie-talkie-channel-up",
						className: walkieChannelButtonVariants(),
						onClick: () => handleChannelChange(1),
						"aria-label": "Next channel",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("polyline", { points: "6 15 12 9 18 15" })
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "walkie-talkie-ptt-area",
				className: walkiePttAreaVariants(),
				"data-transmitting": dataAttr(isTransmitting),
				children: [PULSE_RINGS.map((index) => /* @__PURE__ */ jsx("div", {
					"data-slot": "walkie-talkie-pulse",
					"aria-hidden": "true",
					className: walkiePulseVariants({
						transmitting: isTransmitting,
						index
					})
				}, index)), /* @__PURE__ */ jsx("button", {
					"data-slot": "walkie-talkie-ptt",
					className: walkiePttVariants({ active: isTransmitting }),
					"data-active": dataAttr(isTransmitting),
					"aria-label": "Push to talk",
					onMouseDown: handlePttDown,
					onTouchStart: handlePttDown,
					children: /* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 24 24",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ jsx("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" }),
							/* @__PURE__ */ jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
							/* @__PURE__ */ jsx("line", {
								x1: "12",
								y1: "19",
								x2: "12",
								y2: "23"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "8",
								y1: "23",
								x2: "16",
								y2: "23"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "walkie-talkie-status",
				className: walkieStatusVariants({ status: derivedStatus }),
				children: [
					"[",
					STATUS_LABELS[derivedStatus],
					"]"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "walkie-talkie-volume",
				className: walkieVolumeVariants(),
				children: Array.from({ length: volumeSegments }).map((_, i) => /* @__PURE__ */ jsx("div", {
					"data-slot": "walkie-talkie-volume-segment",
					"data-filled": dataAttr(i < volumeLevel),
					className: walkieVolumeSegmentVariants({ filled: i < volumeLevel }),
					style: { height: `${segmentHeights[i] || 20}px` }
				}, i))
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "walkie-talkie-volume-label",
				className: walkieVolumeLabelVariants(),
				children: "VOL"
			})
		]
	});
}
WalkieTalkie.displayName = "WalkieTalkie";
//#endregion
export { WalkieTalkie as default };

//# sourceMappingURL=WalkieTalkie.mjs.map