import { TerminalDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const terminalDoc = createAiPrimitiveDoc({
  slug: "terminal",
  name: "Terminal",
  category: "agent",
  preview: () => <TerminalDemo />,
  description: {
    zh: "显示命令、流式输出、运行状态以及成功或失败退出码。",
    en: "Displays commands, streaming output, running state, and success or failure exit codes.",
  },
  importStatement: `import { Terminal, TerminalLine } from 'aios-ui-kit/agent'`,
  usageSnippet: `<Terminal command="npm test" running><TerminalLine>Running…</TerminalLine></Terminal>`,
  apiName: "Terminal",
  props: [
    {
      name: "command",
      type: "string",
      required: true,
      description: { zh: "执行命令。", en: "Executed command." },
    },
    {
      name: "running",
      type: "boolean",
      default: "false",
      description: { zh: "流式运行状态。", en: "Streaming running state." },
    },
    {
      name: "exitCode",
      type: "number",
      default: "0",
      description: {
        zh: "完成后的退出码。",
        en: "Exit code after completion.",
      },
    },
  ],
  accessibility: [
    {
      zh: "运行态使用 `aria-busy`，状态与退出码通过 live status 播报。",
      en: "Running uses `aria-busy`; status and exit code are announced by a live status.",
    },
  ],
});
