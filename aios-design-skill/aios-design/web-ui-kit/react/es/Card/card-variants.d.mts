//#region src/Card/card-variants.d.ts
/**
 * 内容卡片的视觉变体。
 *
 * v1 把「密度」（compact）与「形状」（technical）混在 variant 里，v2 把它们
 * 拆成 `size` 与 `shape` 两个正交维度，variant 只留下强调层级。
 */
declare const contentCardVariants: (props?: ({
  variant?: "soft" | "outline" | "ghost" | "secondary" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  shape?: "rounded" | "technical" | null | undefined;
  interactive?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_CARD_VARIANTS: {
  readonly default: "soft";
  readonly raised: "secondary";
  readonly borderless: "ghost";
  readonly compact: "soft";
  readonly technical: "soft";
};
type CardVariant = 'soft' | 'secondary' | 'outline' | 'ghost' | keyof typeof LEGACY_CARD_VARIANTS;
type CardSize = 'sm' | 'md' | 'lg';
type CardShape = 'rounded' | 'technical';
/**
 * Widget 卡片的视觉变体。
 *
 * `size` 描述的是桌面小组件的版型（方 / 宽 / 高），不是控件高度阶梯，
 * 所以额外接受 sm|md|lg 作为 tall|square|wide 的别名。
 *
 * v1 的 hover 用了一层跟随鼠标的 radial-gradient，v2 直接删掉——
 * AIOS 不用渐变表达层级，hover 只换 border 与 background。
 */
declare const widgetCardVariants: (props?: ({
  size?: "square" | "wide" | "tall" | "auto" | null | undefined;
  shape?: "circle" | "pill" | "rounded" | null | undefined;
  theme?: "accent" | "light" | "dark" | null | undefined;
  density?: "default" | "compact" | null | undefined;
  align?: "left" | "center" | "right" | null | undefined;
  clickable?: boolean | null | undefined;
  hasChildren?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Widget 标题。 */
declare const widgetCardTitleVariants: (props?: ({
  theme?: "accent" | "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Widget 主数值。 */
declare const widgetCardValueVariants: (props?: ({
  theme?: "accent" | "light" | "dark" | null | undefined;
  density?: "default" | "compact" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Widget 副标题。 */
declare const widgetCardSubtitleVariants: (props?: ({
  theme?: "accent" | "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的版型别名。 */
declare const LEGACY_WIDGET_SIZES: {
  readonly sm: "tall";
  readonly md: "square";
  readonly lg: "wide";
};
type WidgetCardSize = 'square' | 'wide' | 'tall' | 'auto' | keyof typeof LEGACY_WIDGET_SIZES;
type WidgetCardShape = 'rounded' | 'pill' | 'circle';
type WidgetCardTheme = 'light' | 'dark' | 'accent';
type WidgetCardDensity = 'default' | 'compact';
type WidgetCardAlign = 'left' | 'center' | 'right';
type WidgetCardIconPosition = 'top' | 'left' | 'right' | 'bottom';
//#endregion
export { CardShape, CardSize, CardVariant, WidgetCardAlign, WidgetCardDensity, WidgetCardIconPosition, WidgetCardShape, WidgetCardSize, WidgetCardTheme, contentCardVariants, widgetCardSubtitleVariants, widgetCardTitleVariants, widgetCardValueVariants, widgetCardVariants };
//# sourceMappingURL=card-variants.d.mts.map