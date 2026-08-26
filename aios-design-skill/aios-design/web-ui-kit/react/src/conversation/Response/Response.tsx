import * as React from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/CodeBlock'
import { responseVariants } from './response-variants'

export interface ResponseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string
  components?: Components
  codeCopyable?: boolean
}

export function Response({
  children,
  components,
  codeCopyable = true,
  className,
  ref,
  ...props
}: ResponseProps & { ref?: React.Ref<HTMLDivElement> }) {
  const defaults: Components = {
    a: ({ href, children: linkChildren, ...anchorProps }) => {
      const external = typeof href === 'string' && /^(https?:)?\/\//.test(href)
      return (
        <a
          href={href}
          {...anchorProps}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          className="underline decoration-border-visible underline-offset-4 hover:text-accent"
        >
          {linkChildren}
        </a>
      )
    },
    code: ({ className: codeClassName, children: codeChildren, ...codeProps }) => {
      const language = /language-([\w-]+)/.exec(codeClassName ?? '')?.[1]
      const value = String(codeChildren).replace(/\n$/, '')
      if (language || value.includes('\n'))
        return (
          <CodeBlock code={value} language={language} copyable={codeCopyable} className="my-4" />
        )
      return (
        <code
          className="rounded-xs border border-border bg-muted px-1 py-0.5 font-mono text-[0.9em]"
          {...codeProps}
        >
          {codeChildren}
        </code>
      )
    },
  }
  return (
    <div ref={ref} className={cn(responseVariants(), className)} data-slot="response" {...props}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...defaults, ...components }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
