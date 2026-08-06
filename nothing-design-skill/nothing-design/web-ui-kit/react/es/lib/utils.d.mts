import { SemanticClassNames, SemanticStyles } from "./types.mjs";
import { ClassValue } from "clsx";

//#region src/lib/utils.d.ts
/**
 * 合并 className。
 *
 * 走 tailwind-merge，后写的工具类会覆盖前面同组的：
 * `cn('px-4', 'px-6')` → `'px-6'`。未知类名（如遗留的 `nothing-btn--primary`）
 * 原样保留，所以 Tailwind 组件与尚未迁移的 BEM 组件可以共存。
 *
 * @example
 * ```tsx
 * <div className={cn('rounded-card px-4', isActive && 'bg-surface-raised', className)} />
 * ```
 */
declare function cn(...inputs: ClassValue[]): string;
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
declare function mergeSemanticProps<T extends string>(...sources: ({
  classNames?: SemanticClassNames<T>;
  styles?: SemanticStyles<T>;
} | null | undefined)[]): {
  classNames: SemanticClassNames<T>;
  styles: SemanticStyles<T>;
};
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
declare function dataAttr(value: string | number | boolean | undefined | null): string | number | undefined;
//#endregion
export { cn, dataAttr, mergeSemanticProps };
//# sourceMappingURL=utils.d.mts.map