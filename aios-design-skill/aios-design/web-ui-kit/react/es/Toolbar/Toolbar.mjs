import { cn, dataAttr } from "../lib/utils.mjs";
import { toolbarButtonVariants, toolbarGroupVariants, toolbarLinkVariants, toolbarSeparatorVariants, toolbarVariants } from "./toolbar-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { Toolbar } from "@base-ui/react/toolbar";
//#region src/Toolbar/Toolbar.tsx
const ToolbarContext = React$1.createContext({
	size: "md",
	orientation: "horizontal",
	disabled: false
});
function Toolbar$1({ className, orientation = "horizontal", label, size = "md", disabled = false, children, ref, ...props }) {
	const context = React$1.useMemo(() => ({
		size,
		orientation,
		disabled
	}), [
		size,
		orientation,
		disabled
	]);
	return /* @__PURE__ */ jsx(ToolbarContext.Provider, {
		value: context,
		children: /* @__PURE__ */ jsx(Toolbar.Root, {
			ref,
			className: cn(toolbarVariants({ orientation }), className),
			orientation,
			disabled,
			"aria-label": label,
			"data-slot": "toolbar",
			"data-orientation": dataAttr(orientation),
			"data-size": dataAttr(size),
			"data-disabled": dataAttr(disabled),
			...props,
			children
		})
	});
}
Toolbar$1.displayName = "Toolbar";
function ToolbarButton({ className, size, pressed, disabled, ref, ...props }) {
	const ctx = React$1.useContext(ToolbarContext);
	const activeSize = size ?? ctx.size;
	return /* @__PURE__ */ jsx(Toolbar.Button, {
		ref,
		className: cn(toolbarButtonVariants({
			size: activeSize,
			pressed
		}), className),
		disabled: disabled ?? ctx.disabled,
		"aria-pressed": pressed || void 0,
		"data-slot": "toolbar-button",
		"data-size": dataAttr(activeSize),
		"data-pressed": dataAttr(pressed),
		...props
	});
}
ToolbarButton.displayName = "Toolbar.Button";
function ToolbarSeparator({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Toolbar.Separator, {
		ref,
		className: cn(toolbarSeparatorVariants(), className),
		"data-slot": "toolbar-separator",
		...props
	});
}
ToolbarSeparator.displayName = "Toolbar.Separator";
function ToolbarGroup({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Toolbar.Group, {
		ref,
		className: cn(toolbarGroupVariants(), className),
		"data-slot": "toolbar-group",
		...props
	});
}
ToolbarGroup.displayName = "Toolbar.Group";
function ToolbarLink({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Toolbar.Link, {
		ref,
		className: cn(toolbarLinkVariants(), className),
		"data-slot": "toolbar-link",
		...props
	});
}
ToolbarLink.displayName = "Toolbar.Link";
Toolbar$1.Group = ToolbarGroup;
Toolbar$1.Button = ToolbarButton;
Toolbar$1.Separator = ToolbarSeparator;
Toolbar$1.Link = ToolbarLink;
//#endregion
export { ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator, Toolbar$1 as default };

//# sourceMappingURL=Toolbar.mjs.map