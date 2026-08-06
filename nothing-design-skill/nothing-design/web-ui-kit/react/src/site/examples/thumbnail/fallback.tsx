import { Thumbnail } from 'aios-ui-kit/thumbnail'

export default function ThumbnailFallback() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* 没有 src：直接显示默认点阵占位 */}
      <Thumbnail alt="Missing cover" />
      {/* src 加载失败：onError 后切到点阵占位 */}
      <Thumbnail src="/does-not-exist.png" alt="Broken cover" />
      {/* 自定义回退：传 fallback 节点替换默认点阵 */}
      <Thumbnail
        alt="Unavailable"
        fallback={
          <span className="font-mono text-xs uppercase tracking-wider text-foreground-muted">
            N/A
          </span>
        }
      />
    </div>
  )
}
