import { cva } from "class-variance-authority";
//#region src/CheckboxGroup/checkbox-group-variants.ts
/** 复选组容器。方向交给 flex，RTL 下横向排列自动镜像。 */
const checkboxGroupVariants = cva(["relative inline-flex gap-xs"], {
	variants: { orientation: {
		horizontal: "flex-row items-center",
		vertical: "flex-col items-stretch"
	} },
	defaultVariants: { orientation: "vertical" }
});
/**
* 相邻选中项共享的合并背景层。
*
* 锚点用 `start-0`（不是 `left-0`）；组件那边会把 hook 算出来的物理坐标
* 换算成对应书写方向的位移，RTL 下不会跑偏。
*/
const checkboxGroupMergeBgVariants = cva([
	"pointer-events-none absolute top-0 start-0 z-0 opacity-0",
	"rounded-md bg-muted",
	"transition-[transform,width,height,opacity] duration-[var(--duration-spring-moderate)]",
	"ease-spring-moderate motion-reduce:transition-none"
]);
/** 单个选项的点击区。 */
const checkboxGroupItemVariants = cva(["relative z-1 rounded-md px-2 py-1"], {
	variants: {
		selected: {
			true: "",
			false: ""
		},
		disabled: {
			true: "opacity-50",
			false: ""
		}
	},
	defaultVariants: {
		selected: false,
		disabled: false
	}
});
//#endregion
export { checkboxGroupItemVariants, checkboxGroupMergeBgVariants, checkboxGroupVariants };

//# sourceMappingURL=checkbox-group-variants.mjs.map