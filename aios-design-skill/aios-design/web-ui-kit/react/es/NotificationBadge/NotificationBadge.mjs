import { cn, dataAttr } from "../lib/utils.mjs";
import Badge from "../Badge/Badge.mjs";
import { notificationBadgeDotVariants, notificationBadgeMarkerVariants, notificationBadgeVariants } from "./notification-badge-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/NotificationBadge/NotificationBadge.tsx
function formatCount(count, max) {
	return count > max ? `${max}+` : String(count);
}
function NotificationBadge({ count, dot = false, max = 99, children, className, ref, ...props }) {
	const numericCount = count ?? 0;
	const showCount = numericCount > 0;
	const visible = showCount || dot;
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(notificationBadgeVariants(), className),
		"data-slot": "notification-badge",
		"data-count": showCount ? String(numericCount) : void 0,
		"data-dot": dataAttr(dot && !showCount),
		...props,
		children: [children, visible && /* @__PURE__ */ jsx("span", {
			className: notificationBadgeMarkerVariants({ dot: !showCount }),
			"data-slot": "notification-badge-marker",
			"aria-hidden": showCount ? void 0 : true,
			children: showCount ? /* @__PURE__ */ jsx(Badge, {
				size: "sm",
				variant: "destructive",
				children: formatCount(numericCount, max)
			}) : /* @__PURE__ */ jsx("span", {
				className: notificationBadgeDotVariants(),
				"data-slot": "notification-badge-dot"
			})
		})]
	});
}
NotificationBadge.displayName = "NotificationBadge";
//#endregion
export { NotificationBadge as default };

//# sourceMappingURL=NotificationBadge.mjs.map