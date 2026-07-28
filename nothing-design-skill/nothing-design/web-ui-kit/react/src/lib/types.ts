import type React from 'react'

/**
 * 语义化 className 映射类型。
 *
 * 参考 Ant Design X 的 `classNames` API，允许用户为组件的不同语义部分
 * 单独传入 className。例如：
 *
 * ```tsx
 * <Sender classNames={{ root: 'my-sender', input: 'my-sender-input' }} />
 * ```
 */
export type SemanticClassNames<T extends string> = Partial<Record<T, string>>

/**
 * 语义化 style 映射类型。
 *
 * 与 `SemanticClassNames` 对应，允许用户为组件的不同语义部分
 * 单独传入 style。例如：
 *
 * ```tsx
 * <Bubble styles={{ content: { background: 'red' } }} />
 * ```
 */
export type SemanticStyles<T extends string> = Partial<Record<T, React.CSSProperties>>

/**
 * 同时包含 classNames 与 styles 的语义化 props。
 *
 * 新增组件可直接继承此类型，并传入具体的语义 slot 名称联合类型：
 *
 * ```ts
 * export type BubbleSemanticType = 'root' | 'content' | 'avatar'
 * export interface BubbleProps extends WithSemanticProps<BubbleSemanticType> { ... }
 * ```
 */
export interface WithSemanticProps<T extends string> {
  /**
   * 语义化结构 className。
   */
  classNames?: SemanticClassNames<T>
  /**
   * 语义化结构 style。
   */
  styles?: SemanticStyles<T>
}

/**
 * 组件配置项中可被 `ConfigProvider` 全局覆盖的字段。
 *
 * 目前只包括 classNames 与 styles，后续可扩展 size、variant 等。
 */
export type ComponentConfig<T extends string> = Pick<
  WithSemanticProps<T>,
  'classNames' | 'styles'
>
