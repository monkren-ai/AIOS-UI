import { Skeleton } from 'aios-ui-kit/skeleton'

export default function SkeletonVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-6">
      <div className="flex w-full flex-col gap-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
      <Skeleton variant="rect" className="w-full" />
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" />
        <Skeleton variant="circle" width={64} height={64} />
      </div>
    </div>
  )
}
