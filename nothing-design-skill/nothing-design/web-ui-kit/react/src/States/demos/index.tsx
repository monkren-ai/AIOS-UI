import { LoadingState, ErrorState, EmptyState } from '../States'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LoadingState label="Loading" progress={60} />
      <ErrorState headline="Failed to load" message="Please check your connection." onRetry={() => {}} />
      <EmptyState headline="No data" description="There is nothing to show." />
    </div>
  )
}
