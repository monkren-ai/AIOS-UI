import * as React from 'react'
import { cn } from '@/lib/utils'
import { attachmentVariants } from './attachment-variants'

export type AttachmentType =
  | 'image'
  | 'video'
  | 'document'
  | 'text'
  | 'code'
  | 'json'
  | 'audio'
  | 'link'
  | 'pdf'
  | 'unknown'
export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string
  type?: AttachmentType
  src?: string
  size?: 'sm' | 'md'
  loading?: boolean
  progress?: number
  onRemove?: () => void
  removeLabel?: string
}

export function Attachment({
  label,
  type,
  src,
  size = 'md',
  loading = false,
  progress,
  onRemove,
  removeLabel,
  className,
  ref,
  ...props
}: AttachmentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const kind = type ?? (src ? 'image' : 'unknown')
  const media = (kind === 'image' || kind === 'video') && Boolean(src)
  const accessibleRemoveLabel =
    removeLabel ?? (label ? `移除 ${label} / Remove ${label}` : '移除附件 / Remove attachment')
  return (
    <div
      ref={ref}
      className={cn(attachmentVariants({ size, media, loading }), className)}
      data-slot="attachment"
      data-type={kind}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {media && kind === 'video' ? (
        <video
          src={src}
          aria-label={label}
          muted
          preload="metadata"
          className="size-10 rounded-xs object-cover"
        />
      ) : media ? (
        <img src={src} alt={label ?? ''} className="size-10 rounded-xs object-cover" />
      ) : (
        <span
          aria-hidden
          className="grid size-8 place-items-center rounded-xs border border-border font-mono text-micro uppercase"
        >
          {kind.slice(0, 3)}
        </span>
      )}
      {label && <span className="max-w-48 truncate">{label}</span>}
      {loading && (
        <span role="status" className="font-mono text-caption">
          上传中 / Uploading
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={accessibleRemoveLabel}
          className="grid size-11 place-items-center text-foreground-muted hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive"
        >
          ×
        </button>
      )}
      {progress !== undefined && (
        <span
          role="progressbar"
          aria-label={label ? `${label} 上传进度 / upload progress` : '上传进度 / Upload progress'}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.max(0, Math.min(100, progress))}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground transition-transform"
          style={{ transform: `scaleX(${Math.max(0, Math.min(100, progress)) / 100})` }}
        />
      )}
    </div>
  )
}

export function AttachmentList({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-2', className)}
      data-slot="attachment-list"
      {...props}
    />
  )
}
