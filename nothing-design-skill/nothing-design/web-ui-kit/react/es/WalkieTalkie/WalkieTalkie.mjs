import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./WalkieTalkie.css";
//#region src/WalkieTalkie/WalkieTalkie.tsx
const walkieTalkieVariants = cva("nothing-walkie-talkie", {
	variants: { status: {
		ready: "nothing-walkie-talkie--ready",
		transmitting: "nothing-walkie-talkie--transmitting",
		sent: "nothing-walkie-talkie--sent"
	} },
	defaultVariants: { status: "ready" }
});
const STATUS_LABELS = {
	ready: "READY",
	transmitting: "TRANSMITTING",
	sent: "SENT"
};
const WalkieTalkie = React.forwardRef(({ className, channel: initialChannel = 1, minChannel = 1, maxChannel = 22, volumeSegments = 5, volumeLevel = 3, status: statusProp, style, ...props }, ref) => {
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
	const statusClass = cn(derivedStatus === "transmitting" && "transmitting", derivedStatus === "sent" && "sent");
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(walkieTalkieVariants({ status: derivedStatus }), className),
		style,
		"data-status": dataAttr(derivedStatus),
		"data-channel": dataAttr(channel),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "walkie-channel",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "walkie-channel__btn",
						onClick: () => handleChannelChange(-1),
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("polyline", {
								className: "walkie-channel__btn-icon",
								points: "6 9 12 15 18 9"
							})
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "walkie-channel__label",
						children: "CHANNEL"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "walkie-channel__number",
						children: String(channel).padStart(2, "0")
					}),
					/* @__PURE__ */ jsx("button", {
						className: "walkie-channel__btn",
						onClick: () => handleChannelChange(1),
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("polyline", {
								className: "walkie-channel__btn-icon",
								points: "6 15 12 9 18 15"
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn("walkie-ptt-area", isTransmitting && "transmitting"),
				children: [
					/* @__PURE__ */ jsx("div", { className: "walkie-pulse" }),
					/* @__PURE__ */ jsx("div", { className: "walkie-pulse" }),
					/* @__PURE__ */ jsx("div", { className: "walkie-pulse" }),
					/* @__PURE__ */ jsx("button", {
						className: cn("walkie-ptt", isTransmitting && "active"),
						onMouseDown: handlePttDown,
						onTouchStart: handlePttDown,
						children: /* @__PURE__ */ jsxs("svg", {
							className: "walkie-ptt__icon",
							viewBox: "0 0 24 24",
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
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn("walkie-status", statusClass),
				children: [
					"[",
					STATUS_LABELS[derivedStatus],
					"]"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "walkie-volume",
				children: Array.from({ length: volumeSegments }).map((_, i) => /* @__PURE__ */ jsx("div", {
					className: cn("walkie-volume__segment", i < volumeLevel && "filled"),
					style: { height: `${segmentHeights[i] || 20}px` }
				}, i))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "walkie-volume__label",
				children: "VOL"
			})
		]
	});
});
WalkieTalkie.displayName = "WalkieTalkie";
//#endregion
export { WalkieTalkie, WalkieTalkie as default, walkieTalkieVariants };

//# sourceMappingURL=WalkieTalkie.mjs.map