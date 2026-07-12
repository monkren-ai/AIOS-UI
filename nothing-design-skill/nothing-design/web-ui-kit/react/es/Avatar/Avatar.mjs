import { cn, dataAttr } from "../lib/utils.mjs";
import { Slot } from "../lib/slot.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Avatar.css";
//#region src/Avatar/Avatar.tsx
const avatarVariants = cva("nothing-avatar", {
	variants: { size: {
		sm: "nothing-avatar--sm",
		md: "nothing-avatar--md",
		lg: "nothing-avatar--lg"
	} },
	defaultVariants: { size: "md" }
});
const Avatar = React$1.forwardRef(({ className, size, asChild = false, src, alt = "", fallback, children, ...props }, ref) => {
	const Comp = asChild ? Slot : "div";
	const [imageError, setImageError] = React$1.useState(false);
	const showImage = src && !imageError;
	const inner = showImage ? /* @__PURE__ */ jsx("img", {
		className: "nothing-avatar__image",
		src,
		alt,
		onError: () => setImageError(true)
	}) : /* @__PURE__ */ jsx("span", {
		className: "nothing-avatar__fallback",
		"aria-label": alt || fallback,
		children: fallback || ""
	});
	return /* @__PURE__ */ jsx(Comp, {
		ref,
		className: cn(avatarVariants({ size }), className),
		"data-size": dataAttr(size),
		"data-state": showImage ? "image" : "fallback",
		...props,
		children: asChild ? children : inner
	});
});
Avatar.displayName = "Avatar";
//#endregion
export { avatarVariants, Avatar as default };

//# sourceMappingURL=Avatar.mjs.map