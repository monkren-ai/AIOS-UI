import { PreviewCard } from 'aios-ui-kit/preview-card'
import type { ComponentDoc } from '../types'

import PreviewCardBasic from '../../examples/preview-card/basic'
import PreviewCardWithFooter from '../../examples/preview-card/with-footer'

import basicSource from '../../examples/preview-card/basic.tsx?raw'
import withFooterSource from '../../examples/preview-card/with-footer.tsx?raw'

const cover =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
      <rect width="160" height="90" fill="#1f1f1f"/>
      <circle cx="80" cy="36" r="18" fill="#8f8f8f"/>
      <path d="M20 90c4-22 16-30 40-30s36 8 40 30z" fill="#8f8f8f"/>
    </svg>`,
  )

export const previewCardDoc: ComponentDoc = {
  slug: 'preview-card',
  name: 'PreviewCard',
  category: 'data-display',
  status: 'stable',
  baseUi: 'PreviewCard',
  description: {
    zh: '媒体预览卡，顶部缩略图 + 标题与元数据。',
    en: 'A preview card with a thumbnail on top and a title and metadata below.',
  },
  preview: () => (
    <PreviewCard
      image={cover}
      imageAlt="Engine OS cover"
      meta="Release 2.0"
      title="Engine OS"
      description="A lightweight runtime for ambient devices."
      className="w-64"
    />
  ),
  importStatement: `import { PreviewCard } from 'aios-ui-kit/preview-card'`,
  usageSnippet: `<PreviewCard image={item.cover} imageAlt={item.title} title={item.title} meta={item.version} />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '变体与尺寸', en: 'Variants and sizes' },
      description: {
        zh: '`variant` 决定底色与密度：`default` 是 surface 底，`raised` 抬到 surface-raised，`compact` 把媒体压到 80px 并收紧正文内边距，适合列表行里紧凑铺排。`size` 控制 sm / md / lg 三档内边距。',
        en: '`variant` sets the plate and density: `default` on surface, `raised` lifted onto surface-raised, `compact` drops the media to 80px and tightens the body for dense list rows. `size` picks sm / md / lg padding.',
      },
      code: basicSource,
      render: () => <PreviewCardBasic />,
    },
    {
      id: 'with-footer',
      title: { zh: '带页脚', en: 'With a footer' },
      description: {
        zh: '`footer` 渲染在一条顶部分隔线之下，常放操作按钮。页脚内边距跟着 `size` 走，所以它和正文永远对齐。',
        en: '`footer` renders under a top divider and usually holds actions. Its padding tracks `size`, so it always lines up with the body.',
      },
      code: withFooterSource,
      render: () => <PreviewCardWithFooter />,
    },
  ],
  api: [
    {
      name: 'PreviewCard',
      description: {
        zh: '默认渲染为 `<div>`，透传所有原生 div 属性。',
        en: 'Renders a `<div>` by default and forwards every native div prop.',
      },
      props: [
        {
          name: 'title',
          type: 'string',
          description: { zh: '标题。', en: 'The title.' },
        },
        {
          name: 'description',
          type: 'string',
          description: {
            zh: '描述文字，渲染为 muted 小字。',
            en: 'A description, rendered as muted small text.',
          },
        },
        {
          name: 'meta',
          type: 'string',
          description: {
            zh: '副元数据，渲染为 mono caption。',
            en: 'Secondary metadata, rendered as a mono caption.',
          },
        },
        {
          name: 'image',
          type: 'string',
          description: {
            zh: '顶部图片地址。不传则不渲染媒体区。',
            en: 'URL of the top image. Omit to skip the media zone entirely.',
          },
        },
        {
          name: 'imageAlt',
          type: 'string',
          description: { zh: '图片替代文本。', en: 'Alt text for the image.' },
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: {
            zh: '页脚内容，常放操作按钮。',
            en: 'Footer content, typically action buttons.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'raised' | 'compact'`,
          default: `'default'`,
          description: {
            zh: '底色与密度。`compact` 压低媒体高度并收紧正文。',
            en: 'Plate and density. `compact` shrinks the media and tightens the body.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '正文与页脚的内边距档位。', en: 'Padding scale for the body and footer.' },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在最外层。宽度就靠它给。',
            en: 'Extra classes on the outer element. Width comes from here.',
          },
        },
      ],
    },
    {
      name: 'previewCardVariants',
      description: {
        zh: '生成卡片容器类名的 CVA 函数。媒体、正文、页脚各有自己的 CVA。',
        en: 'The CVA function for the card container. The media, body, and footer each have their own CVA.',
      },
      props: [
        {
          name: 'variant',
          type: `'default' | 'raised' | 'compact'`,
          default: `'default'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '卡片本身是分组容器，没有 role。当它整体可点击时，请在外层包一个真正的 `<a>` 或 `<button>`，或给卡片 `role="button"` + `tabIndex` + 键盘处理，不要只挂 `onClick`。',
      en: 'The card is a grouping container with no role. When the whole thing is clickable, wrap it in a real `<a>` or `<button>`, or give the card `role="button"`, `tabIndex`, and keyboard handling — do not just bolt on an `onClick`.',
    },
    {
      zh: '媒体区复用 `Thumbnail`，所以图片是一张真正的 `<img>`，`alt` 落在它上面；加载失败回退到的点阵占位本身 `aria-hidden`。',
      en: 'The media zone reuses `Thumbnail`, so the image is a real `<img>` with `alt` on it; the dot-matrix fallback it degrades to is itself `aria-hidden`.',
    },
    {
      zh: '`title` 是普通文本，不是 heading。若卡片是页面里一个独立区块，请把 `title` 放进真正的 `<h3>` 之类再传进来——组件不替你管大纲。',
      en: '`title` is plain text, not a heading. If the card is a standalone section, wrap the title in a real `<h3>` before passing it in — the component does not manage your outline.',
    },
  ],
}
