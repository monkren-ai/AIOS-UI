import { CardShape, CardSize, CardVariant, contentCardVariants } from "./card-variants.mjs";
import * as React$1 from "react";

//#region src/Card/Card.d.ts
type ContentCardProps = React$1.ComponentPropsWithRef<'div'> & {
  variant?: CardVariant;
  size?: CardSize;
  shape?: CardShape;
  interactive?: boolean;
  disabled?: boolean;
  title?: string;
  action?: string;
  onAction?: (event: React$1.MouseEvent<HTMLElement>) => void;
  footer?: React$1.ReactNode;
  media?: React$1.ReactNode;
  logo?: React$1.ReactNode;
  feature?: React$1.ReactNode;
};
type CardProps = ContentCardProps;
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
declare const Card: typeof ContentCard;
//#endregion
export { Card, CardProps, ContentCard, ContentCardProps };
//# sourceMappingURL=Card.d.mts.map