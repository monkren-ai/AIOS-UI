import {
  AicssAgentInput,
  AicssCodeBlock,
  AicssStreamingText,
  AicssTaskList,
  AicssTextResponse,
} from 'aios-ui-kit/agent'

const tasks = [
  { id: '1', label: 'Scaffold the project structure', status: 'done' as const },
  { id: '2', label: 'Build the component registry', status: 'in-progress' as const },
  { id: '3', label: 'Wire up checkout', status: 'pending' as const },
]

export default function AicssOutputs() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AicssTextResponse>
        <p>
          Use <code>AicssTaskList</code> to keep the agent’s plan visible while it works.
        </p>
      </AicssTextResponse>
      <AicssStreamingText text="正在把计划展开成可执行步骤。" streaming />
      <AicssCodeBlock language="ts" code={'export const ready = true\n'} />
      <AicssTaskList tasks={tasks} />
      <AicssAgentInput model="gpt-4.1" defaultValue="继续实现剩余步骤" />
    </div>
  )
}
