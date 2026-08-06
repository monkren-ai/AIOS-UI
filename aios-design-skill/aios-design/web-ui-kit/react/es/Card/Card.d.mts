import { CardShape, CardSize, CardVariant, WidgetCardAlign, WidgetCardDensity, WidgetCardIconPosition, WidgetCardShape, WidgetCardSize, WidgetCardTheme, contentCardVariants, widgetCardVariants } from "./card-variants.mjs";
import * as React$1 from "react";

//#region src/Card/Card.d.ts
type ContentCardProps = React$1.ComponentPropsWithRef<'div'> & {
  /** 视觉样式。 */variant?: CardVariant; /** 内边距密度。 */
  size?: CardSize; /** 圆角或工业风方角。 */
  shape?: CardShape; /** 整卡可点击，带 button 语义与键盘激活。 */
  interactive?: boolean;
  disabled?: boolean;
  title?: string;
  action?: string;
  onAction?: (e: React$1.MouseEvent<HTMLElement>) => void;
  footer?: React$1.ReactNode;
  media?: React$1.ReactNode;
  logo?: React$1.ReactNode;
  feature?: React$1.ReactNode;
};
type WidgetCardProps = Omit<React$1.ComponentPropsWithRef<'div'>, 'onClick' | 'title'> & {
  /** 版型。也接受 sm|md|lg 作为 tall|square|wide 的别名。 */size?: WidgetCardSize;
  shape?: WidgetCardShape; /** Widget 自己的配色，与全局 `[data-theme]` 无关。 */
  theme?: WidgetCardTheme; /** 内边距密度。 */
  variant?: WidgetCardDensity;
  align?: WidgetCardAlign;
  iconPosition?: WidgetCardIconPosition;
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: React$1.ReactNode;
  onClick?: () => void;
};
type CardProps = (ContentCardProps & {
  mode?: 'content';
}) | (WidgetCardProps & {
  mode: 'widget';
});
declare function ContentCard({
  variant,
  size,
  shape,
  interactive,
  disabled,
  title,
  action,
  onAction,
  onClick,
  footer,
  media,
  logo,
  feature,
  children,
  className,
  ...props
}: ContentCardProps): React$1.JSX.Element;
declare namespace ContentCard {
  var displayName: string;
}
declare function WidgetCard({
  size,
  shape,
  theme,
  variant,
  title,
  value,
  subtitle,
  icon,
  iconPosition,
  align,
  className,
  children,
  onClick,
  ...props
}: WidgetCardProps): React$1.JSX.Element;
declare namespace WidgetCard {
  var displayName: string;
}
declare function Card(props: CardProps): React$1.JSX.Element;
declare namespace Card {
  var displayName: string;
}
//#endregion
export { Card, CardProps, ContentCard, ContentCardProps, WidgetCard, WidgetCardProps };
//# sourceMappingURL=Card.d.mts.map