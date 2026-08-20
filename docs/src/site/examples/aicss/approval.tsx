import { AicssApprovalCard } from 'aios-ui-kit/agent'

const questions = [
  {
    id: 'auth',
    prompt: 'Which auth approach should we use?',
    options: ['Session cookies', 'JWT bearer', 'OAuth only'],
  },
  {
    id: 'secrets',
    prompt: 'Where should secrets live?',
    options: ['.env.local', 'Vault / secrets manager', 'CI only'],
  },
]

const plan = [
  { id: 'p1', title: 'Add migration for sessions table', detail: 'Keep a rollback script' },
  { id: 'p2', title: 'Wire auth middleware', detail: 'Protect /account and /api/checkout' },
  { id: 'p3', title: 'Update login flow + tests', detail: 'Magic-link path and happy-path e2e' },
  { id: 'p4', title: 'Write rollout notes', detail: 'Changelog + support snippet' },
]

export default function AicssApproval() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AicssApprovalCard questions={questions} />
      <AicssApprovalCard variant="command" cwd="~/aios-ui" command="pnpm test && pnpm build" />
      <AicssApprovalCard
        variant="plan"
        planTitle="Session auth migration"
        planSummary="Ship cookie-based sessions with middleware and tests."
        plan={plan}
        planPreviewCount={2}
      />
    </div>
  )
}
