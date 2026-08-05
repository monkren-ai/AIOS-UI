import { AgentOrb, PlanCard, ThinkingIndicator } from 'nothing-ui/agent'

const steps = [
  { id: '1', description: 'Read project files', status: 'done' as const },
  { id: '2', description: 'Draft refactor plan', status: 'pending' as const },
  { id: '3', description: 'Apply changes', tool: 'edit_file', status: 'pending' as const },
]

export default function AgentWorkflow() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex items-center gap-3">
        <AgentOrb state="thinking" size="sm" showLabel />
        <ThinkingIndicator state="thinking" />
      </div>
      <PlanCard title="Refactor plan" steps={steps} editable onApprove={() => {}} />
    </div>
  )
}
