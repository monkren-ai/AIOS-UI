import { cn } from "../../lib/utils.mjs";
import { conversationViewportVariants } from "./conversation-viewport-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/conversation/ConversationViewport/ConversationViewport.tsx
const ConversationViewportContext = React$1.createContext(null);
const STICK_THRESHOLD = 32;
function ConversationViewport({ autoScroll = true, className, children, ref, ...props }) {
	const viewportRef = React$1.useRef(null);
	const stickRef = React$1.useRef(true);
	const [atBottom, setAtBottom] = React$1.useState(true);
	const setRef = React$1.useCallback((node) => {
		viewportRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const scrollToBottom = React$1.useCallback((behavior = "smooth") => {
		const node = viewportRef.current;
		if (!node) return;
		stickRef.current = true;
		node.scrollTo({
			top: node.scrollHeight,
			behavior
		});
	}, []);
	const onScroll = (event) => {
		const node = event.currentTarget;
		const next = node.scrollHeight - node.scrollTop - node.clientHeight < STICK_THRESHOLD;
		stickRef.current = next;
		setAtBottom(next);
		props.onScroll?.(event);
	};
	React$1.useEffect(() => {
		const node = viewportRef.current;
		if (!node || !autoScroll || typeof ResizeObserver === "undefined" || typeof MutationObserver === "undefined") return;
		const follow = () => {
			if (stickRef.current) node.scrollTop = node.scrollHeight;
		};
		const resize = new ResizeObserver(follow);
		Array.from(node.children).forEach((child) => resize.observe(child));
		const mutation = new MutationObserver(follow);
		mutation.observe(node, {
			childList: true,
			subtree: true,
			characterData: true
		});
		return () => {
			resize.disconnect();
			mutation.disconnect();
		};
	}, [autoScroll]);
	return /* @__PURE__ */ jsx(ConversationViewportContext.Provider, {
		value: {
			atBottom,
			scrollToBottom
		},
		children: /* @__PURE__ */ jsx("div", {
			ref: setRef,
			role: "log",
			"aria-live": "polite",
			className: cn(conversationViewportVariants(), className),
			"data-slot": "conversation-viewport",
			...props,
			onScroll,
			children
		})
	});
}
function ConversationContent({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("mx-auto flex w-full max-w-3xl flex-col gap-5 p-4", className),
		"data-slot": "conversation-content",
		...props
	});
}
function ConversationScrollButton({ label = "滚动到底部 / Scroll to bottom", className }) {
	const context = React$1.useContext(ConversationViewportContext);
	if (!context) throw new Error("<ConversationScrollButton> must be used inside <ConversationViewport>");
	if (context.atBottom) return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("pointer-events-none sticky bottom-3 z-10 flex justify-center", className),
		"data-slot": "conversation-scroll-button",
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "pointer-events-auto min-h-11 rounded-pill border border-border-visible bg-surface px-4 font-mono text-caption uppercase",
			onClick: () => context.scrollToBottom(),
			children: label
		})
	});
}
//#endregion
export { ConversationContent, ConversationScrollButton, ConversationViewport };

//# sourceMappingURL=ConversationViewport.mjs.map