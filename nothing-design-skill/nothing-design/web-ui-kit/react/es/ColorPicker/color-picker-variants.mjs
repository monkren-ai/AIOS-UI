import { cva } from "class-variance-authority";
//#region src/ColorPicker/color-picker-variants.ts
/** 取色器卡片。 */
const colorPickerVariants = cva(["flex flex-col font-body", "rounded-card-compact border border-border-visible bg-surface"], {
	variants: { size: {
		sm: "max-w-65 gap-sm p-2",
		md: "max-w-80 gap-md p-4",
		lg: "max-w-80 gap-md p-4"
	} },
	defaultVariants: { size: "md" }
});
const colorPickerHeaderVariants = cva(["flex items-center justify-between gap-2"]);
const colorPickerTitleVariants = cva(["font-mono text-label uppercase tracking-widest text-foreground-muted"]);
const colorPickerValueVariants = cva(["font-mono text-caption tracking-widest text-foreground-disabled"]);
const colorPickerSwatchesVariants = cva(["flex flex-wrap gap-sm"]);
/**
* 色块。
*
* 选中态旧实现是双层 `box-shadow` 描边；v2 禁止阴影，
* 改用带 offset 的 outline —— 同样是「留一圈底色再套一圈实线」。
*/
const colorPickerSwatchVariants = cva([
	"cursor-pointer p-0 [-webkit-tap-highlight-color:transparent]",
	"rounded-sm border border-border-visible",
	"transition-transform duration-200 ease-nothing motion-reduce:transition-none",
	"hover:scale-108 motion-reduce:hover:scale-100",
	"focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: {
		size: {
			sm: "size-9",
			md: "size-11",
			lg: "size-13"
		},
		active: {
			true: "outline-2 outline-offset-2 outline-foreground",
			false: ""
		},
		custom: {
			true: "relative inline-flex items-center justify-center overflow-hidden bg-surface-raised",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		active: false,
		custom: false
	}
});
const colorPickerCustomLabelVariants = cva(["pointer-events-none font-mono text-micro uppercase tracking-widest text-foreground-muted"]);
/** 原生 `<input type="color">`：铺满自定义色块但完全透明。 */
const colorPickerNativeVariants = cva(["absolute inset-0 size-full cursor-pointer border-0 p-0 opacity-0"]);
/** hex 输入框前面的小方块预览。 */
const colorPickerPreviewVariants = cva(["inline-block size-[1em] rounded-2xs border border-border-visible"]);
const colorPickerInputVariants = cva([]);
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = { default: "md" };
function resolveColorPickerSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
//#endregion
export { colorPickerCustomLabelVariants, colorPickerHeaderVariants, colorPickerInputVariants, colorPickerNativeVariants, colorPickerPreviewVariants, colorPickerSwatchVariants, colorPickerSwatchesVariants, colorPickerTitleVariants, colorPickerValueVariants, colorPickerVariants, resolveColorPickerSize };

//# sourceMappingURL=color-picker-variants.mjs.map