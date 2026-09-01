import { AgeMotion } from 'aios-ui-kit/age-motion'
import type { ComponentDoc } from '../types'
export const ageMotionDoc: ComponentDoc = {
  slug: 'age-motion', name: 'AgeMotion', category: 'time-system', status: 'stable',
  description: { zh: '按秒更新年龄与人生进度的语义主题读数。', en: 'A semantic-theme age and life-progress readout updated each second.' },
  preview: () => <AgeMotion birthDate="1990-06-15" className="w-full max-w-xl" />,
  importStatement: `import { AgeMotion } from 'aios-ui-kit/age-motion'`, usageSnippet: `<AgeMotion birthDate="1990-06-15" />`, composition: { zh: '3.0 移除局部 theme，颜色由 ThemeProvider 统一控制。', en: '3.0 removes the local theme prop; ThemeProvider owns color.' },
  examples: [], api: [{ name: 'AgeMotion', props: [
    { name: 'birthDate', type: 'string', description: { zh: 'ISO 出生日期。', en: 'ISO birth date.' } },
    { name: 'lifespan', type: 'number', default: '80', description: { zh: '人生进度终点年龄。', en: 'End age for life progress.' } },
  ] }], accessibility: [{ zh: '日期输入使用原生 date 控件。', en: 'The date input uses the native date control.' }],
}
