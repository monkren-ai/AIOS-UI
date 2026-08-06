//#region src/Switch/switch-variants.d.ts
/**
 * Switch 的视觉变体。
 *
 * 打开态是「实心反相」：轨道填 `bg-foreground-display`，滑块变 `bg-background`。
 * 滑块位移用逻辑属性 `start-*`，RTL 下自动镜像。
 */
declare const switchVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  checked?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 轨道（Base UI Switch.Root）。 */
declare const switchTrackVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 滑块（Base UI Switch.Thumb）。 */
declare const switchThumbVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 文字标签。打开后提亮到 text-foreground。 */
declare const switchLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type SwitchSize = 'sm' | 'md' | 'lg';
//#endregion
export { SwitchSize, switchLabelVariants, switchThumbVariants, switchTrackVariants, switchVariants };
//# sourceMappingURL=switch-variants.d.mts.map