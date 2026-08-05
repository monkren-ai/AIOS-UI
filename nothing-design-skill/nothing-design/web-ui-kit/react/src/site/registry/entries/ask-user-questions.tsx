import { AskUserQuestions, type AskUserQuestion } from 'nothing-ui/ask-user-questions'
import type { ComponentDoc } from '../types'

import AskUserQuestionsDefault from '../../examples/ask-user-questions/default'
import defaultSource from '../../examples/ask-user-questions/default.tsx?raw'

const previewQuestions: AskUserQuestion[] = [
  { id: 'q1', title: 'Your name', type: 'text', required: true },
]

export const askUserQuestionsDoc: ComponentDoc = {
  slug: 'ask-user-questions',
  name: 'AskUserQuestions',
  category: 'agent',
  status: 'stable',
  description: {
    zh: '分步问卷，用来向用户追问文本、单选、多选与确认。',
    en: 'A stepped question form for asking the user for text, choices, or a yes/no.',
  },
  preview: () => (
    <AskUserQuestions className="w-full max-w-md" questions={previewQuestions} defaultValue={{}} />
  ),
  importStatement: `import { AskUserQuestions } from 'nothing-ui/ask-user-questions'`,
  usageSnippet: `<AskUserQuestions questions={questions} onSubmit={handleSubmit} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '分步追问', en: 'Stepped questions' },
      description: {
        zh: '支持 `text`、`single`、`multiple`、`confirm` 四种题型，一题一屏，Next / Back 导航。必填题没填时 Next 会禁用。最后一步 Submit 触发 `onSubmit`。',
        en: 'Supports `text`, `single`, `multiple`, and `confirm` question types, one per screen with Next / Back navigation. Next is disabled until required fields are filled. Submit on the final step fires `onSubmit`.',
      },
      code: defaultSource,
      render: () => <AskUserQuestionsDefault />,
    },
  ],
  api: [
    {
      name: 'AskUserQuestions',
      props: [
        {
          name: 'questions',
          type: 'AskUserQuestion[]',
          required: true,
          description: {
            zh: '题目列表。每题需要 `id`、`title`、`type`；选项题还要 `options`。',
            en: 'Question list. Each needs `id`, `title`, and `type`; choice types also need `options`.',
          },
        },
        {
          name: 'value',
          type: 'Record<string, string | string[] | boolean>',
          description: { zh: '受控答案。', en: 'Controlled answers.' },
        },
        {
          name: 'defaultValue',
          type: 'Record<string, string | string[] | boolean>',
          default: '{}',
          description: { zh: '非受控初始答案。', en: 'Initial answers when uncontrolled.' },
        },
        {
          name: 'onChange',
          type: '(answers) => void',
          description: { zh: '答案变化回调。', en: 'Called when answers change.' },
        },
        {
          name: 'onSubmit',
          type: '(answers) => void',
          description: { zh: '最后一步提交回调。', en: 'Called on final-step submit.' },
        },
        {
          name: 'title',
          type: 'string',
          default: `'QUESTIONS'`,
          description: { zh: '面板标题。', en: 'Panel title.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体尺寸。', en: 'Overall size.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '当前题目标题用可见文字呈现，必填题带 Required 提示。Next / Back / Submit 都是标准 Button，键盘可达。',
      en: 'The current question title is visible text; required questions show a Required hint. Next / Back / Submit are standard Buttons reachable from the keyboard.',
    },
  ],
}
