import * as React from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants } from 'aios-ui-kit/button'
import { VERSION } from '@/version'
import { useT } from '../i18n'
import { CATEGORIES } from '../registry/categories'
import { COMPONENT_MANIFEST } from '../registry'
import { CodeBlock } from '../components/CodeBlock'

const ROTATING = [
  { zh: 'AI 操作系统', en: 'AI operating systems' },
  { zh: '仪表盘与监控台', en: 'dashboards and consoles' },
  { zh: '硬件配套界面', en: 'companion apps for hardware' },
  { zh: '对话式产品', en: 'conversational products' },
]

// 数字从清单算，不写死——组件是一批批加进来的，写死的那个迟早和侧边栏对不上。
const COMPONENT_COUNT = COMPONENT_MANIFEST.length

const FEATURES = [
  {
    zh: {
      title: `${COMPONENT_COUNT} 个可用组件`,
      body: '从按钮、表单到数据表、Agent 流程卡片，全部按可交付标准打磨。',
    },
    en: {
      title: `${COMPONENT_COUNT} production-ready components`,
      body: 'From buttons and forms to data tables and agent workflow cards — all built to ship.',
    },
  },
  {
    zh: {
      title: '单色工业美学',
      body: '零阴影、零 blur、零渐变。层级只靠背景与描边表达，几何保持诚实。',
    },
    en: {
      title: 'Monochrome industrial aesthetic',
      body: 'No shadows, no blur, no gradients. Elevation comes from background and border alone.',
    },
  },
  {
    zh: {
      title: '默认可访问',
      body: '键盘导航、焦点态与读屏支持内建在每个组件里，44px 最小点击区域是硬约束。',
    },
    en: {
      title: 'Accessible by default',
      body: 'Keyboard navigation, focus states, and screen-reader support are built in. The 44px minimum touch target is a hard rule.',
    },
  },
  {
    zh: {
      title: '令牌化主题',
      body: '全部颜色、圆角与排版走 CSS 变量，改一处即刻生效，不需要重新编译组件。',
    },
    en: {
      title: 'Token-driven theming',
      body: 'Every color, radius, and type step is a CSS variable. Change one and the components pick it up instantly.',
    },
  },
  {
    zh: { title: '按需导入', body: 'subpath 导出让打包器只带上你真正渲染的组件。' },
    en: {
      title: 'Loads only what you use',
      body: 'Subpath exports keep the bundle to just the components you actually render.',
    },
  },
  {
    zh: { title: 'TypeScript 优先', body: '严格类型与内联文档，编辑器认识每一个 prop。' },
    en: {
      title: 'TypeScript-first',
      body: 'Strict types and inline docs mean your editor knows every prop.',
    },
  },
  {
    zh: {
      title: 'RTL 开箱即用',
      body: '全部使用逻辑属性，阿拉伯语、希伯来语下自动镜像，不需要额外工作。',
    },
    en: {
      title: 'RTL out of the box',
      body: 'Built on logical properties, so every component mirrors correctly with no extra work.',
    },
  },
  {
    zh: {
      title: '克制的动效',
      body: '过渡都带 reduced-motion 兜底，用户要求减弱动效时会安静下来。',
    },
    en: {
      title: 'Restrained motion',
      body: 'Every transition has a reduced-motion fallback and goes quiet when the user asks it to.',
    },
  },
  {
    zh: {
      title: '面向 Agent 的文档',
      body: '文档结构同时服务人和 LLM，示例代码直接从可运行的源文件读取。',
    },
    en: {
      title: 'AI-ready documentation',
      body: 'Docs structured for humans and LLMs alike; every snippet is read from a real, runnable source file.',
    },
  },
]

function RotatingPhrase() {
  const { lang } = useT()
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const timer = setInterval(() => setIndex((current) => (current + 1) % ROTATING.length), 2600)
    return () => clearInterval(timer)
  }, [])

  const phrase = ROTATING[index]
  return <span className="text-accent">{lang === 'zh' ? phrase.zh : phrase.en}</span>
}

export function LandingPage() {
  const { t, lang } = useT()

  return (
    <div className="mx-auto flex max-w-page-widget flex-col gap-24 px-4 py-16 md:px-6 md:py-24">
      <section className="flex flex-col items-start gap-6">
        <span className="rounded-pill border border-border px-3 py-1 font-mono text-label uppercase tracking-widest text-foreground-subtle">
          v{VERSION} · React 19 · Tailwind v4
        </span>

        <h1 className="max-w-4xl text-display-md text-foreground-display md:text-display-lg">
          {t('为', 'A component library for ')}
          <RotatingPhrase />
          {t('打造的组件库', '')}
        </h1>

        <p className="max-w-2xl text-subheading text-foreground-muted">
          {t(
            `${COMPONENT_COUNT} 个基于 AIOS 设计语言的 React 组件。单色、几何、克制——把注意力留给内容本身。`,
            `${COMPONENT_COUNT} React components built on the AIOS design language. Monochrome, geometric, restrained — so the content gets the attention instead.`,
          )}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/docs/installation"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            {t('开始使用', 'Get started')}
          </Link>
          <Link to="/components" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            {t('浏览组件', 'Browse components')}
          </Link>
          <Link to="/showcase" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
            {t('整页总览', 'Full showcase')}
          </Link>
        </div>

        <div className="w-full max-w-xl pt-4">
          <CodeBlock
            code={`npm install aios-ui-kit\n\nimport { Button } from 'aios-ui-kit/button'`}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-display-sm text-foreground-display">
          {t('真实产品需要的东西', 'Everything a real product needs')}
        </h2>
        <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const copy = lang === 'zh' ? feature.zh : feature.en
            return (
              <article key={copy.title} className="flex flex-col gap-2 bg-background p-6">
                <h3 className="text-subheading text-foreground-display">{copy.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{copy.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-display-sm text-foreground-display">
          {t('探索组件库', 'Explore the component library')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const count = COMPONENT_MANIFEST.filter((doc) => doc.category === category.id).length
            return (
              <Link
                key={category.id}
                to="/components"
                className="flex flex-col gap-2 rounded-card-compact border border-border p-5 no-underline transition-colors duration-200 hover:border-border-visible motion-reduce:transition-none"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-foreground-display">
                    {lang === 'zh' ? category.label.zh : category.label.en}
                  </span>
                  {count > 0 && (
                    <span className="font-mono text-label text-foreground-subtle">{count}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {lang === 'zh' ? category.description.zh : category.description.en}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-card border border-border p-8">
        <h2 className="text-heading text-foreground-display">
          {t('还有 AI OS 与对话组件', 'Plus the AI OS and conversation matrix')}
        </h2>
        <p className="max-w-2xl text-foreground-muted">
          {t(
            'AgentOrb、PlanCard、ApprovalGate、ThoughtChain 等组件为 Agent 流程与对话式界面而生，可以在演示页里直接体验完整链路。',
            'AgentOrb, PlanCard, ApprovalGate, ThoughtChain and friends exist for agent workflows and conversational interfaces. The demo page runs the whole loop end to end.',
          )}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/ai-poc" className={buttonVariants({ variant: 'secondary', size: 'md' })}>
            {t('打开 AI 演示', 'Open the AI demo')}
          </Link>
          <Link to="/project-intro" className={buttonVariants({ variant: 'ghost', size: 'md' })}>
            {t('项目介绍', 'Project intro')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
