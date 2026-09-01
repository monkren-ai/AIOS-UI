import { ThreadListDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const threadListDoc = createAiPrimitiveDoc({
  slug: "thread-list",
  name: "ThreadList",
  category: "shell",
  preview: () => <ThreadListDemo />,
  description: {
    zh: "分组会话、未读状态、新建入口和不会嵌套按钮的独立操作区。",
    en: "Grouped threads, unread state, creation, and independent actions without nested buttons.",
  },
  importStatement: `import { ThreadList, ThreadListItem, ThreadListNew } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<ThreadList><ThreadListNew /><ThreadListItem title="Today" onSelect={select} /></ThreadList>`,
  apiName: "ThreadList / ThreadListItem",
  props: [
    {
      name: "title / meta",
      type: "ReactNode",
      description: {
        zh: "会话、分组、未读和操作数据。",
        en: "Thread, grouping, unread, and action data.",
      },
    },
    {
      name: "active / unread",
      type: "boolean",
      description: {
        zh: "当前与未读状态。",
        en: "Current and unread states.",
      },
    },
    {
      name: "onSelect / actions",
      type: "() => void",
      description: {
        zh: "选择回调与独立操作区。",
        en: "Selection callback and independent actions.",
      },
    },
  ],
  accessibility: [
    {
      zh: "会话选择使用原生按钮，操作区与主选择按钮保持为同级元素。",
      en: "Thread selection uses a native button; actions remain siblings of the main selection button.",
    },
  ],
});
