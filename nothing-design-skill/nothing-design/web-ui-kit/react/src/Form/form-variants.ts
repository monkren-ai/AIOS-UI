import { cva } from 'class-variance-authority'

/** 表单容器：纵向堆叠，字段之间 16px。 */
export const formVariants = cva(['flex flex-col gap-md'])

/**
 * 字段分组：label + 控件 + 说明文字一组，间距 4px。
 *
 * 旧 CSS 里的 `.nothing-form__group` / `--error`，现在以 CVA 形式导出，
 * 供调用方直接贴到自己的 `<div>` 上。
 */
export const formGroupVariants = cva(['flex flex-col gap-xs'], {
  variants: {
    hasError: {
      true: 'text-error',
      false: '',
    },
  },
  defaultVariants: { hasError: false },
})

/** 分组下方的错误文案。 */
export const formErrorVariants = cva(['mt-2xs font-body text-caption text-error'])
