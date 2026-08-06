import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Field as FieldPrimitive } from '@base-ui/react/field'
import { inputLabelVariants, inputHelperVariants } from '@/Input/input-variants'
import { fieldVariants } from './field-variants'

export interface FieldProps extends React.ComponentPropsWithRef<'div'> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  /** 控件的 id，用于关联 label 与错误/说明。 */
  id?: string
  children?: React.ReactNode
}

export interface FieldLabelProps
  extends React.ComponentPropsWithRef<typeof FieldPrimitive.Label> {
  hasError?: boolean
  disabled?: boolean
  required?: boolean
}

/** 字段标签，复用 Input 的 `inputLabelVariants` 排版。 */
export function FieldLabel({
  className,
  hasError = false,
  disabled = false,
  required = false,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      className={cn(inputLabelVariants({ size: 'md', hasError, disabled }), className)}
      {...props}
    >
      {children}
      {required && <span aria-hidden="true" className="ms-1 text-accent">*</span>}
    </FieldPrimitive.Label>
  )
}
FieldLabel.displayName = 'Field.Label'

export type FieldDescriptionProps = React.ComponentPropsWithRef<
  typeof FieldPrimitive.Description
>

/** 字段说明，复用 Input 的 `inputHelperVariants` 默认态。 */
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <FieldPrimitive.Description
      className={cn(inputHelperVariants({ variant: 'default' }), className)}
      {...props}
    />
  )
}
FieldDescription.displayName = 'Field.Description'

export type FieldErrorProps = React.ComponentPropsWithRef<typeof FieldPrimitive.Error>

/**
 * 校验错误，由 Base UI 的 Field 校验链驱动渲染。
 *
 * 注意：它读 Field 的 validity 数据而非 children——静态 `error` 字符串请用
 * `Field` 的 `error` prop（内部渲染一个 `role="alert"` 的 div），这里留给
 * 走 `validate` / `invalid` 的场景。
 */
export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldPrimitive.Error
      className={cn(inputHelperVariants({ variant: 'error' }), className)}
      {...props}
    />
  )
}
FieldError.displayName = 'Field.Error'

/**
 * 表单字段壳。
 *
 * 用 Base UI 的 Field.Root 包裹 label + 控件 + 说明 + 错误，统一排版。
 * 当 children 是单个元素时，自动给它注入 `id` 与 `aria-describedby`，
 * 让 label、说明、错误三者自动关联到位。
 */
export function Field({
  label,
  description,
  error,
  required = false,
  disabled = false,
  id: idProp,
  className,
  children,
  ref,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const fieldId = idProp ?? generatedId
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`
  const hasError = Boolean(error)

  const describedBy =
    [hasError ? errorId : null, description && !hasError ? descriptionId : null]
      .filter(Boolean)
      .join(' ') || undefined

  const control = React.useMemo(() => {
    const childArray = React.Children.toArray(children)
    if (childArray.length === 1) {
      const only = childArray[0]
      if (React.isValidElement(only)) {
        const typed = only as React.ReactElement<Record<string, unknown>>
        return React.cloneElement(typed, {
          id: (typed.props.id as string | undefined) ?? fieldId,
          'aria-describedby': (typed.props['aria-describedby'] as string | undefined) ?? describedBy,
        })
      }
    }
    return children
  }, [children, fieldId, describedBy])

  return (
    <FieldPrimitive.Root
      ref={ref}
      disabled={disabled}
      invalid={hasError || undefined}
      className={cn(fieldVariants(), className)}
      data-slot="field"
      data-disabled={dataAttr(disabled)}
      data-invalid={dataAttr(hasError)}
      data-required={dataAttr(required)}
      data-state={hasError ? 'error' : disabled ? 'disabled' : 'default'}
      {...props}
    >
      {label && (
        <FieldLabel htmlFor={fieldId} hasError={hasError} disabled={disabled} required={required}>
          {label}
        </FieldLabel>
      )}
      {control}
      {description && !hasError && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {hasError && (
        <div
          id={errorId}
          role="alert"
          className={inputHelperVariants({ variant: 'error' })}
          data-slot="field-error"
        >
          {error}
        </div>
      )}
    </FieldPrimitive.Root>
  )
}

Field.displayName = 'Field'
Field.Label = FieldLabel
Field.Description = FieldDescription
Field.Error = FieldError

export { fieldVariants }
export default Field
