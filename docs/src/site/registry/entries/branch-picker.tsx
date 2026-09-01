import { BranchPickerDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const branchPickerDoc = createAiPrimitiveDoc({
  slug: "branch-picker",
  name: "BranchPicker",
  category: "chat",
  preview: () => <BranchPickerDemo />,
  description: {
    zh: "在重新生成的回答分支之间翻页，并处理首尾边界。",
    en: "Moves between regenerated answer branches with bounded navigation.",
  },
  importStatement: `import { BranchPicker } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<BranchPicker current={2} total={3} onPrevious={prev} onNext={next} />`,
  apiName: "BranchPicker",
  props: [
    {
      name: "current",
      type: "number",
      required: true,
      description: {
        zh: "当前分支，从 1 开始。",
        en: "Current one-based branch.",
      },
    },
    {
      name: "total",
      type: "number",
      required: true,
      description: { zh: "分支总数。", en: "Total branches." },
    },
    {
      name: "onPrevious / onNext",
      type: "() => void",
      description: { zh: "翻页回调。", en: "Navigation callbacks." },
    },
  ],
  accessibility: [
    {
      zh: "边界按钮自动禁用，当前页码通过 `aria-live` 播报。",
      en: "Boundary buttons disable automatically and the current index is announced with `aria-live`.",
    },
  ],
});
