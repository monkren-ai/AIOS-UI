//#region src/Button/button-variants.d.ts
/**
 * Button 的视觉变体。
 *
 * 变体/尺寸命名对齐 appica-ui，配色收敛到 Nothing 的 monochrome + 单点红：
 * 没有阴影、没有 blur、没有渐变，层级只靠 background 与 border 表达。
 *
 * 直接把返回的类名贴到 `<a>` 上，就能得到一个「长得像按钮的链接」而不丢链接语义。
 */
declare const buttonVariants: (props?: ({
  variant?: "soft" | "secondary" | "outline" | "ghost" | "primary" | "destructive" | "primary-outline" | null | undefined;
  size?: "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg" | null | undefined;
  fullWidth?: boolean | null | undefined;
  loading?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
declare const LEGACY_VARIANTS: {
  readonly tertiary: "soft";
};
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
  readonly icon: "icon-md";
};
type ButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive' | keyof typeof LEGACY_VARIANTS;
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { ButtonSize, ButtonVariant, buttonVariants };
//# sourceMappingURL=button-variants.d.mts.map