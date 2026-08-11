import { cva } from "class-variance-authority";
//#region src/Carousel/carousel-variants.ts
const carouselVariants = cva(["relative w-full"]);
const carouselViewportVariants = cva(["overflow-hidden rounded-card border border-border-visible bg-surface"]);
const carouselSlideVariants = cva(["w-full transition-opacity duration-200 ease-aios motion-reduce:transition-none"]);
const carouselControlsVariants = cva(["mt-2 flex items-center justify-between gap-2"]);
const carouselButtonVariants = cva([
	"inline-flex size-9 items-center justify-center rounded-button border border-border-visible bg-transparent",
	"font-mono text-sm text-foreground transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"hover:bg-muted disabled:pointer-events-none disabled:opacity-40",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
]);
const carouselStatusVariants = cva(["font-mono text-label uppercase tracking-wider text-foreground-muted"]);
//#endregion
export { carouselButtonVariants, carouselControlsVariants, carouselSlideVariants, carouselStatusVariants, carouselVariants, carouselViewportVariants };

//# sourceMappingURL=carousel-variants.mjs.map