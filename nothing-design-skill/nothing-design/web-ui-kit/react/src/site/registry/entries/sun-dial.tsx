import { SunDial } from 'nothing-ui/sun-dial'
import type { ComponentDoc } from '../types'

import SunDialDefault from '../../examples/sun-dial/default'
import SunDialNight from '../../examples/sun-dial/night'

import defaultSource from '../../examples/sun-dial/default.tsx?raw'
import nightSource from '../../examples/sun-dial/night.tsx?raw'

export const sunDialDoc: ComponentDoc = {
  slug: 'sun-dial',
  name: 'SunDial',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '日出日落弧线，按经纬度算出太阳位置与剩余日照时长。',
    en: 'A sunrise-to-sunset arc that places the sun by latitude and counts the daylight left.',
  },
  preview: () => <SunDial latitude={35.6762} longitude={139.6503} className="w-full max-w-sm" />,
  importStatement: `import { SunDial } from 'nothing-ui/sun-dial'`,
  usageSnippet: `<SunDial latitude={35.6762} longitude={139.6503} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '指定经纬度', en: 'With explicit coordinates' },
      description: {
        zh: '同时传 `latitude` 和 `longitude` 时组件完全跳过浏览器定位，直接用这两个值算日出日落——本例固定为东京，方便复现且不会触发权限弹窗。日出日落时刻用一个简化的太阳赤纬公式估算，不追求航海级精度，够日常展示用。',
        en: 'Passing both `latitude` and `longitude` skips browser geolocation entirely and computes sunrise/sunset straight from them — this example is pinned to Tokyo so it reproduces reliably and never triggers a permission prompt. Sunrise and sunset are estimated with a simplified solar-declination formula; it is not navigational-grade, but plenty for everyday display.',
      },
      code: defaultSource,
      render: () => <SunDialDefault />,
    },
    {
      id: 'night',
      title: { zh: '强制夜间态', en: 'Forcing the night state' },
      description: {
        zh: '`time` 可以覆盖用于展示的昼夜状态（配色、状态字样），但太阳在弧线上的具体位置仍然由「当前时间是否落在日出日落之间」算出——如果实际是白天却传了 `time="night"`，配色会变但太阳标记未必消失。真要在白天演示夜间外观，建议直接选一个此刻本来就是夜里的坐标（例如本例的伦敦，配合读者本地时间）。',
        en: '`time` can override the visual day/night state (colour, the status word), but the sun’s actual position on the arc is still computed from whether the current time falls between sunrise and sunset — forcing `time="night"` during actual daytime changes the colouring without necessarily hiding the sun marker. To genuinely preview the night look during the day, pick coordinates that are actually in night right now, as this example does with London relative to the reader’s local time.',
      },
      code: nightSource,
      render: () => <SunDialNight />,
    },
  ],
  api: [
    {
      name: 'SunDial',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'latitude',
          type: 'number',
          description: {
            zh: '纬度。与 `longitude` 必须同时提供，才会跳过浏览器定位。',
            en: 'Latitude. Must be supplied together with `longitude` to skip browser geolocation.',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          description: {
            zh: '经度。两者缺一时组件会调用 `navigator.geolocation.getCurrentPosition`，用户拒绝授权或浏览器不支持时回退到北京坐标（39.9042, 116.4074）。',
            en: 'Longitude. If either coordinate is missing, the component calls `navigator.geolocation.getCurrentPosition`, falling back to Beijing’s coordinates (39.9042, 116.4074) if the user declines or the browser lacks support.',
          },
        },
        {
          name: 'time',
          type: `'day' | 'night'`,
          description: {
            zh: '覆盖用于配色与状态字样的昼夜值。不影响太阳在弧线上的实际位置，那部分始终按真实时间与算出的日出日落计算。',
            en: 'Overrides the day/night value used for colouring and the status word. It does not affect the sun’s actual position on the arc, which is always computed from the real time and the calculated sunrise/sunset.',
          },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'dark'`,
          description: { zh: '组件自身的配色。', en: 'This widget’s own palette.' },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '60000',
          description: {
            zh: '重新读取系统时间并重算太阳位置的间隔（毫秒）。不会重新触发定位——坐标只在挂载或 `latitude`/`longitude` 变化时取一次。',
            en: 'How often, in milliseconds, the system clock is re-read and the sun position recomputed. It never re-triggers geolocation — coordinates are only fetched on mount or when `latitude`/`longitude` change.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes, merged via `tailwind-merge`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '弧线、日夜分段与太阳标记全部是 `aria-hidden="true"` 的 SVG——它们是纯装饰。日出、日落、剩余时长的具体数字都以旁边的文字节点给出，读屏用户拿到的是完整信息，只是没有那张图。',
      en: 'The arc, its day/night segments, and the sun marker are all `aria-hidden="true"` SVG — purely decorative. The actual sunrise, sunset, and remaining-daylight figures are given as adjoining text, so a screen-reader user gets the full information, just not the picture.',
    },
    {
      zh: '首次渲染、定位尚未返回时，坐标显示 `LOCATING...`，日出日落显示 `--:--`——这两处都是可读的占位文字，不会让读屏用户遇到空白或崩溃的布局。',
      en: 'Before geolocation resolves, the coordinates read `LOCATING...` and sunrise/sunset read `--:--` — both are legible placeholder text, so a screen reader never hits a blank or broken layout.',
    },
    {
      zh: '调用浏览器定位前不会做任何自定义提示——权限弹窗由浏览器原生 UI 处理。如果产品上需要提前解释「为什么要用你的位置」，请在渲染 SunDial 之前自己加一段说明。',
      en: 'No custom prompt precedes the browser’s geolocation request — the permission dialog is entirely native UI. If your product needs to explain up front why location is being requested, add that copy yourself before rendering SunDial.',
    },
  ],
}
