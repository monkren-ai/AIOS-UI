import { cn, dataAttr } from "../lib/utils.mjs";
import { tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants } from "./tooltip-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip } from "@base-ui/react/tooltip";
//#region src/Tooltip/Tooltip.tsx
function Tooltip$1({ className, content, side = "top", delay = 300, children, ref, ...props }) {
	/**
	* 描述文本单独渲染一份视觉隐藏的副本，`aria-describedby` 指向它，而不是指向
	* 浮层本身。浮层只在打开时才挂载，而读屏是在焦点落上来的那一刻读描述的——
	* 隔着 `delay` 毫秒，那时浮层多半还不存在，描述就丢了。这份副本一直在。
	*/
	const descriptionId = React$1.useId();
	return /* @__PURE__ */ jsxs(Tooltip.Root, { children: [
		/* @__PURE__ */ jsx(Tooltip.Trigger, {
			delay,
			"data-slot": "tooltip-trigger",
			render: (triggerProps) => {
				if (React$1.isValidElement(children)) {
					const childProps = children.props;
					return React$1.cloneElement(children, {
						...triggerProps,
						className: cn(tooltipTriggerVariants(), childProps.className),
						"aria-describedby": [childProps["aria-describedby"], descriptionId].filter(Boolean).join(" ")
					});
				}
				return /* @__PURE__ */ jsx("span", {
					...triggerProps,
					className: cn(tooltipTriggerVariants()),
					"data-slot": "tooltip-trigger",
					"aria-describedby": descriptionId,
					children
				});
			}
		}),
		/* @__PURE__ */ jsx("span", {
			id: descriptionId,
			hidden: true,
			children: content
		}),
		/* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsx(Tooltip.Positioner, {
			className: cn(tooltipPositionerVariants()),
			"data-slot": "tooltip-positioner",
			side,
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Tooltip.Popup, {
				ref,
				className: cn(tooltipPopupVariants({ side }), className),
				role: "tooltip",
				"data-slot": "tooltip-popup",
				"data-side": dataAttr(side),
				...props,
				children: content
			})
		}) })
	] });
}
Tooltip$1.displayName = "Tooltip";
//#endregion
export { Tooltip$1 as default };

//# sourceMappingURL=Tooltip.mjs.map