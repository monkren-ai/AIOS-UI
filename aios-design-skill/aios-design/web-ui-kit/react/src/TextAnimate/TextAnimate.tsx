import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { textAnimateVariants, type TextAnimateMode } from './text-animate-variants'
import './TextAnimate.css'

export interface TextAnimateProps extends Omit<React.ComponentPropsWithRef<'p'>, 'children'> {
  /** 待揭示的纯文本。 */
  children: string
  /** 切分粒度：char 逐字、word 逐词、line 逐行（按 `\n` 切）。 */
  mode?: TextAnimateMode
  /** 每段递增延迟，默认 40ms。 */
  delay?: number
  /** 单段动画时长，默认 300ms。 */
  duration?: number
  /** 渲染成的元素标签。 */
  as?: 'div' | 'span' | 'p'
  /** 只播一次（默认）；为 false 时循环。 */
  once?: boolean
}

const TAGS: Record<NonNullable<TextAnimateProps['as']>, React.ElementType> = {
  div: 'div',
  span: 'span',
  p: 'p',
}

function splitSegments(text: string, mode: TextAnimateMode): string[] {
  if (mode === 'char') return Array.from(text)
  if (mode === 'line') return text.split('\n')
  // 保留空白作为独立 token，以便词与词之间的间距不丢。
  return text.split(/(\s+)/)
}

const isWhitespace = (token: string) => /^\s+$/.test(token)

// 完整静态类名——Tailwind 扫描时必须能看见整串，不能用插值拼。
const REVEAL_ONCE =
  'motion-safe:animate-[aios-text-reveal_var(--aios-text-duration,300ms)_var(--ease-aios)_1_both]'
const REVEAL_LOOP =
  'motion-safe:animate-[aios-text-reveal_var(--aios-text-duration,300ms)_var(--ease-aios)_infinite_both]'

export function TextAnimate({
  children,
  mode = 'word',
  delay = 40,
  duration = 300,
  as = 'p',
  once = true,
  className,
  style,
  ...props
}: TextAnimateProps) {
  const Tag = TAGS[as]
  const segmentClass = cn(
    'aios-text-animate__segment inline-block will-change-[opacity,transform]',
    once ? REVEAL_ONCE : REVEAL_LOOP,
    'motion-reduce:animate-none motion-reduce:opacity-100',
  )

  const tokens = splitSegments(children, mode)
  let segmentIndex = 0

  return (
    <Tag
      className={cn(textAnimateVariants({ mode }), className)}
      style={
        {
          '--aios-text-duration': `${duration}ms`,
          ...style,
        } as React.CSSProperties
      }
      data-slot="text-animate"
      data-mode={dataAttr(mode)}
      {...props}
    >
      {tokens.map((token, i) => {
        // word / line 模式下，空白作为纯文本节点输出，不参与动画。
        if (mode !== 'char' && isWhitespace(token)) return token
        const idx = mode === 'char' ? i : segmentIndex++
        return (
          <span
            key={i}
            data-slot="text-animate-segment"
            className={cn(segmentClass, mode === 'line' && 'block')}
            style={{ animationDelay: `${idx * delay}ms` }}
          >
            {token}
          </span>
        )
      })}
    </Tag>
  )
}

TextAnimate.displayName = 'TextAnimate'

export { textAnimateVariants }
export default TextAnimate
