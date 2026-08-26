import { cn, dataAttr } from "../lib/utils.mjs";
import { resolveAvatarSize } from "./avatar-variants.mjs";
import { avatarGroupOverflowVariants, avatarGroupVariants } from "./avatar-group-variants.mjs";
import * as React$1 from "react";
import { jsxs } from "react/jsx-runtime";
//#region src/Avatar/AvatarGroup.tsx
function AvatarGroup({ children, max, size = "md", className, ref, ...props }) {
	const avatars = React$1.Children.toArray(children).filter(React$1.isValidElement);
	const visibleCount = max == null ? avatars.length : Math.max(0, Math.min(max, avatars.length));
	const overflow = avatars.length - visibleCount;
	const resolvedSize = resolveAvatarSize(size) ?? "md";
	return /* @__PURE__ */ jsxs("div", {
		ref,
		role: "group",
		className: cn(avatarGroupVariants(), className),
		"data-slot": "avatar-group",
		"data-size": dataAttr(resolvedSize),
		...props,
		children: [avatars.slice(0, visibleCount).map((avatar, index) => {
			const typedAvatar = avatar;
			return React$1.cloneElement(typedAvatar, {
				key: typedAvatar.key ?? index,
				size: resolvedSize,
				className: cn("border-2 border-background", typedAvatar.props.className)
			});
		}), overflow > 0 && /* @__PURE__ */ jsxs("span", {
			"aria-label": `+${overflow}`,
			className: avatarGroupOverflowVariants({ size: resolvedSize }),
			"data-slot": "avatar-group-overflow",
			children: ["+", overflow]
		})]
	});
}
AvatarGroup.displayName = "AvatarGroup";
//#endregion
export { AvatarGroup };

//# sourceMappingURL=AvatarGroup.mjs.map