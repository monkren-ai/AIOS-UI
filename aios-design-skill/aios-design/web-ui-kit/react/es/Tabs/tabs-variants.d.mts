//#region src/Tabs/tabs-variants.d.ts
/**
 * Tabs 的视觉变体。
 *
 * 三种形态：
 * - `default` 底部一条分隔线 + 线性 indicator
 * - `pills` 整条 list 变成一个 surface-raised 胶囊容器，选中项反白
 * - `subtle` 无容器，正文字体，indicator 收细到 1px
 *
 * indicator 与 hover 垫层的位移走 `inset-inline-start`，RTL 下自动镜像。
 */
declare const tabsVariants: (props?: ({
  variant?: "default" | "subtle" | "pills" | null | undefined;
  indicator?: "line" | "none" | "background" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** tablist 容器。变体差异主要落在这里。 */
declare const tabsListVariants: (props?: ({
  variant?: "default" | "subtle" | "pills" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个 tab 触发器。 */
declare const tabTriggerVariants: (props?: ({
  variant?: "default" | "subtle" | "pills" | null | undefined;
  active?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 线性 indicator。位置由 JS 写进 `inset-inline-start` / `width`。 */
declare const tabsIndicatorVariants: (props?: ({
  variant?: "default" | "subtle" | "pills" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** proximity hover 的背景垫层，压在 trigger 下面。 */
declare const tabsHoverBackgroundVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 面板容器。 */
declare const tabsPanelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type TabsVariant = 'default' | 'pills' | 'subtle';
type TabsIndicator = 'line' | 'background' | 'none';
//#endregion
export { TabsIndicator, TabsVariant, tabTriggerVariants, tabsHoverBackgroundVariants, tabsIndicatorVariants, tabsListVariants, tabsPanelVariants, tabsVariants };
//# sourceMappingURL=tabs-variants.d.mts.map