import { cn, dataAttr } from "../lib/utils.mjs";
import { Slot } from "../lib/slot.mjs";
import { avatarFallbackVariants, avatarVariants, resolveAvatarSize } from "./avatar-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/Avatar/Avatar.tsx
function Avatar({ className, variant, size, shape, asChild = false, src, alt = "", fallback, children, ...props }) {
	const Comp = asChild ? Slot : "div";
	const [imageError, setImageError] = React$1.useState(false);
	const showImage = Boolean(src) && !imageError;
	const resolvedSize = resolveAvatarSize(size) ?? "md";
	const inner = showImage ? /* @__PURE__ */ jsx("img", {
		"data-slot": "avatar-image",
		className: "block size-full rounded-[inherit] object-cover",
		src,
		alt,
		onError: () => setImageError(true)
	}) : /* @__PURE__ */ jsx("span", {
		"data-slot": "avatar-fallback",
		className: avatarFallbackVariants({ size: resolvedSize }),
		"aria-label": alt || fallback,
		children: fallback || ""
	});
	return /* @__PURE__ */ jsx(Comp, {
		className: cn(avatarVariants({
			variant,
			size: resolvedSize,
			shape
		}), className),
		"data-slot": "avatar",
		"data-variant": dataAttr(variant ?? "soft"),
		"data-size": dataAttr(resolvedSize),
		"data-shape": dataAttr(shape ?? "circle"),
		"data-state": showImage ? "image" : "fallback",
		...props,
		children: asChild ? children : inner
	});
}
Avatar.displayName = "Avatar";
//#endregion
export { Avatar as default };

//# sourceMappingURL=Avatar.mjs.map