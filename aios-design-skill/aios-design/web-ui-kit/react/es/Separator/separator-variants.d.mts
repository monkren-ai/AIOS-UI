//#region src/Separator/separator-variants.d.ts
/**
 * Separator 的视觉变体。
 *
 * 只有一条 1px 的 border 色细线，可选中缀标签。`size` 控制线两侧留白。
 */
declare const separatorVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 细线本体。 */
declare const separatorLineVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 中缀标签。 */
declare const separatorLabelVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'sm' | 'md' | 'lg';
//#endregion
export { SeparatorOrientation, SeparatorSize, separatorLabelVariants, separatorLineVariants, separatorVariants };
//# sourceMappingURL=separator-variants.d.mts.map