import { cn } from "../../lib/utils.mjs";
import { threadListItemVariants, threadListVariants } from "./thread-list-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/ThreadList/ThreadList.tsx
function ThreadList({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("nav", {
		ref,
		className: cn(threadListVariants(), className),
		"data-slot": "thread-list",
		...props
	});
}
function ThreadListSection({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("px-2 pt-3 font-mono text-caption uppercase text-foreground-disabled", className),
		"data-slot": "thread-list-section",
		...props
	});
}
function ThreadListNew({ children = "新建会话 / New chat", className, ref, ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		ref,
		type: "button",
		className: cn("flex min-h-11 items-center gap-2 rounded-button px-2 text-start text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive", className),
		"data-slot": "thread-list-new",
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": true,
			children: "+"
		}), /* @__PURE__ */ jsx("span", { children })]
	});
}
function ThreadListItem({ title, meta, active = false, unread = false, actions, onSelect, className, ref, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(threadListItemVariants({ active }), className),
		"data-slot": "thread-list-item",
		"data-active": active || void 0,
		...props,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "flex min-w-0 flex-1 items-center gap-2 self-stretch px-2 text-start focus-visible:outline-2 focus-visible:outline-interactive",
			"aria-current": active ? "page" : void 0,
			onClick: onSelect,
			children: [/* @__PURE__ */ jsx("span", {
				className: "min-w-0 flex-1 truncate text-sm",
				children: title
			}), (meta || unread) && /* @__PURE__ */ jsxs("span", {
				className: cn("flex items-center gap-1 font-mono text-caption text-foreground-muted", actions && "group-hover/thread:hidden group-focus-within/thread:hidden"),
				children: [unread && !active && /* @__PURE__ */ jsx("span", {
					className: "size-2 rounded-full bg-accent",
					"aria-label": "未读 / Unread"
				}), meta]
			})]
		}), actions && /* @__PURE__ */ jsx("span", {
			className: "hidden items-center gap-1 pe-1 group-hover/thread:flex group-focus-within/thread:flex",
			"data-slot": "thread-list-item-actions",
			children: actions
		})]
	});
}
function ThreadListItemAction({ className, ref, onClick, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		ref,
		type: "button",
		className: cn("grid size-9 place-items-center rounded-button text-foreground-muted hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive", className),
		"data-slot": "thread-list-item-action",
		onClick: (event) => {
			event.stopPropagation();
			onClick?.(event);
		},
		...props
	});
}
//#endregion
export { ThreadList, ThreadListItem, ThreadListItemAction, ThreadListNew, ThreadListSection };

//# sourceMappingURL=ThreadList.mjs.map