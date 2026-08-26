//#region src/Tag/tag-variants.d.ts
/**
 * Tag 的视觉变体。
 *
 * `shape` 与 `variant` 是两个正交维度：v1 把「方角工业风」塞在 variant 里叫
 * `technical`，v2 把它挪到 `shape`，老名字继续由 resolveTagVariant/resolveTagShape 兜住。
 *
 * proximity（邻近高亮）由 `Tags` 容器给出 `group/tags` 与每个 Tag 上的
 * `data-proximity-active`，这里只负责响应，不含任何阴影或位移之外的效果。
 */
declare const tagVariants: (props?: ({
  variant?: "soft" | "outline" | "destructive" | "ghost" | "secondary" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  shape?: "pill" | "technical" | null | undefined;
  active?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Tags 容器：flex 换行 + proximity 的 group 锚点。 */
declare const tagsVariants: (props?: ({
  proximity?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。`technical` 只是形状，颜色沿用 secondary。 */
declare const LEGACY_VARIANTS: {
  readonly pill: "secondary";
  readonly technical: "secondary";
  readonly default: "secondary";
};
type TagVariant = 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive' | keyof typeof LEGACY_VARIANTS;
type TagSize = 'sm' | 'md' | 'lg';
type TagShape = 'pill' | 'technical';
//#endregion
export { TagShape, TagSize, TagVariant, tagVariants, tagsVariants };
//# sourceMappingURL=tag-variants.d.mts.map