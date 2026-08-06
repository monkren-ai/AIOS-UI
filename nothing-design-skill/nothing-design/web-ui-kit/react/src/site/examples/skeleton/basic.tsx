import { Skeleton } from 'aios-ui-kit/skeleton'

export default function SkeletonBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  )
}
