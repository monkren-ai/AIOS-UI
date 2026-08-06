import { Pagination } from 'aios-ui-kit/pagination'

const noop = () => {}

export default function PaginationBoundaries() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 第一页：上一页按钮禁用 */}
      <Pagination page={1} totalPages={5} onPageChange={noop} />
      {/* 最后一页：下一页按钮禁用 */}
      <Pagination page={5} totalPages={5} onPageChange={noop} />
      {/* totalPages 为 1 时整个组件返回 null，下面这行是它留下的全部痕迹 */}
      <Pagination page={1} totalPages={1} onPageChange={noop} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        totalPages=1 renders nothing
      </p>
    </div>
  )
}
