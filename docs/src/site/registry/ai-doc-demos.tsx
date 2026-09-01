import * as React from "react";
import {
  Attachment,
  AttachmentList,
  BranchPicker,
  KeywordTag,
  Message,
  MessageActions,
  MessageContent,
  MessageCopyAction,
  Response,
  Source,
  Sources,
  ThreadList,
  ThreadListItem,
  ThreadListItemAction,
  ThreadListNew,
  ThreadListSection,
} from "aios-ui-kit/conversation";
import {
  ActivityLabel,
  AgentOrb,
  ApprovalGate,
  AssistantPanel,
  Confirmation,
  ContextBar,
  ContextBarLabel,
  ContextBarTasks,
  Plan,
  PlanCard,
  PlanItem,
  ProgressTrace,
  PromptBox,
  PromptBoxModelSelect,
  Subagent,
  SubagentList,
  Terminal,
  TerminalLine,
  ThinkingIndicator,
  ThinkingSteps,
  ToolCallRow,
  WebSearch,
} from "aios-ui-kit/agent";

export function AgentOrbDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {(["idle", "thinking", "acting", "paused", "error"] as const).map(
        (state) => (
          <AgentOrb key={state} state={state} showLabel />
        ),
      )}
    </div>
  );
}

export function ActivityLabelDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      <ActivityLabel active activeLabel="正在执行 / Working" />
      <ActivityLabel label="执行完成 / Done" />
      <ActivityLabel status="error" label="执行失败 / Failed" />
    </div>
  );
}

export function AssistantPanelDemo() {
  return (
    <div className="relative h-72 w-full max-w-xl border border-border-visible p-4">
      <p className="text-body-sm text-foreground-muted">
        页面内容 / Page content
      </p>
      <AssistantPanel defaultOpen inline title="任务助手 / Task assistant">
        <div className="p-4 text-body-sm">
          面板支持 Escape、焦点恢复和受控状态。 / Escape, focus return, and
          controlled state are supported.
        </div>
      </AssistantPanel>
    </div>
  );
}

export function ApprovalGateDemo() {
  const [state, setState] = React.useState<"pending" | "approved" | "denied">(
    "pending",
  );
  return (
    <ApprovalGate
      className="w-full max-w-xl"
      action="发布组件文档 / Publish component docs"
      impact="将更新本地构建产物。 / Local build artifacts will change."
      risk="high"
      state={state}
      onAllow={() => setState("approved")}
      onDeny={() => setState("denied")}
    />
  );
}

export function PlanCardDemo() {
  return (
    <PlanCard
      className="w-full max-w-xl"
      title="AGENT DOCUMENTATION"
      steps={[
        {
          id: "scan",
          description: "扫描公共导出 / Scan exports",
          status: "done",
        },
        {
          id: "docs",
          description: "生成独立页面 / Generate pages",
          tool: "write_file",
          status: "running",
        },
        {
          id: "verify",
          description: "验证构建 / Verify build",
          status: "pending",
        },
      ]}
    />
  );
}

export function ProgressTraceDemo() {
  return (
    <ProgressTrace
      className="w-full max-w-xl"
      title="DOCUMENTATION TRACE"
      steps={[
        {
          id: "read",
          label: "读取清单 / Read inventory",
          status: "done",
          timestamp: "00:01",
        },
        {
          id: "render",
          label: "生成页面 / Render pages",
          status: "active",
          timestamp: "00:04",
        },
        { id: "test", label: "运行测试 / Run tests", status: "pending" },
      ]}
    />
  );
}

export function ThinkingIndicatorDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      <ThinkingIndicator state="thinking" label="思考中 / Thinking" />
      <ThinkingIndicator state="acting" label="执行中 / Acting" />
      <ThinkingIndicator state="done" label="已完成 / Done" />
      <ThinkingIndicator state="error" label="失败 / Error" />
    </div>
  );
}

export function ThinkingStepsDemo() {
  return (
    <ThinkingSteps
      className="w-full max-w-xl"
      activeIndex={1}
      steps={[
        {
          id: "intent",
          title: "理解目标 / Understand goal",
          content: "核对 Agent 公共导出。",
        },
        {
          id: "map",
          title: "映射组件 / Map components",
          content: "查找缺少的独立入口。",
        },
        { id: "verify", title: "验证结果 / Verify result" },
      ]}
    />
  );
}

export function MessageDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Message role="assistant" variant="surface">
        <MessageContent>
          组件清单已经更新。 / The component inventory is updated.
        </MessageContent>
        <MessageActions>
          <MessageCopyAction text="The component inventory is updated." />
        </MessageActions>
      </Message>
      <Message role="user" variant="surface">
        <MessageContent>继续检查 Shell。 / Continue with Shell.</MessageContent>
      </Message>
    </div>
  );
}

export function ResponseDemo() {
  return (
    <Response className="w-full max-w-xl">
      {
        '## 执行结果 / Result\n\n- 支持 **GFM**\n- 安全外链\n- `inline code`\n\n```ts\nconst status = "done"\n```'
      }
    </Response>
  );
}

export function AttachmentDemo() {
  const [visible, setVisible] = React.useState(true);
  return (
    <AttachmentList>
      {visible && (
        <Attachment
          label="agent-plan.md"
          type="document"
          onRemove={() => setVisible(false)}
        />
      )}
      <Attachment label="preview.png" type="image" loading progress={68} />
    </AttachmentList>
  );
}

export function BranchPickerDemo() {
  const [current, setCurrent] = React.useState(2);
  return (
    <BranchPicker
      current={current}
      total={3}
      onPrevious={() => setCurrent((value) => Math.max(1, value - 1))}
      onNext={() => setCurrent((value) => Math.min(3, value + 1))}
    />
  );
}

export function PromptBoxDemo() {
  const [running, setRunning] = React.useState(false);
  const [attachmentVisible, setAttachmentVisible] = React.useState(true);
  const [modelIndex, setModelIndex] = React.useState(0);
  const [voiceStatus, setVoiceStatus] = React.useState<"idle" | "inputting">(
    "idle",
  );
  const models = ["AIOS Agent", "AIOS Fast"];

  return (
    <div className="w-full max-w-xl">
      <PromptBox
        running={running}
        contextBefore={
          <ContextBar>
            <ContextBarLabel status={running ? "loading" : "done"}>
              {running
                ? "正在生成回答 / Generating response"
                : "上下文已就绪 / Context ready"}
            </ContextBarLabel>
          </ContextBar>
        }
        attachments={
          attachmentVisible ? (
            <AttachmentList>
              <Attachment
                label="COMPONENTS.md"
                type="document"
                onRemove={() => setAttachmentVisible(false)}
              />
            </AttachmentList>
          ) : undefined
        }
        tags={<KeywordTag kind="context">Agent UI</KeywordTag>}
        modelSelect={
          <PromptBoxModelSelect
            label={models[modelIndex]}
            onClick={() =>
              setModelIndex((value) => (value + 1) % models.length)
            }
          />
        }
        voice="wave"
        voiceStatus={voiceStatus}
        onVoiceToggle={() =>
          setVoiceStatus((status) =>
            status === "inputting" ? "idle" : "inputting",
          )
        }
        onAttach={() => setAttachmentVisible(true)}
        onMention={() => undefined}
        onSubmit={() => setRunning(true)}
        onStop={() => setRunning(false)}
      />
    </div>
  );
}

export function KeywordTagDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <KeywordTag kind="model">AIOS Agent</KeywordTag>
      <KeywordTag kind="service">Search</KeywordTag>
      <KeywordTag kind="file">manifest.ts</KeywordTag>
      <KeywordTag kind="context" onRemove={() => undefined}>
        3 tasks
      </KeywordTag>
    </div>
  );
}

export function ContextBarDemo() {
  return (
    <ContextBar className="w-full max-w-xl">
      <ContextBarLabel status="loading" trailing="2 / 4">
        正在核对导出 / Checking exports
      </ContextBarLabel>
      <ContextBarTasks summary="2 个任务 / 2 tasks" defaultOpen>
        <ContextBarLabel status="done">
          读取组件清单 / Read inventory
        </ContextBarLabel>
        <ContextBarLabel status="queue">
          验证文档页面 / Verify documentation
        </ContextBarLabel>
      </ContextBarTasks>
    </ContextBar>
  );
}

export function ToolCallDemo() {
  return (
    <ToolCallRow
      className="w-full max-w-xl"
      tool="read_file"
      status="done"
      elapsedMs={420}
      badge="manifest.ts"
      args={{ path: "docs/src/site/registry/manifest.ts" }}
      result="102 component entries"
      defaultExpanded
    />
  );
}

export function PlanDemo() {
  return (
    <Plan
      className="w-full max-w-xl"
      title="文档覆盖计划 / Documentation coverage plan"
    >
      <PlanItem status="done">补齐 Chat 页面 / Complete Chat pages</PlanItem>
      <PlanItem status="active">
        补齐 Agent 页面 / Complete Agent pages
      </PlanItem>
      <PlanItem status="pending">验证 Shell / Verify Shell</PlanItem>
    </Plan>
  );
}

export function SourcesDemo() {
  return (
    <Sources className="w-full max-w-xl" defaultOpen>
      <Source
        href="https://example.com/design"
        domain="example.com"
        title="Agent interface design notes"
      />
      <Source
        href="https://example.com/accessibility"
        domain="example.com"
        title="Accessible live regions"
      />
    </Sources>
  );
}

export function ConfirmationDemo() {
  return (
    <Confirmation
      className="w-full max-w-xl"
      title="允许 Agent 执行文档构建？ / Allow the agent to build documentation?"
      description="将生成本地构建产物。 / Local build artifacts will be generated."
      onApprove={() => undefined}
      onDeny={() => undefined}
      details={<code>npm run build:docs</code>}
    />
  );
}

export function WebSearchDemo() {
  return (
    <WebSearch
      className="w-full max-w-xl"
      query="AI agent interface patterns"
      status="complete"
      results={[
        {
          title: "Agent interface patterns",
          url: "https://example.com/patterns",
          description: "A compact result description.",
        },
        {
          title: "Accessible streaming UI",
          url: "https://example.com/streaming",
        },
      ]}
    />
  );
}

export function TerminalDemo() {
  return (
    <Terminal className="w-full max-w-xl" command="npm run test" exitCode={0}>
      <TerminalLine>Test Files 114 passed</TerminalLine>
      <TerminalLine>Tests 1014 passed</TerminalLine>
    </Terminal>
  );
}

export function SubagentsDemo() {
  return (
    <SubagentList className="w-full max-w-xl">
      <Subagent
        name="Chat coverage"
        status="done"
        progress={100}
        meta="7 pages"
      />
      <Subagent
        name="Agent coverage"
        status="running"
        progress={72}
        meta="9 / 12"
      />
      <Subagent
        name="Shell verification"
        status="error"
        progress={40}
        error="Missing route / 缺少路由"
      />
    </SubagentList>
  );
}

export function ThreadListDemo() {
  const [active, setActive] = React.useState("coverage");
  return (
    <ThreadList className="w-full max-w-sm" aria-label="会话 / Threads">
      <ThreadListNew onClick={() => undefined} />
      <ThreadListSection>今天 / Today</ThreadListSection>
      <ThreadListItem
        title="组件覆盖检查"
        meta="刚刚 / now"
        unread
        active={active === "coverage"}
        onSelect={() => setActive("coverage")}
        actions={
          <ThreadListItemAction aria-label="归档 / Archive">
            ×
          </ThreadListItemAction>
        }
      />
      <ThreadListItem
        title="导出验证"
        meta="12m"
        active={active === "exports"}
        onSelect={() => setActive("exports")}
      />
      <ThreadListSection>昨天 / Yesterday</ThreadListSection>
      <ThreadListItem
        title="历史迁移记录"
        meta="1d"
        active={active === "archive"}
        onSelect={() => setActive("archive")}
      />
    </ThreadList>
  );
}
