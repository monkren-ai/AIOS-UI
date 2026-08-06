//#region src/Navigation/navigation-variants.d.ts
/**
 * Navigation 的视觉变体。
 *
 * 断点沿用 v1 的 768/769 分界（Tailwind 的 `md:` 是 min-width:768px，正好差 1px），
 * 所以桌面版写成 base、窄屏用 `max-[768px]:` 覆盖成底部标签栏。
 *
 * `variant` 描述的是选中态的表达方式（滑动下划线 / 方括号 / 竖线分隔），
 * 不参与 §3 的强调层级词表。
 */
declare const navigationVariants: (props?: ({
  variant?: "default" | "bracket" | "pipe" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个导航项。 */
declare const navItemVariants: (props?: ({
  variant?: "default" | "bracket" | "pipe" | null | undefined;
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type NavigationVariant = 'default' | 'bracket' | 'pipe';
//#endregion
export { NavigationVariant, navItemVariants, navigationVariants };
//# sourceMappingURL=navigation-variants.d.mts.map