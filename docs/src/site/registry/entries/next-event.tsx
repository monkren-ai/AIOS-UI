import { NextEvent } from 'aios-ui-kit/next-event'
import type { ComponentDoc } from '../types'
export const nextEventDoc: ComponentDoc = {
  slug: 'next-event', name: 'NextEvent', category: 'time-system', status: 'stable',
  description: { zh: '显示最近日程与倒计时。', en: 'Shows the nearest event and countdown.' }, preview: () => <NextEvent />,
  importStatement: `import { NextEvent } from 'aios-ui-kit/next-event'`, usageSnippet: `<NextEvent event={{ title: 'Review', date }} />`, composition: { zh: '3.0 移除局部 theme，使用全局语义令牌。', en: '3.0 removes the local theme prop and uses global semantic tokens.' },
  examples: [], api: [{ name: 'NextEvent', props: [
    { name: 'event', type: 'EventData', description: { zh: '单个日程。', en: 'A single event.' } },
    { name: 'events', type: 'EventData[]', description: { zh: '自动选择最近未过期项。', en: 'Chooses the nearest upcoming item.' } },
  ] }], accessibility: [{ zh: '倒计时使用表格数字，避免更新时布局跳动。', en: 'Countdown uses tabular numerals to avoid layout shift.' }],
}
