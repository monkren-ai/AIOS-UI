import { cva } from "class-variance-authority";
//#region src/Tag/tag-variants.ts
/**
* Tag 的视觉变体。
*
* `shape` 与 `variant` 是两个正交维度：v1 把「方角工业风」塞在 variant 里叫
* `technical`，v2 把它挪到 `shape`，老名字继续由 resolveTagVariant/resolveTagShape 兜住。
*
* proximity（邻近高亮）由 `Tags` 容器给出 `group/tags` 与每个 Tag 上的
* `data-proximity-active`，这里只负责响应，不含任何阴影或位移之外的效果。
*/
const tagVariants = cva([
	"inline-flex select-none items-center gap-1",
	"whitespace-nowrap font-mono uppercase tracking-wider",
	"cursor-pointer border bg-transparent",
	"transition-[border-color,color,background-color,opacity,transform] duration-200 ease-nothing",
	"motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"data-[proximity-active=true]:z-10 data-[proximity-active=true]:border-foreground data-[proximity-active=true]:text-foreground",
	"data-[proximity-active=true]:scale-[1.04] motion-reduce:data-[proximity-active=true]:scale-100",
	"group-hover/tags:data-[proximity-active=false]:opacity-55"
], {
	variants: {
		variant: {
			secondary: "border-border-visible text-foreground-muted hover:not-data-disabled:border-foreground-muted hover:not-data-disabled:text-foreground hover:not-data-disabled:scale-[1.02] motion-reduce:hover:scale-100",
			soft: "border-border bg-surface-raised text-foreground hover:not-data-disabled:border-border-visible hover:not-data-disabled:text-foreground-display",
			outline: "border-border text-foreground-subtle hover:not-data-disabled:border-border-visible hover:not-data-disabled:text-foreground",
			ghost: "border-transparent text-foreground-muted hover:not-data-disabled:bg-muted hover:not-data-disabled:text-foreground-display",
			destructive: "border-accent text-accent hover:not-data-disabled:bg-accent-subtle"
		},
		size: {
			sm: "h-6 px-2 text-micro",
			md: "h-7 px-3 text-caption",
			lg: "h-8 px-4 text-sm"
		},
		shape: {
			pill: "rounded-tag",
			technical: "rounded-xs"
		},
		active: {
			true: "border-foreground-display text-foreground-display hover:opacity-85",
			false: ""
		},
		disabled: {
			true: "cursor-not-allowed opacity-40 hover:scale-100",
			false: ""
		}
	},
	defaultVariants: {
		variant: "secondary",
		size: "md",
		shape: "pill",
		active: false,
		disabled: false
	}
});
/** Tags 容器：flex 换行 + proximity 的 group 锚点。 */
const tagsVariants = cva(["flex flex-wrap gap-1"], {
	variants: { proximity: {
		true: "group/tags",
		false: ""
	} },
	defaultVariants: { proximity: false }
});
/** v1 的变体名 → 当前变体名。`technical` 只是形状，颜色沿用 secondary。 */
const LEGACY_VARIANTS = {
	pill: "secondary",
	technical: "secondary",
	default: "secondary"
};
/** v1 里塞在 variant 上的形状名。 */
const LEGACY_SHAPES = {
	technical: "technical",
	pill: "pill"
};
function resolveTagVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
/** 老调用点把形状写在 variant 上时，把它翻译成 shape。 */
function resolveTagShape(variant, shape) {
	if (shape) return shape;
	if (!variant) return void 0;
	return LEGACY_SHAPES[variant];
}
//#endregion
export { resolveTagShape, resolveTagVariant, tagVariants, tagsVariants };

//# sourceMappingURL=tag-variants.mjs.map