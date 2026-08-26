import {
  ActivityLabel,
  AssistantPanel,
  ContextBar,
  ContextBarLabel,
  ContextBarTasks,
  Subagent,
  SubagentList,
  Terminal,
  TerminalLine,
} from 'aios-ui-kit/agent'

export default function AgentAIPrimitives() {
  return (
    <div className="grid min-w-0 w-full max-w-full gap-6 lg:grid-cols-2">
      <section className="min-w-0 flex flex-col gap-3">
        <h3 className="font-mono text-label uppercase text-foreground-subtle">
          Activity & context
        </h3>
        <div className="flex flex-wrap gap-4">
          <ActivityLabel active />
          <ActivityLabel active={false} />
        </div>
        <ContextBar>
          <ContextBarLabel status="loading" trailing="2 files">
            正在分析组件清单 / Reading component inventory
          </ContextBarLabel>
          <ContextBarTasks summary="任务 2 / 3" defaultOpen>
            <span>✓ 对比 API / Compare APIs</span>
            <span>● 补齐预览 / Add previews</span>
            <span className="text-foreground-muted">○ 验证构建 / Verify build</span>
          </ContextBarTasks>
        </ContextBar>
      </section>

      <section className="min-w-0 flex flex-col gap-3">
        <h3 className="font-mono text-label uppercase text-foreground-subtle">Subagents</h3>
        <SubagentList>
          <Subagent name="Research" status="done" progress={100} meta="12 sources" />
          <Subagent name="Implementation" status="running" progress={68} meta="8 / 12" />
          <Subagent name="Visual QA" status="error" progress={35} error="预览端口不可用" />
        </SubagentList>
      </section>

      <section className="min-w-0 lg:col-span-2">
        <h3 className="mb-3 font-mono text-label uppercase text-foreground-subtle">Terminal</h3>
        <Terminal command="npm test -- --run" exitCode={0}>
          <TerminalLine>✓ 109 test files passed</TerminalLine>
          <TerminalLine>✓ 1043 tests passed</TerminalLine>
        </Terminal>
      </section>

      <section className="relative min-w-0 min-h-[25rem] lg:col-span-2">
        <h3 className="mb-3 font-mono text-label uppercase text-foreground-subtle">
          Assistant panel
        </h3>
        <AssistantPanel
          inline
          defaultOpen
          autoFocus={false}
          panelClassName="inset-inline-start-0 w-full max-w-md"
        >
          <div className="flex flex-col gap-3 p-4 text-sm">
            <ActivityLabel active activeLabel="正在整理组件 / Organizing components" />
            <p className="text-foreground-muted">
              面板支持受控与非受控打开、Escape 关闭、焦点恢复，以及页面内嵌模式。
            </p>
          </div>
        </AssistantPanel>
      </section>
    </div>
  )
}
