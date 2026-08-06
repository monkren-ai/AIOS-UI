import { cva } from "class-variance-authority";
//#region src/PreviewCard/preview-card-variants.ts
/**
* PreviewCard 的视觉变体。
*
* 卡片本身只承载背景与圆角；内边距与媒体高度交给 body / media / footer
* 各自的 CVA，这样顶部缩略图可以贴着卡片边缘铺满，而正文与页脚各自留白。
*/
const previewCardVariants = cva([
	"flex flex-col overflow-hidden",
	"border border-border-visible rounded-card",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none"
], {
	variants: { variant: {
		default: "bg-surface",
		raised: "bg-surface-raised",
		compact: "bg-surface"
	} },
	defaultVariants: { variant: "default" }
});
/** 顶部媒体区。`compact` 把高度压到 80px，与正文的紧凑内边距呼应。 */
const previewCardMediaVariants = cva(["relative w-full overflow-hidden"], {
	variants: {
		size: {
			sm: "h-24",
			md: "h-36",
			lg: "h-48"
		},
		compact: {
			true: "h-20",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		compact: false
	}
});
/** 正文区。内边距与行间距跟着 `size` 走，`compact` 收紧到 sm 一档。 */
const previewCardBodyVariants = cva(["flex flex-col"], {
	variants: {
		size: {
			sm: "p-3 gap-2",
			md: "p-4 gap-3",
			lg: "p-5 gap-4"
		},
		compact: {
			true: "p-3 gap-1.5",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		compact: false
	}
});
/** 页脚。顶部一条分隔线 + 与正文同档的内边距。 */
const previewCardFooterVariants = cva(["flex items-center gap-2 border-t border-border"], {
	variants: {
		size: {
			sm: "px-3 py-2",
			md: "px-4 py-3",
			lg: "px-5 py-4"
		},
		compact: {
			true: "px-3 py-2",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		compact: false
	}
});
//#endregion
export { previewCardBodyVariants, previewCardFooterVariants, previewCardMediaVariants, previewCardVariants };

//# sourceMappingURL=preview-card-variants.mjs.map