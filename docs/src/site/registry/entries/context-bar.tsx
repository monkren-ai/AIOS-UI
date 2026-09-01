import { ContextBarDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const contextBarDoc = createAiPrimitiveDoc({
  slug: "context-bar",
  name: "ContextBar",
  category: "agent",
  preview: () => <ContextBarDemo />,
  description: {
    zh: "显示输入上下文、队列和可展开任务状态。",
    en: "Displays prompt context, queues, and expandable task state.",
  },
  importStatement: `import { ContextBar, ContextBarLabel, ContextBarTasks } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ContextBar><ContextBarLabel status="loading">Indexing</ContextBarLabel></ContextBar>`,
  apiName: "ContextBar",
  props: [
    {
      name: "position",
      type: `'header' | 'footer' | 'detached'`,
      default: `'detached'`,
      description: {
        zh: "相对输入框的位置。",
        en: "Position relative to the prompt.",
      },
    },
    {
      name: "ContextBarLabel.status",
      type: "ContextBarStatus",
      default: `'default'`,
      description: { zh: "上下文条目状态。", en: "Context item status." },
    },
    {
      name: "ContextBarTasks.open",
      type: "boolean",
      description: {
        zh: "受控任务展开状态。",
        en: "Controlled task disclosure.",
      },
    },
  ],
  accessibility: [
    {
      zh: "任务组使用键盘可操作的折叠控件，状态不只依赖颜色。",
      en: "Task groups use keyboard-operable disclosure and status never relies on color alone.",
    },
  ],
});
