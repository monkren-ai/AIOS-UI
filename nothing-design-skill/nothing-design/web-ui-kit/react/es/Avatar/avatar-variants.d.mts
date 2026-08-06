//#region src/Avatar/avatar-variants.d.ts
/**
 * Avatar 的视觉变体。
 *
 * 头像本身不承载语义色，只有形状（圆 / 方角工业风）与尺寸两个维度。
 */
declare const avatarVariants: (props?: ({
  variant?: "soft" | "outline" | "ghost" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  shape?: "technical" | "circle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 兜底文字。字号跟着尺寸走。 */
declare const avatarFallbackVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type AvatarVariant = 'soft' | 'outline' | 'ghost';
type AvatarSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
type AvatarShape = 'circle' | 'technical';
//#endregion
export { AvatarShape, AvatarSize, AvatarVariant, avatarFallbackVariants, avatarVariants };
//# sourceMappingURL=avatar-variants.d.mts.map