import { clsx } from "clsx";
//#region src/lib/utils.ts
/**
* 合并 className（替代 [...].filter(Boolean).join(' ')）。
*
* Nothing UI 基于 CSS（而非 Tailwind），所以无需 tailwind-merge。
* 单纯用 clsx 即可处理条件类名、对象语法、数组语法。
*
* @example
* ```tsx
* <div className={cn('nothing-btn', isActive && 'nothing-btn--active', className)} />
* ```
*/
function cn(...inputs) {
	return clsx(inputs);
}
/**
* 把任意值规范化为合法的 HTML data-* 属性值。
*
* - undefined / null / false → 返回 undefined（React 不会渲染该属性）
* - true → 返回空字符串（仅作为存在性标记）
* - 其他 → 返回原始值
*
* @example
* ```tsx
* <div data-variant={dataAttr(variant)} data-disabled={dataAttr(disabled)} />
* ```
*/
function dataAttr(value) {
	if (value === void 0 || value === null || value === false) return;
	if (value === true) return "";
	return value;
}
//#endregion
export { cn, dataAttr };

//# sourceMappingURL=utils.mjs.map