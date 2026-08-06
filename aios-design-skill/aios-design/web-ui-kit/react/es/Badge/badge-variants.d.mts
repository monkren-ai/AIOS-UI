//#region src/Badge/badge-variants.d.ts
/**
 * Badge 的视觉变体。
 *
 * 单色 + 单点红，层级只靠 background / border 表达。
 */
declare const badgeVariants: (props?: ({
  variant?: "outline" | "soft" | "primary" | "destructive" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  dot?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 状态圆点。颜色继承自 badge 自身，destructive 下自然变红。 */
declare const badgeDotVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly default: "primary";
  readonly secondary: "soft";
};
type BadgeVariant = 'primary' | 'soft' | 'outline' | 'destructive' | keyof typeof LEGACY_VARIANTS;
type BadgeSize = 'sm' | 'md' | 'lg';
//#endregion
export { BadgeSize, BadgeVariant, badgeDotVariants, badgeVariants };
//# sourceMappingURL=badge-variants.d.mts.map