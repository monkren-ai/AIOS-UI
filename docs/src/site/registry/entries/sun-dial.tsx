import { SunDial } from 'aios-ui-kit/sun-dial'
import type { ComponentDoc } from '../types'
export const sunDialDoc: ComponentDoc = {
  slug: 'sun-dial', name: 'SunDial', category: 'time-system', status: 'stable',
  description: { zh: '按地点计算日出、日落与太阳位置。', en: 'Calculates sunrise, sunset, and solar position for a location.' }, preview: () => <SunDial latitude={39.9} longitude={116.4} />,
  importStatement: `import { SunDial } from 'aios-ui-kit/sun-dial'`, usageSnippet: `<SunDial latitude={39.9} longitude={116.4} />`, composition: { zh: '3.0 移除局部 theme，使用全局语义令牌。', en: '3.0 removes the local theme prop and uses global semantic tokens.' },
  examples: [], api: [{ name: 'SunDial', props: [
    { name: 'latitude', type: 'number', description: { zh: '纬度。', en: 'Latitude.' } },
    { name: 'longitude', type: 'number', description: { zh: '经度。', en: 'Longitude.' } },
    { name: 'time', type: `'day' | 'night'`, description: { zh: '可选预览状态。', en: 'Optional preview state.' } },
  ] }], accessibility: [{ zh: '降低动效时关闭位置补间。', en: 'Position tweening is removed under reduced motion.' }],
}
