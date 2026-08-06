//#region src/Alert/alert-variants.d.ts
/**
 * Alert 的视觉变体。
 *
 * 顶部 3px 的粗边是 Nothing 的「仪表盘状态条」，destructive 时换成单点红。
 * 进出场只用 opacity + translate，没有阴影也没有 blur。
 */
declare const alertVariants: (props?: ({
  variant?: "soft" | "destructive" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 图标槽位。destructive 下跟着标题一起变红。 */
declare const alertIconVariants: (props?: ({
  variant?: "soft" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 标题槽位。 */
declare const alertTitleVariants: (props?: ({
  variant?: "soft" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 正文槽位。 */
declare const alertMessageVariants: (props?: ({
  variant?: "soft" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly default: "soft";
};
type AlertVariant = 'soft' | 'destructive' | keyof typeof LEGACY_VARIANTS;
type AlertSize = 'sm' | 'md' | 'lg';
//#endregion
export { AlertSize, AlertVariant, alertIconVariants, alertMessageVariants, alertTitleVariants, alertVariants };
//# sourceMappingURL=alert-variants.d.mts.map