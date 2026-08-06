//#region src/Breadcrumb/breadcrumb-variants.d.ts
/** Breadcrumb 根导航。等宽字，尺寸只影响字号。 */
declare const breadcrumbVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个层级里的链接 / 按钮 / 纯文本。 */
declare const breadcrumbLinkVariants: (props?: ({
  current?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type BreadcrumbSize = 'sm' | 'md' | 'lg';
//#endregion
export { BreadcrumbSize, breadcrumbLinkVariants, breadcrumbVariants };
//# sourceMappingURL=breadcrumb-variants.d.mts.map