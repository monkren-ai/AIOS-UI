import { PhotoCarouselOrientation, photoCarouselVariants } from "./photo-carousel-variants.mjs";
import * as React$1 from "react";

//#region src/PhotoCarousel/PhotoCarousel.d.ts
interface Slide {
  title: string;
  subtitle?: string;
  /** CSS background (gradient / color). 默认回退到 dot-matrix pattern。 */
  gradient?: string;
  /** 可选图片 URL (优先于 gradient). */
  image?: string;
  /** 占位 dot-matrix 索引 0-3，NF 美学默认（无 image/gradient 时） */
  pattern?: number;
}
interface PhotoCarouselProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slides?: Slide[];
  orientation?: PhotoCarouselOrientation;
  autoplay?: boolean;
}
declare function PhotoCarousel({
  className,
  autoPlay,
  autoPlayInterval,
  slides,
  orientation,
  autoplay: autoplayProp,
  style,
  ...props
}: PhotoCarouselProps): React$1.JSX.Element;
declare namespace PhotoCarousel {
  var displayName: string;
}
//#endregion
export { PhotoCarousel, PhotoCarouselProps };
//# sourceMappingURL=PhotoCarousel.d.mts.map