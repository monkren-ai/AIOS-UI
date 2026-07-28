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
* 合并多层语义化 classNames / styles。
*
* 优先级从高到低：用户传入 > 组件默认 > Provider 全局配置。
* 用于实现 Ant Design X 风格的 `classNames` / `styles` 语义化 API。
*
* @example
* ```tsx
* const { classNames, styles } = mergeSemanticProps(
*   providerConfig,
*   defaultSemantic,
*   userProps,
* )
* ```
*/
function mergeSemanticProps(...sources) {
	return sources.reduce((acc, source) => {
		if (!source) return acc;
		const { classNames: sourceClassNames, styles: sourceStyles } = source;
		if (sourceClassNames) for (const key of Object.keys(sourceClassNames)) {
			const value = sourceClassNames[key];
			if (value === void 0) continue;
			acc.classNames[key] = cn(acc.classNames[key], value);
		}
		if (sourceStyles) for (const key of Object.keys(sourceStyles)) {
			const value = sourceStyles[key];
			if (value === void 0) continue;
			acc.styles[key] = {
				...acc.styles[key],
				...value
			};
		}
		return acc;
	}, {
		classNames: {},
		styles: {}
	});
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
export { cn, dataAttr, mergeSemanticProps };

//# sourceMappingURL=utils.mjs.map