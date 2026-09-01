import { cva } from "class-variance-authority";
//#region src/NumberTicker/number-ticker-variants.ts
const numberTickerVariants = cva("inline-flex items-baseline font-mono tabular-nums text-foreground-display", {
	variants: { size: {
		sm: "text-sm",
		md: "text-heading",
		lg: "text-display-sm"
	} },
	defaultVariants: { size: "md" }
});
const numberTickerDigitVariants = cva("relative inline-block overflow-hidden");
const numberTickerDigitValueVariants = cva("inline-block motion-safe:animate-digit-in motion-reduce:animate-none");
const numberTickerAffixVariants = cva("text-foreground-muted");
//#endregion
export { numberTickerAffixVariants, numberTickerDigitValueVariants, numberTickerDigitVariants, numberTickerVariants };

//# sourceMappingURL=number-ticker-variants.mjs.map