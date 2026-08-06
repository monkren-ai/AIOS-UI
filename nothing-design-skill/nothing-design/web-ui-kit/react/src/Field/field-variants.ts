import { cva } from 'class-variance-authority'

/**
 * Field 容器：纵向堆叠，label / 控件 / 说明 / 错误之间 4px。
 *
 * 间距刻意紧凑（`gap-xs`），与 Input、`formGroupVariants` 保持一致，
 * 让一个字段内的几行文案「成组」而非「散开」。
 */
export const fieldVariants = cva(['flex flex-col gap-xs'])
