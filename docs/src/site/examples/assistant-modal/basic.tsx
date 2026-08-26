import { AssistantModal } from 'aios-ui-kit/agent'

export default function AssistantModalBasic() {
  return (
    <div className="relative h-72 w-full max-w-md">
      <AssistantModal inline title="AIOS Assistant">
        <p className="p-4 text-body-sm text-foreground-muted">Ready for the next task.</p>
      </AssistantModal>
    </div>
  )
}
