import { MusicPlayer } from 'nothing-ui/music-player'
import type { ComponentDoc } from '../types'

import MusicPlayerVariants from '../../examples/music-player/variants'
import variantsSource from '../../examples/music-player/variants.tsx?raw'

export const musicPlayerDoc: ComponentDoc = {
  slug: 'music-player',
  name: 'MusicPlayer',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '播放器，分完整卡片、窄条与迷你磁贴三种版型。',
    en: 'A music player in three layouts: full card, compact strip, and mini tile.',
  },
  preview: () => <MusicPlayer variant="compact" className="w-full max-w-md" />,
  importStatement: `import { MusicPlayer } from 'nothing-ui/music-player'`,
  usageSnippet: `<MusicPlayer variant="default" />`,
  examples: [
    {
      id: 'variants',
      title: { zh: '三种版型', en: 'Three layouts' },
      description: {
        zh: '`default` 是完整卡片，`compact` 是窄条，`mini` 是磁贴。三种版型共用同一套曲目数据和播放控制逻辑，只是信息密度不同。',
        en: '`default` is the full card, `compact` is a narrow strip, and `mini` is a tile. All three share the same track data and playback logic — only the information density changes.',
      },
      code: variantsSource,
      render: () => <MusicPlayerVariants />,
    },
  ],
  api: [
    {
      name: 'MusicPlayer',
      props: [
        {
          name: 'variant',
          type: `'default' | 'compact' | 'mini'`,
          default: `'full'`,
          description: { zh: '版型。', en: 'Layout variant.' },
        },
        {
          name: 'tracks',
          type: '{ title: string; artist: string; duration: number }[]',
          description: { zh: '曲目列表。不传则用内置演示曲目。', en: 'Track list. Built-in demo tracks when omitted.' },
        },
        {
          name: 'totalSegments',
          type: 'number',
          description: { zh: '进度条分段数。', en: 'Number of progress-bar segments.' },
        },
        {
          name: 'updateInterval',
          type: 'number',
          description: { zh: '播放进度刷新间隔（毫秒）。', en: 'Playback progress refresh interval in ms.' },
        },
        {
          name: 'showRecordingIndicator',
          type: 'boolean',
          description: { zh: '是否显示录音指示。', en: 'Whether to show the recording indicator.' },
        },
        {
          name: 'recording',
          type: 'boolean',
          description: { zh: '录音指示是否激活。', en: 'Whether the recording indicator is active.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          description: { zh: 'mini 版型的主题。', en: 'Theme for the mini layout.' },
        },
        {
          name: 'size',
          type: `'small' | 'medium' | 'large'`,
          description: { zh: 'mini 版型的尺寸。', en: 'Size for the mini layout.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '播放 / 暂停 / 上一条 / 下一条都是可聚焦按钮。曲目信息在可见文字里，读屏可以直接念标题和艺术家。',
      en: 'Play / pause / previous / next are focusable buttons. Track info is visible text that screen readers can read directly.',
    },
  ],
}
