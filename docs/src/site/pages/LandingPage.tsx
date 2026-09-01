import * as React from 'react'
import { Link } from 'react-router-dom'
import { PlanCard, ToolCallRow } from 'aios-ui-kit/agent'
import { buttonVariants } from 'aios-ui-kit/button'
import landingHero from '@/assets/images/landing-hero.jpg'
import { VERSION } from '@/version'
import { useT } from '../i18n'
import { CATEGORIES } from '../registry/categories'
import { COMPONENT_MANIFEST } from '../registry'
import { CodeBlock } from '../components/CodeBlock'

const COMPONENT_COUNT = COMPONENT_MANIFEST.length

const FEATURES = [
  {
    number: '01',
    zh: {
      title: '为 Agent 流程而生',
      body: '计划、工具调用、授权与对话状态拥有明确结构，不再用通用卡片勉强拼装。',
    },
    en: {
      title: 'Built for agent workflows',
      body: 'Plans, tool calls, approvals, and conversational states have explicit structure instead of generic cards.',
    },
  },
  {
    number: '02',
    zh: {
      title: '可访问性是默认值',
      body: '键盘导航、清晰焦点、语义状态与 44px 触控区域都进入组件的基础约束。',
    },
    en: {
      title: 'Accessibility by default',
      body: 'Keyboard navigation, visible focus, semantic states, and 44px targets are component-level constraints.',
    },
  },
  {
    number: '03',
    zh: {
      title: '由令牌统一控制',
      body: '字体、色彩、间距、圆角和动效来自同一套 CSS 变量，并完整覆盖明暗主题。',
    },
    en: {
      title: 'Controlled by tokens',
      body: 'Type, color, spacing, radius, and motion share one CSS-variable system across light and dark themes.',
    },
  },
  {
    number: '04',
    zh: {
      title: '只加载真正使用的部分',
      body: '稳定的 subpath 导出让产品按组件引入，避免为了一个控件带上整套组件库。',
    },
    en: {
      title: 'Import only what ships',
      body: 'Stable subpath exports let products load components individually instead of pulling in the whole kit.',
    },
  },
]

export function LandingPage() {
  const { t, lang } = useT()
  const landingPageRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const landingPage = landingPageRef.current
    if (!landingPage) return

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return

      const section =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('.landing-page__section')
          : null
      const canScrollSection =
        section &&
        section.scrollHeight > section.clientHeight + 1 &&
        (event.deltaY > 0
          ? section.scrollTop + section.clientHeight < section.scrollHeight - 1
          : section.scrollTop > 1)

      if (canScrollSection) return

      event.preventDefault()
      landingPage.scrollLeft += event.deltaY
    }

    landingPage.addEventListener('wheel', handleWheel, { passive: false })
    return () => landingPage.removeEventListener('wheel', handleWheel)
  }, [])

  const planSteps = [
    {
      id: 'scope',
      description: t('确认改动范围', 'Confirm change scope'),
      status: 'done' as const,
    },
    {
      id: 'tokens',
      description: t('匹配设计令牌', 'Match design tokens'),
      status: 'done' as const,
    },
    {
      id: 'apply',
      description: t('应用并验证界面', 'Apply and verify the interface'),
      tool: 'edit_file',
      status: 'running' as const,
    },
  ]

  const stats = [
    {
      value: String(COMPONENT_COUNT),
      zh: '个已登记组件',
      en: 'registered components',
    },
    {
      value: String(CATEGORIES.length),
      zh: '个组件分类',
      en: 'component categories',
    },
    {
      value: '2',
      zh: '套完整主题',
      en: 'complete themes',
    },
  ]

  return (
    <main
      ref={landingPageRef}
      className="landing-page flex shrink-0 bg-cover bg-center bg-no-repeat"
    >
      <section
        className="landing-page__section landing-page__hero mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-page-wide flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-28"
        style={{ '--landing-hero-image': `url("${landingHero}")` } as React.CSSProperties}
      >
        <span className="rounded-pill border border-border px-3 py-1 font-mono text-label uppercase tracking-widest text-foreground-subtle">
          AIOS UI · v{VERSION}
        </span>
        <h1 className="mt-7 max-w-5xl text-balance text-display-md text-foreground-display md:text-display-lg">
          {t(
            '把 AI 界面从“能运行”推进到“值得交付”',
            'Take AI interfaces from working software to work worth shipping',
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-subheading text-foreground-muted">
          {t(
            `${COMPONENT_COUNT} 个面向 AI OS、Agent 工作流与复杂产品界面的 React 组件。单色、精确、可解释。`,
            `${COMPONENT_COUNT} React components for AI operating systems, agent workflows, and complex product interfaces. Monochrome, precise, and explainable.`,
          )}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/docs/installation"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            {t('阅读安装文档', 'Read installation guide')}
          </Link>
          <Link
            to="/components"
            className={buttonVariants({ variant: 'secondary', size: 'lg' })}
          >
            {t('浏览全部组件', 'Browse all components')}
          </Link>
        </div>
        <div className="mt-10 w-full max-w-xl text-start">
          <CodeBlock
            code={`npm install aios-ui-kit motion\n\nimport { PlanCard } from 'aios-ui-kit/agent'`}
          />
        </div>
      </section>

      <section
        aria-label={t('组件库数据', 'Library statistics')}
        className="landing-page__section landing-page__stats flex border-y border-border"
      >
        <div className="landing-page__stats-list mx-auto flex px-4 md:px-6">
          {stats.map((stat) => (
            <div key={stat.en} className="flex flex-col items-center gap-2 px-6 py-9 text-center">
              <strong className="font-mono text-display-sm font-medium text-foreground-display">
                {stat.value}
              </strong>
              <span className="text-sm text-foreground-muted">
                {lang === 'zh' ? stat.zh : stat.en}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-page__section landing-page__components mx-auto flex max-w-page-wide flex-col gap-10 px-4 py-24 md:px-6 md:py-32">
        <header className="flex max-w-3xl flex-col gap-4">
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            {t('真实组件 / 真实状态', 'Real components / real states')}
          </span>
          <h2 className="text-balance text-display-sm text-foreground-display md:text-display-md">
            {t(
              '为人和 Agent 的协作过程提供清晰结构',
              'Clear structure for collaboration between people and agents',
            )}
          </h2>
          <p className="max-w-2xl text-pretty text-foreground-muted">
            {t(
              '下面不是产品截图，而是文档站正在运行的 AIOS UI 组件。输入框、状态和折叠细节都可以直接交互。',
              'These are not product screenshots. They are live AIOS UI components running inside the documentation site.',
            )}
          </p>
        </header>

        <div className="landing-page__preview-grid grid gap-4">
          <article className="landing-page__workflow-card flex min-w-0 flex-col gap-5 rounded-card border border-border bg-surface p-5 sm:p-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <h3 className="text-heading text-foreground-display">
                {t('Agent 工作流', 'Agent workflow')}
              </h3>
              <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
                01 / Plan
              </span>
            </div>
            <PlanCard
              title={t('界面改进计划', 'INTERFACE IMPROVEMENT')}
              steps={planSteps}
              compact
            />
            <ToolCallRow
              tool="edit_file"
              activeLabel={t('正在应用设计令牌', 'Applying design tokens')}
              status="running"
              elapsedMs={840}
            />
          </article>

        </div>
      </section>

      <section className="landing-page__section border-y border-border bg-surface">
        <div className="mx-auto max-w-page-wide px-4 py-24 md:px-6 md:py-32">
          <header className="mb-10 max-w-3xl">
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('交付标准', 'Shipping standards')}
            </span>
            <h2 className="mt-4 text-balance text-display-sm text-foreground-display">
              {t(
                '少一些装饰，多一些可依赖的行为',
                'Less decoration. More behaviour you can rely on.',
              )}
            </h2>
          </header>
          <div className="grid border-t border-border md:grid-cols-2">
            {FEATURES.map((feature) => {
              const copy = lang === 'zh' ? feature.zh : feature.en
              return (
                <article
                  key={feature.number}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7 md:odd:pe-8 md:even:border-s md:even:ps-8"
                >
                  <span className="font-mono text-label text-foreground-subtle">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="text-subheading text-foreground-display">{copy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{copy.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="landing-page__section mx-auto flex max-w-page-wide flex-col gap-10 px-4 py-24 md:px-6 md:py-32">
        <header className="flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('组件分类', 'Component categories')}
            </span>
            <h2 className="mt-4 text-display-sm text-foreground-display">
              {t('按产品问题开始浏览', 'Browse by product problem')}
            </h2>
          </div>
          <Link to="/components" className={buttonVariants({ variant: 'ghost', size: 'md' })}>
            {t('查看完整目录', 'Open full index')}
          </Link>
        </header>
        <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const count = COMPONENT_MANIFEST.filter((doc) => doc.category === category.id).length
            return (
              <Link
                key={category.id}
                to="/components"
                className="group min-w-0 border-b border-border p-5 no-underline transition-colors duration-200 hover:bg-surface motion-reduce:transition-none sm:odd:border-e lg:border-e lg:last:border-e-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-foreground-display transition-colors group-hover:text-accent motion-reduce:transition-none">
                    {lang === 'zh' ? category.label.zh : category.label.en}
                  </h3>
                  <span className="font-mono text-label text-foreground-subtle">{count}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {lang === 'zh' ? category.description.zh : category.description.en}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="landing-page__section landing-page__ecosystem border-t border-border">
        <div className="landing-page__ecosystem-list mx-auto flex px-4 md:px-6">
          <a
            href="https://github.com/monkren-ai/AIOS-UI/tree/main/aios-design-skill/aios-design"
            target="_blank"
            rel="noreferrer"
            className="group p-7 no-underline md:first:ps-0"
          >
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              01 / Skill
            </span>
            <h2 className="mt-4 text-heading text-foreground-display group-hover:text-accent">
              AIOS Design Skill
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {t(
                '把设计规则带进 AI 编码工作流。',
                'Bring the design rules into AI coding workflows.',
              )}
            </p>
          </a>
          <Link to="/components" className="group p-0 no-underline">
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              02 / React
            </span>
            <h2 className="mt-4 text-heading text-foreground-display group-hover:text-accent">
              aios-ui-kit
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {t(
                '将规范落实为可复用、可测试的组件。',
                'Turn the rules into reusable, tested components.',
              )}
            </p>
          </Link>
          <Link to="/docs" className="group p-0 no-underline">
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              03 / Docs
            </span>
            <h2 className="mt-4 text-heading text-foreground-display group-hover:text-accent">
              Documentation
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {t(
                '从安装、主题到可访问性逐步验证实现。',
                'Verify implementation from installation through accessibility.',
              )}
            </p>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default LandingPage
