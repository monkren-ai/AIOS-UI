import { cva } from 'class-variance-authority'
export const responseVariants = cva(
  'text-sm leading-7 text-foreground [&_h1]:mt-6 [&_h1]:text-heading [&_h2]:mt-5 [&_h2]:text-subheading [&_h3]:mt-4 [&_h3]:font-medium [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:ps-5 [&_blockquote]:my-3 [&_blockquote]:border-s-2 [&_blockquote]:border-border-visible [&_blockquote]:ps-4 [&_blockquote]:text-foreground-muted [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:p-2 [&_td]:border [&_td]:border-border [&_td]:p-2',
)
