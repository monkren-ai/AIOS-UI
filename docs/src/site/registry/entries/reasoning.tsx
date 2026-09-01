import { Reasoning } from "aios-ui-kit/agent";
import type { ComponentDoc } from "../types";
import Basic from "../../examples/reasoning/basic";
import source from "../../examples/reasoning/basic.tsx?raw";

export const reasoningDoc: ComponentDoc = {
  slug: "reasoning",
  name: "Reasoning",
  category: "agent",
  status: "new",
  description: {
    zh: "用紧凑活动行呈现推理状态、对象、变更计数和可展开详情，并可按时间渐进揭示多个步骤。",
    en: "Compact activity rows for reasoning status, subject, change counts, expandable details, and timed step reveal.",
  },
  preview: () => (
    <Reasoning status="running" label="正在推理 / Reasoning" container />
  ),
  importStatement: `import { Reasoning, ReasoningGroup, ReasoningSubject } from 'aios-ui-kit/agent'`,
  usageSnippet: `<Reasoning status="running" label="正在分析 / Analyzing">{details}</Reasoning>`,
  composition: {
    zh: "用 `ReasoningGroup` 排列或渐进揭示活动，用 `ReasoningSubject` 标记文件、服务等推理对象。",
    en: "Use `ReasoningGroup` to arrange or progressively reveal activities and `ReasoningSubject` for files or services.",
  },
  examples: [
    {
      id: "basic",
      title: { zh: "状态与详情", en: "Status and details" },
      code: source,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: "Reasoning",
      props: [
        {
          name: "status",
          type: "'running' | 'finished' | 'error'",
          default: "'finished'",
          description: { zh: "活动状态。", en: "Activity status." },
        },
        {
          name: "open / defaultOpen",
          type: "boolean",
          description: {
            zh: "受控或非受控详情展开状态。",
            en: "Controlled or uncontrolled detail disclosure.",
          },
        },
        {
          name: "collapseOnComplete",
          type: "boolean",
          default: "false",
          description: {
            zh: "运行结束时折叠详情。",
            en: "Collapse details when running completes.",
          },
        },
        {
          name: "subject / additions / deletions / elapsed",
          type: "ReactNode | number",
          description: { zh: "活动元数据。", en: "Activity metadata." },
        },
      ],
    },
    {
      name: "ReasoningGroup",
      props: [
        {
          name: "stream",
          type: "boolean",
          default: "false",
          description: {
            zh: "按间隔渐进揭示子项。",
            en: "Reveal children progressively by interval.",
          },
        },
        {
          name: "revealed",
          type: "number",
          description: {
            zh: "受控的已显示数量。",
            en: "Controlled revealed count.",
          },
        },
        {
          name: "startDelay / stepInterval",
          type: "number",
          default: "320 / 850",
          description: {
            zh: "首项延迟与步骤间隔（毫秒）。",
            en: "Initial delay and step interval in milliseconds.",
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "详情触发器支持键盘操作，运行态使用 `role=status` 播报。",
      en: "The disclosure trigger is keyboard operable and running state is announced with `role=status`.",
    },
    {
      zh: "渐进揭示使用礼貌级 live region，reduced motion 下禁用进入动画。",
      en: "Progressive reveal uses a polite live region and disables entrance motion under reduced motion.",
    },
  ],
};
