import { WalkieTalkie } from 'nothing-ui/walkie-talkie'
import type { ComponentDoc } from '../types'

import WalkieTalkieDefault from '../../examples/walkie-talkie/default'
import defaultSource from '../../examples/walkie-talkie/default.tsx?raw'

export const walkieTalkieDoc: ComponentDoc = {
  slug: 'walkie-talkie',
  name: 'WalkieTalkie',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '按住 PTT 对讲，可切频道、看音量格，真的请求麦克风权限。',
    en: 'Push-to-talk radio — switch channels, read volume segments, and it actually asks for the microphone.',
  },
  preview: () => <WalkieTalkie className="w-full max-w-xs" />,
  importStatement: `import { WalkieTalkie } from 'nothing-ui/walkie-talkie'`,
  usageSnippet: `<WalkieTalkie channel={7} volumeLevel={4} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '对讲与频道', en: 'PTT and channel' },
      description: {
        zh: '按住 PTT 进入 TRANSMITTING 态并尝试启动 `MediaRecorder`；松开后切到 SENT 再回 READY。频道 +/- 在 min/max 之间循环。麦克风权限被拒绝时会静默降级为纯 UI 演示。',
        en: 'Hold PTT to enter TRANSMITTING and try to start `MediaRecorder`; release to flash SENT then return to READY. Channel +/- wraps between min and max. If microphone permission is denied, it degrades silently to a UI-only demo.',
      },
      code: defaultSource,
      render: () => <WalkieTalkieDefault />,
    },
  ],
  api: [
    {
      name: 'WalkieTalkie',
      props: [
        {
          name: 'channel',
          type: 'number',
          default: '1',
          description: { zh: '初始频道。', en: 'Initial channel.' },
        },
        {
          name: 'minChannel',
          type: 'number',
          default: '1',
          description: { zh: '最小频道号。', en: 'Minimum channel number.' },
        },
        {
          name: 'maxChannel',
          type: 'number',
          default: '22',
          description: { zh: '最大频道号。', en: 'Maximum channel number.' },
        },
        {
          name: 'volumeSegments',
          type: 'number',
          default: '5',
          description: { zh: '音量格总数。', en: 'Total volume segments.' },
        },
        {
          name: 'volumeLevel',
          type: 'number',
          default: '3',
          description: { zh: '当前音量格（亮起的格数）。', en: 'Current volume level (lit segments).' },
        },
        {
          name: 'status',
          type: `'ready' | 'transmitting' | 'sent'`,
          description: { zh: '受控状态。不传则内部根据 PTT 推导。', en: 'Controlled status. Derived from PTT when omitted.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'PTT 是 `<button>`，按住 / 松开通过 pointer 和 keyboard 事件驱动。频道切换按钮带可见 +/- 标签。状态文字（READY / TRANSMITTING / SENT）在可见区域，读屏可以念出。',
      en: 'PTT is a `<button>` driven by pointer and keyboard hold/release. Channel buttons have visible +/- labels. Status text (READY / TRANSMITTING / SENT) is visible and readable by assistive tech.',
    },
    {
      zh: '组件会请求麦克风权限——在需要合规提示的场景，请在 UI 外层加说明，不要 surprise 用户。',
      en: 'The widget requests microphone permission — in contexts that require disclosure, explain that outside the component rather than surprising the user.',
    },
  ],
}
