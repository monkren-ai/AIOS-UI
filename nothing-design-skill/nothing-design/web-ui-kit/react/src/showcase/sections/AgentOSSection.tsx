import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import { SegmentedControl } from '@/SegmentedControl'
import { Button } from '@/Button'
import {
  AgentOrb,
  type AgentState,
  PlanCard,
  type PlanStep,
  ProgressTrace,
  type TraceStep,
  ToolCallRow,
  type ToolCallRowProps,
  ApprovalGate,
} from '@/agent'
import type { T } from '../hooks/useShowcaseState'

interface AgentOSSectionProps {
  t: T
  agentOrbState: AgentState
  setAgentOrbState: (state: AgentState) => void
  agentPlanSteps: PlanStep[]
  setAgentPlanSteps: (steps: PlanStep[]) => void
  agentTraceSteps: TraceStep[]
  agentToolCalls: Omit<ToolCallRowProps, 'ref'>[]
  approvalOpen: boolean
  setApprovalOpen: (open: boolean) => void
}

const orbStates: AgentState[] = ['idle', 'thinking', 'acting', 'paused', 'error']

export function AgentOSSection({
  t,
  agentOrbState,
  setAgentOrbState,
  agentPlanSteps,
  setAgentPlanSteps,
  agentTraceSteps,
  agentToolCalls,
  approvalOpen,
  setApprovalOpen,
}: AgentOSSectionProps) {
  const handleStepToggle = (stepId: string, approved: boolean) => {
    setAgentPlanSteps(
      agentPlanSteps.map((step) =>
        step.id === stepId ? { ...step, status: approved ? 'approved' : 'pending' } : step,
      ),
    )
  }

  const handleApproveAll = () => {
    setAgentPlanSteps(agentPlanSteps.map((step) => ({ ...step, status: 'approved' })))
  }

  const handleReset = () => {
    setAgentPlanSteps(agentPlanSteps.map((step) => ({ ...step, status: 'pending' })))
  }

  return (
    <CategorySection id="agent-os" title={t('AI OS Agent', 'AI OS Agent')}>
      <DemoCard title={t('Agent 状态 orb', 'Agent Orb')} variant="flex-wrap">
        {orbStates.map((state) => (
          <AgentOrb key={state} state={state} size="md" showLabel />
        ))}
        <AgentOrb state={agentOrbState} size="lg" showLabel />
      </DemoCard>

      <DemoCard title={t('状态切换', 'State Control')}>
        <SegmentedControl
          segments={orbStates.map((s) => s.toUpperCase())}
          activeIndex={orbStates.indexOf(agentOrbState)}
          onChange={(index) => setAgentOrbState(orbStates[index])}
        />
      </DemoCard>

      <DemoCard title={t('执行计划', 'Agent Plan')}>
        <PlanCard
          title={t('AGENT PLAN', 'AGENT PLAN')}
          steps={agentPlanSteps}
          editable
          onStepToggle={handleStepToggle}
          onApprove={() => setAgentOrbState('acting')}
          onEdit={() => setAgentOrbState('thinking')}
          onApproveAll={handleApproveAll}
          onReset={handleReset}
          approveAllLabel={t('全部批准', 'APPROVE ALL')}
          resetLabel={t('重置', 'RESET')}
          approveDisabledHint={t('需先批准所有步骤', 'Approve all steps first')}
        />
      </DemoCard>

      <DemoCard title={t('紧凑计划', 'Compact Plan')}>
        <PlanCard
          title={t('AGENT PLAN', 'AGENT PLAN')}
          steps={agentPlanSteps}
          editable
          compact
          onStepToggle={handleStepToggle}
          onApprove={() => setAgentOrbState('acting')}
          onEdit={() => setAgentOrbState('thinking')}
          onApproveAll={handleApproveAll}
          onReset={handleReset}
          approveAllLabel={t('全部批准', 'APPROVE ALL')}
          resetLabel={t('重置', 'RESET')}
          approveDisabledHint={t('需先批准所有步骤', 'Approve all steps first')}
        />
      </DemoCard>

      <DemoCard title={t('工具调用', 'Tool Calls')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {agentToolCalls.map((call, index) => (
            <ToolCallRow key={index} {...call} />
          ))}
        </div>
      </DemoCard>

      <DemoCard title={t('进度追踪', 'Progress Trace')}>
        <ProgressTrace steps={agentTraceSteps} title={t('TRACE', 'TRACE')} />
      </DemoCard>

      <DemoCard title={t('审批门', 'Approval Gate')} last>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {!approvalOpen && (
            <Button variant="primary" onClick={() => setApprovalOpen(true)}>
              {t('触发高风险操作', 'Trigger High-Risk Action')}
            </Button>
          )}
          {approvalOpen && (
            <ApprovalGate
              action={t(
                '允许 Agent 向 6 位联系人发送邮件？',
                'Allow agent to send email to 6 contacts?',
              )}
              impact={t(
                '此操作将使用你的默认邮箱账户发送邮件，发送后可在“已发送”中查看。',
                'This will use your default email account. Sent emails can be reviewed in Sent.',
              )}
              risk="high"
              reversible
              onAllow={() => setApprovalOpen(false)}
              onDeny={() => setApprovalOpen(false)}
            />
          )}
          <ApprovalGate
            action={t('允许 Agent 读取当前文档？', 'Allow agent to read the current document?')}
            impact={t('只读访问，不会修改文件内容。', 'Read-only access. File will not be modified.')}
            risk="low"
            reversible
            allowLabel={t('ALLOW', 'ALLOW')}
            denyLabel={t('DENY', 'DENY')}
          />
        </div>
      </DemoCard>
    </CategorySection>
  )
}

export default AgentOSSection
