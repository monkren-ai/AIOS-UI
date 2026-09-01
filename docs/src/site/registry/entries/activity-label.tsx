import { ActivityLabelDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const activityLabelDoc = createAiPrimitiveDoc({
  slug: "activity-label",
  name: "ActivityLabel",
  category: "agent",
  preview: () => <ActivityLabelDemo />,
  description: {
    zh: "在运行中与完成文案之间切换的紧凑活动标签。",
    en: "A compact activity label that switches between working and completed copy.",
  },
  importStatement: `import { ActivityLabel } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ActivityLabel active activeLabel="正在处理 / Working" />`,
  apiName: "ActivityLabel",
  props: [
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: { zh: "是否正在运行。", en: "Whether work is active." },
    },
    {
      name: "activeLabel / label",
      type: "ReactNode",
      description: {
        zh: "运行和完成文案。",
        en: "Working and completed labels.",
      },
    },
    {
      name: "status",
      type: `'default' | 'error'`,
      default: `'default'`,
      description: { zh: "状态语气。", en: "Status tone." },
    },
  ],
  accessibility: [
    {
      zh: "状态变化通过 polite live region 播报，动画尊重 reduced motion。",
      en: "Changes are announced through a polite live region and animation respects reduced motion.",
    },
  ],
});
