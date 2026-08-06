import { cva } from "class-variance-authority";
//#region src/Quotes/quotes-variants.ts
/**
* Quotes 的视觉变体。
*
* 这是一个圆形 widget：外圈是进度环，圆心是一段 NDot 语录。
* `theme` 决定文字色（widget 色板，不随 [data-theme] 走）；
* `size` 在 v1 里就没有对应样式，这里保留成空档位只为了不改公开 API。
*/
const quotesVariants = cva([
	"relative flex items-center justify-center overflow-hidden rounded-full",
	"size-[var(--widget-size-md)]",
	"transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
], {
	variants: {
		theme: {
			light: "",
			dark: ""
		},
		size: {
			sm: "",
			md: "",
			lg: ""
		}
	},
	defaultVariants: {
		theme: "dark",
		size: "md"
	}
});
/**
* 铺满整块的进度环画布。
*
* 环用 `stroke-current`，颜色统一由这里的 `text-*` 决定，跟正文同色。
*/
const quotesSvgVariants = cva(["absolute inset-0 size-full"], {
	variants: { theme: {
		light: "text-[var(--widget-dark-2)]",
		dark: "text-[var(--widget-white)]"
	} },
	defaultVariants: { theme: "dark" }
});
/**
* 进度环。
*
* 底环压到 15% 只作轨道，进度环靠 `stroke-dashoffset` 走；
* 起点旋到 12 点方向，符合读数直觉。
*/
const quotesRingVariants = cva(["fill-none stroke-current [stroke-width:2]"], {
	variants: { kind: {
		bg: "opacity-15",
		progress: ["origin-center -rotate-90 opacity-70 [stroke-linecap:round]", "transition-[stroke-dashoffset] duration-[350ms] ease-aios motion-reduce:transition-none"]
	} },
	defaultVariants: { kind: "bg" }
});
/** 圆心的文字块。 */
const quotesContentVariants = cva(["relative z-1 flex w-[130px] flex-col items-center justify-center gap-1 text-center"]);
/** 语录正文。 */
const quotesTextVariants = cva(["w-full break-words font-ndot text-micro leading-[1.4] tracking-normal", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { theme: {
		light: "text-[var(--widget-dark-2)]",
		dark: "text-[var(--widget-white)]"
	} },
	defaultVariants: { theme: "dark" }
});
/** 作者署名。恒定用 AIOS 红，不跟 theme 走。 */
const quotesAuthorVariants = cva(["font-body text-micro font-semibold uppercase tracking-[0.05em] text-[var(--widget-primary)]", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
//#endregion
export { quotesAuthorVariants, quotesContentVariants, quotesRingVariants, quotesSvgVariants, quotesTextVariants, quotesVariants };

//# sourceMappingURL=quotes-variants.mjs.map