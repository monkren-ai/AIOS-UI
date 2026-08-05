import { Taskbar } from 'nothing-ui/taskbar'
import type { ComponentDoc } from '../types'

import TaskbarDefault from '../../examples/taskbar/default'
import TaskbarMinimal from '../../examples/taskbar/minimal'
import defaultSource from '../../examples/taskbar/default.tsx?raw'
import minimalSource from '../../examples/taskbar/minimal.tsx?raw'

export const taskbarDoc: ComponentDoc = {
  slug: 'taskbar',
  name: 'Taskbar',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '桌面任务栏：开始、搜索、应用区，右侧是时钟与电量托盘。',
    en: 'A desktop taskbar — start, search, app slots, and a clock-and-battery tray on the end.',
  },
  preview: () => <Taskbar className="w-full" apps={[{ name: 'Files' }, { name: 'Mail' }]} />,
  importStatement: `import { Taskbar } from 'nothing-ui/taskbar'`,
  usageSnippet: `<Taskbar apps={[{ name: 'Files' }, { name: 'Mail' }]} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '完整任务栏', en: 'Full taskbar' },
      description: {
        zh: '左侧 Start + Search，中间应用槽，右侧托盘有时钟和电量。时钟每秒刷新；电量来自 `useTelemetry()`，低电量时填充条会变暗，充电时走 accent 色。',
        en: 'Start + Search on the left, app slots in the middle, clock and battery in the tray on the right. The clock ticks every second; battery comes from `useTelemetry()` — the fill dims when low and turns accent while charging.',
      },
      code: defaultSource,
      render: () => <TaskbarDefault />,
    },
    {
      id: 'minimal',
      title: { zh: '精简', en: 'Minimal' },
      description: {
        zh: '关掉搜索或时钟托盘，只留你需要的那几段。`fixed` 可以钉在视口底部。',
        en: 'Turn off search or the clock tray and keep only the segments you need. `fixed` pins it to the viewport bottom.',
      },
      code: minimalSource,
      render: () => <TaskbarMinimal />,
    },
  ],
  api: [
    {
      name: 'Taskbar',
      props: [
        {
          name: 'apps',
          type: '{ name: string; icon?: string; onClick?: () => void }[]',
          description: { zh: '中间应用槽列表。', en: 'App slot list in the centre.' },
        },
        {
          name: 'showSearch',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否显示搜索按钮。', en: 'Whether to show the search button.' },
        },
        {
          name: 'showTime',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否显示时钟。', en: 'Whether to show the clock.' },
        },
        {
          name: 'showBattery',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否显示电量。', en: 'Whether to show the battery.' },
        },
        {
          name: 'fixed',
          type: 'boolean',
          default: 'false',
          description: { zh: '钉在视口底部。', en: 'Pin to the viewport bottom.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Start、Search 和应用图标都是可聚焦按钮，带 `aria-label`（应用名）。时钟和电量是静态文字/进度，不参与 Tab 顺序。',
      en: 'Start, Search, and app icons are focusable buttons with `aria-label` (app name). Clock and battery are static text/progress and stay out of the tab order.',
    },
  ],
}
