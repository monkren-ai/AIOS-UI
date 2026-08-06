import { cva } from "class-variance-authority";
//#region src/Avatar/avatar-variants.ts
/**
* Avatar 的视觉变体。
*
* 头像本身不承载语义色，只有形状（圆 / 方角工业风）与尺寸两个维度。
*/
const avatarVariants = cva([
	"inline-flex shrink-0 items-center justify-center overflow-hidden",
	"bg-muted text-foreground-muted",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: {
		variant: {
			soft: "bg-muted",
			outline: "border border-border-visible bg-transparent",
			ghost: "bg-transparent"
		},
		size: {
			sm: "size-8",
			md: "size-10",
			lg: "size-14"
		},
		shape: {
			circle: "rounded-full",
			technical: "rounded-card-compact"
		}
	},
	defaultVariants: {
		variant: "soft",
		size: "md",
		shape: "circle"
	}
});
/** 兜底文字。字号跟着尺寸走。 */
const avatarFallbackVariants = cva(["flex size-full select-none items-center justify-center", "font-mono uppercase leading-none tracking-wider text-foreground-muted"], {
	variants: { size: {
		sm: "text-micro",
		md: "text-caption",
		lg: "text-sm"
	} },
	defaultVariants: { size: "md" }
});
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = { default: "md" };
function resolveAvatarSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
//#endregion
export { avatarFallbackVariants, avatarVariants, resolveAvatarSize };

//# sourceMappingURL=avatar-variants.mjs.map