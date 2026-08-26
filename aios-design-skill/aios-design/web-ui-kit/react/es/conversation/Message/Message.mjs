import { cn } from "../../lib/utils.mjs";
import { messageVariants } from "./message-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/Message/Message.tsx
const MessageContext = React$1.createContext(false);
function Message({ role = "assistant", variant, avatar, className, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(messageVariants({
			role,
			variant
		}), className),
		"data-slot": "message",
		"data-role": role,
		...props,
		children: [
			avatar && role !== "user" && /* @__PURE__ */ jsx("div", {
				className: "shrink-0",
				"data-slot": "message-avatar",
				children: avatar
			}),
			/* @__PURE__ */ jsx(MessageContext.Provider, {
				value: true,
				children: /* @__PURE__ */ jsx("div", {
					className: "min-w-0 max-w-[85%] rounded-card",
					"data-slot": "message-body",
					children
				})
			}),
			avatar && role === "user" && /* @__PURE__ */ jsx("div", {
				className: "shrink-0",
				"data-slot": "message-avatar",
				children: avatar
			})
		]
	});
}
function useMessage(name) {
	if (!React$1.useContext(MessageContext)) throw new Error(`<${name}> must be used inside <Message>`);
}
function MessageContent({ className, ref, ...props }) {
	useMessage("MessageContent");
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("text-sm leading-6 text-foreground", className),
		"data-slot": "message-content",
		...props
	});
}
function MessageActions({ className, ref, ...props }) {
	useMessage("MessageActions");
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("mt-2 flex min-h-11 items-center gap-1 text-foreground-muted", className),
		"data-slot": "message-actions",
		...props
	});
}
function MessageAction({ className, ref, ...props }) {
	useMessage("MessageAction");
	return /* @__PURE__ */ jsx("button", {
		ref,
		type: "button",
		className: cn("min-h-11 rounded-button px-3 font-mono text-caption uppercase hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive", className),
		"data-slot": "message-action",
		...props
	});
}
function MessageCopyAction({ text, copyLabel = "复制 / Copy", copiedLabel = "已复制 / Copied", onClick, ...props }) {
	const [copied, setCopied] = React$1.useState(false);
	const copy = async (event) => {
		await navigator.clipboard?.writeText(text);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
		onClick?.(event);
	};
	return /* @__PURE__ */ jsx(MessageAction, {
		...props,
		onClick: copy,
		"aria-live": "polite",
		children: copied ? copiedLabel : copyLabel
	});
}
//#endregion
export { Message, MessageAction, MessageActions, MessageContent, MessageCopyAction };

//# sourceMappingURL=Message.mjs.map