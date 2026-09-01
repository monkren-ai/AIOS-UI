import { Reasoning, ReasoningGroup, ReasoningSubject } from "aios-ui-kit/agent";

export default function ReasoningBasic() {
  return (
    <ReasoningGroup className="w-full max-w-xl">
      <Reasoning
        status="finished"
        label="读取组件索引 / Read component index"
        elapsed="0.4s"
      >
        已找到 Agent 与 Conversation 导出入口。 / Agent and Conversation exports
        found.
      </Reasoning>
      <Reasoning
        status="running"
        label="对比组件能力 / Compare component coverage"
        subject={<ReasoningSubject>oreo-ui</ReasoningSubject>}
        additions={2}
        deletions={0}
        defaultOpen
        container
      >
        正在核对新增组件、兼容接口和文档入口。 / Checking new components,
        compatibility, and documentation entries.
      </Reasoning>
      <Reasoning status="error" label="加载远程预览 / Load remote preview">
        远程预览不可用，已回退到本地源码。 / Remote preview unavailable; local
        source used.
      </Reasoning>
    </ReasoningGroup>
  );
}
