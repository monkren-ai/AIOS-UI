import { carouselButtonVariants, carouselControlsVariants, carouselSlideVariants, carouselStatusVariants, carouselVariants, carouselViewportVariants } from "./carousel-variants.mjs";
import * as React$1 from "react";

//#region src/Carousel/Carousel.d.ts
interface CarouselProps extends Omit<React$1.ComponentPropsWithRef<'section'>, 'children'> {
  items: React$1.ReactNode[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  loop?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}
declare function Carousel({
  items,
  value,
  defaultValue,
  onValueChange,
  loop,
  previousLabel,
  nextLabel,
  className,
  ...props
}: CarouselProps): React$1.JSX.Element;
declare namespace Carousel {
  var displayName: string;
}
//#endregion
export { Carousel, CarouselProps };
//# sourceMappingURL=Carousel.d.mts.map