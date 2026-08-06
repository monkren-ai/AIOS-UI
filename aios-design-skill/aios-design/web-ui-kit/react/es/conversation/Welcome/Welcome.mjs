import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import { welcomeVariants } from "./welcome-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Welcome.css";
//#region src/conversation/Welcome/Welcome.tsx
const Welcome = React$1.forwardRef(({ title, description, icon, extra, actions, className, style, classNames: userClassNames, styles: userStyles, variant, size, ...rest }, ref) => {
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(welcomeVariants({
			variant,
			size
		}), classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "welcome",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		...rest,
		children: [
			icon && /* @__PURE__ */ jsx("div", {
				className: cn("aios-welcome__icon", classNames.icon),
				style: styles.icon,
				"data-slot": "welcome-icon",
				children: icon
			}),
			title && /* @__PURE__ */ jsx("div", {
				className: cn("aios-welcome__title", classNames.title),
				style: styles.title,
				"data-slot": "welcome-title",
				children: title
			}),
			description && /* @__PURE__ */ jsx("div", {
				className: cn("aios-welcome__description", classNames.description),
				style: styles.description,
				"data-slot": "welcome-description",
				children: description
			}),
			actions && /* @__PURE__ */ jsx("div", {
				className: cn("aios-welcome__actions", classNames.actions),
				style: styles.actions,
				"data-slot": "welcome-actions",
				children: actions
			}),
			extra && /* @__PURE__ */ jsx("div", {
				className: cn("aios-welcome__extra", classNames.extra),
				style: styles.extra,
				"data-slot": "welcome-extra",
				children: extra
			})
		]
	});
});
Welcome.displayName = "Welcome";
//#endregion
export { Welcome as default };

//# sourceMappingURL=Welcome.mjs.map