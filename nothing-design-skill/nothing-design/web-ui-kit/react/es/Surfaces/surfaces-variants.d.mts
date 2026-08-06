//#region src/Surfaces/surfaces-variants.d.ts
/**
 * Surface 的视觉变体。
 *
 * Nothing 没有阴影，层级只能靠 background + border 表达，所以 8 级 elevation
 * 实际是 tokens.css 里 `--surface-elevated-*` / `--border-elevated-*` 的交替，
 * 而不是一条连续的明度曲线。这些令牌没有进 Tailwind 的 theme namespace
 * （它们是 elevation 专用的间接层），所以这里用 `var()` 直接引。
 */
declare const surfaceVariants: (props?: ({
  elevation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null | undefined;
  padding?: "sm" | "md" | "lg" | "none" | null | undefined;
  border?: "default" | "visible" | "none" | null | undefined;
  radius?: "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type SurfaceElevation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';
type SurfaceBorder = 'none' | 'default' | 'visible';
type SurfaceRadius = 'none' | 'sm' | 'md' | 'lg';
//#endregion
export { SurfaceBorder, SurfaceElevation, SurfacePadding, SurfaceRadius, surfaceVariants };
//# sourceMappingURL=surfaces-variants.d.mts.map