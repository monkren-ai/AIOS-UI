import { cva } from "class-variance-authority";
//#region src/Spinner/spinner-variants.ts
/**
* Spinner（转盘）的视觉变体。
*
* 这是「随机决策转盘」而不是 loading 圈：扇区交替填 text-display / surface-raised，
* 指针与命中扇区用单点红标记，全程没有阴影与渐变。
*/
const spinnerVariants = cva(["flex flex-col items-center rounded-lg border transition-colors duration-300 ease-aios", "motion-reduce:transition-none"], {
	variants: {
		variant: {
			soft: "border-border bg-surface",
			outline: "border-border-visible bg-transparent",
			destructive: "border-accent bg-accent-subtle"
		},
		size: {
			sm: "p-4",
			md: "p-8",
			lg: "p-12"
		}
	},
	defaultVariants: {
		variant: "soft",
		size: "md"
	}
});
/** 转盘容器。尺寸决定盘面直径。 */
const spinnerWheelVariants = cva(["relative mb-6"], {
	variants: { size: {
		sm: "size-48",
		md: "size-70",
		lg: "size-90"
	} },
	defaultVariants: { size: "md" }
});
/** 顶部指针。用 border 拼出的三角形，左右两侧走逻辑属性。 */
const spinnerPointerVariants = cva([
	"absolute -top-3 start-1/2 z-10 -translate-x-1/2 rtl:translate-x-1/2",
	"size-0 border-s-[12px] border-e-[12px] border-t-[20px]",
	"border-s-transparent border-e-transparent border-t-accent"
]);
/** 盘面 SVG。3.5s 的减速旋转，motion-reduce 下直接瞬移。 */
const spinnerSvgVariants = cva([
	"size-full",
	"transition-transform duration-[3500ms] ease-[cubic-bezier(0.17,0.67,0.12,0.99)]",
	"motion-reduce:transition-none"
]);
/** 扇区。 */
const spinnerSectorVariants = cva(["stroke-border [stroke-width:1]", "transition-[fill] duration-300 ease-aios motion-reduce:transition-none"], {
	variants: {
		isEven: {
			true: "fill-foreground-display",
			false: "fill-surface-raised"
		},
		selected: {
			true: "stroke-accent [stroke-width:3]",
			false: ""
		}
	},
	defaultVariants: {
		isEven: true,
		selected: false
	}
});
/** 扇区文字。 */
const spinnerTextVariants = cva(["pointer-events-none font-mono text-label font-bold tracking-wide", "[text-anchor:middle] [dominant-baseline:central]"], {
	variants: {
		isEven: {
			true: "fill-surface",
			false: "fill-foreground-display"
		},
		selected: {
			true: "fill-accent",
			false: ""
		}
	},
	defaultVariants: {
		isEven: true,
		selected: false
	}
});
/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = {
	default: "soft",
	accent: "destructive"
};
function resolveSpinnerVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
//#endregion
export { resolveSpinnerVariant, spinnerPointerVariants, spinnerSectorVariants, spinnerSvgVariants, spinnerTextVariants, spinnerVariants, spinnerWheelVariants };

//# sourceMappingURL=spinner-variants.mjs.map