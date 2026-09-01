import { cn } from "../../lib/utils.mjs";
import Sender from "../../conversation/Sender/Sender.mjs";
import { promptBoxActionVariants, promptBoxVariants } from "./prompt-box-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/PromptBox/PromptBox.tsx
function PromptBoxModelSelect({ icon, label, className, ref, ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		ref,
		type: "button",
		className: cn("flex min-h-9 items-center gap-2 rounded-button px-2 text-sm text-foreground-muted hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive", className),
		"data-slot": "prompt-box-model-select",
		...props,
		children: [
			icon && /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				children: icon
			}),
			/* @__PURE__ */ jsx("span", { children: label }),
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				children: "⌄"
			})
		]
	});
}
function PromptBox({ value, defaultValue, onValueChange, onSubmit, running = false, onStop, onAttach, onMention, onVoiceToggle, voice = "mic", voiceStatus, voiceActive = false, modelSelect, contextBefore, contextAfter, inset = false, autoSize = true, placeholder = "输入提示或按 / 使用命令 / Type a prompt or press / for commands", density, className, ref, ...props }) {
	const hasLeadingActions = Boolean(onAttach || onMention);
	const resolvedVoiceStatus = voiceStatus ?? (voiceActive ? "inputting" : "idle");
	const voiceBusy = resolvedVoiceStatus === "thinking";
	return /* @__PURE__ */ jsxs("div", {
		className: cn(promptBoxVariants({
			density,
			inset
		}), className),
		"data-slot": "prompt-box",
		"data-running": running || void 0,
		"data-voice-status": resolvedVoiceStatus,
		children: [
			contextBefore && /* @__PURE__ */ jsx("div", {
				className: "mb-2",
				"data-slot": "prompt-box-context-before",
				children: contextBefore
			}),
			/* @__PURE__ */ jsx(Sender, {
				ref,
				value,
				defaultValue,
				onChange: onValueChange,
				onSubmit,
				running,
				onStop,
				autoSize,
				placeholder,
				prefix: hasLeadingActions ? /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1",
					"data-slot": "prompt-box-leading-actions",
					children: [onAttach && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: promptBoxActionVariants(),
						onClick: onAttach,
						"aria-label": "添加附件 / Add attachment",
						children: "+"
					}), onMention && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: promptBoxActionVariants(),
						onClick: onMention,
						"aria-label": "提及上下文 / Mention context",
						children: "@"
					})]
				}) : void 0,
				footer: ({ components: { SendButton, CancelButton } }) => /* @__PURE__ */ jsxs("div", {
					className: "flex w-full items-center justify-between gap-2",
					"data-slot": "prompt-box-actions",
					children: [/* @__PURE__ */ jsx("span", { children: modelSelect }), /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2",
						children: [onVoiceToggle && /* @__PURE__ */ jsx("button", {
							type: "button",
							className: promptBoxActionVariants(),
							onClick: onVoiceToggle,
							disabled: voiceBusy,
							"aria-busy": voiceBusy || void 0,
							"aria-pressed": resolvedVoiceStatus === "inputting",
							"aria-label": voiceBusy ? "语音处理中 / Processing voice input" : resolvedVoiceStatus === "inputting" ? "停止语音输入 / Stop voice input" : "开始语音输入 / Start voice input",
							"data-slot": "prompt-box-voice",
							"data-voice": voice,
							"data-status": resolvedVoiceStatus,
							children: voice === "wave" ? /* @__PURE__ */ jsx("span", {
								"aria-hidden": true,
								className: "flex h-5 items-center gap-0.5",
								children: [
									8,
									14,
									10,
									16,
									8
								].map((height, index) => /* @__PURE__ */ jsx("span", {
									className: cn("w-0.5 bg-current", resolvedVoiceStatus === "inputting" && "animate-agent-pulse motion-reduce:animate-none"),
									style: {
										height,
										animationDelay: `${index * 90}ms`
									}
								}, index))
							}) : resolvedVoiceStatus === "inputting" ? "■" : voiceBusy ? "…" : "◉"
						}), running ? /* @__PURE__ */ jsx(CancelButton, {}) : /* @__PURE__ */ jsx(SendButton, {})]
					})]
				}),
				...props
			}),
			contextAfter && /* @__PURE__ */ jsx("div", {
				className: "mt-2",
				"data-slot": "prompt-box-context-after",
				children: contextAfter
			})
		]
	});
}
//#endregion
export { PromptBox, PromptBoxModelSelect };

//# sourceMappingURL=PromptBox.mjs.map