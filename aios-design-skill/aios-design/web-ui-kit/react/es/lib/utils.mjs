import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
//#region src/lib/utils.ts
/**
* tailwind-merge 需要知道 theme.css 里那些自定义刻度，
* 否则 `text-heading` 之类的具名字号会被误判成文字颜色而不参与去重。
*/
const twMerge = extendTailwindMerge({ extend: { theme: {
	text: [
		"display-xl",
		"display-lg",
		"display-md",
		"display-sm",
		"heading",
		"subheading",
		"caption",
		"label",
		"micro"
	],
	radius: [
		"pill",
		"button",
		"button-technical",
		"card",
		"card-compact",
		"card-technical",
		"input",
		"tag",
		"tooltip",
		"segment"
	],
	spacing: [
		"3xs",
		"2xs",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl"
	],
	font: [
		"display",
		"body",
		"sans",
		"mono",
		"ndot"
	]
} } });
/**
* 合并 className。
*
* 走 tailwind-merge，后写的工具类会覆盖前面同组的：
* `cn('px-4', 'px-6')` → `'px-6'`。未知类名（如遗留的 `aios-btn--primary`）
* 原样保留，所以 Tailwind 组件与尚未迁移的 BEM 组件可以共存。
*
* @example
* ```tsx
* <div className={cn('rounded-card px-4', isActive && 'bg-surface-raised', className)} />
* ```
*/
function cn(...inputs) {
	return twMerge(clsx(inputs));
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