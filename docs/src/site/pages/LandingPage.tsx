import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ActivityLabel,
  ApprovalGate,
  PlanCard,
  ProgressTrace,
  ThinkingIndicator,
  ToolCallRow,
} from 'aios-ui-kit/agent'
import { buttonVariants } from 'aios-ui-kit/button'
import { KeywordTag, Sender } from 'aios-ui-kit/conversation'
import { VERSION } from '@/version'
import { useT } from '../i18n'
import { CATEGORIES } from '../registry/categories'
import { COMPONENT_MANIFEST } from '../registry'
import { CodeBlock } from '../components/CodeBlock'

const COMPONENT_COUNT = COMPONENT_MANIFEST.length

interface PreviewCardProps {
  name: string
  group: string
  href: string
  children: ReactNode
}

function PreviewCard({ name, group, href, children }: PreviewCardProps) {
  return (
    <article className="landing-preview-card">
      <div className="landing-preview-card__stage">{children}</div>
      <div className="landing-preview-card__meta">
        <Link to={href} className="font-medium text-foreground-display no-underline hover:text-accent">
          {name}
        </Link>
        <span className="rounded-pill bg-muted px-2 py-1 font-mono text-caption uppercase text-foreground-muted">
          {group}
        </span>
      </div>
    </article>
  )
}

export function LandingPage() {
  const { t, lang } = useT()

  const stats = [
    {
      value: String(COMPONENT_COUNT),
      zh: '已登记组件',
      en: 'registered components',
    },
    {
      value: String(CATEGORIES.length),
      zh: '组件分类',
      en: 'component categories',
    },
    {
      value: '2',
      zh: '完整主题',
      en: 'complete themes',
    },
  ]

  const planSteps = [
    { id: 'scope', description: t('理解意图', 'Understand intent'), status: 'done' as const },
    { id: 'build', description: t('组合界面', 'Compose interface'), status: 'running' as const },
    { id: 'verify', description: t('验证状态', 'Verify states'), status: 'pending' as const },
  ]

  const traceSteps = [
    { id: 'read', label: t('读取上下文', 'Read context'), status: 'done' as const },
    { id: 'edit', label: t('更新组件', 'Update components'), status: 'active' as const },
    { id: 'test', label: t('运行验证', 'Run verification'), status: 'pending' as const },
  ]

  return (
    <main className="landing-page">
      <section
        aria-labelledby="landing-title"
        className="landing-page__hero flex min-h-[36rem] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center md:min-h-[40rem] md:px-6"
      >
        <span className="relative z-10 rounded-pill border border-border bg-background/80 px-3 py-1 font-mono text-label uppercase tracking-widest text-foreground-subtle">
          AIOS UI · v{VERSION}
        </span>

        <h1
          id="landing-title"
          className="relative z-10 mt-8 max-w-4xl text-balance text-display-md font-medium text-foreground-display md:text-display-lg"
        >
          {t('为 AI Agent 构建界面', 'Build interfaces for AI agents')}
          <span className="mt-1 block text-accent">
            {t('更快，也更清晰', 'Faster, with clarity')}
          </span>
        </h1>

        <p className="relative z-10 mt-6 max-w-2xl text-pretty text-subheading text-foreground-muted">
          {t(
            '面向 AI OS、Agent 工作流与复杂产品界面的 React 组件库。每个状态都可见、可解释、可交付。',
            'A React component library for AI operating systems and agent workflows. Every state is visible, explainable, and ready to ship.',
          )}
        </p>

        <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/components" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            {t('浏览组件', 'Browse components')}
          </Link>
          <Link
            to="/docs/installation"
            className={buttonVariants({ variant: 'secondary', size: 'lg' })}
          >
            {t('安装指南', 'Installation guide')}
          </Link>
        </div>

        <div className="relative z-10 mt-8 w-full max-w-xl text-start">
          <CodeBlock code="npm install aios-ui-kit motion" />
        </div>
      </section>

      <section aria-label={t('组件库数据', 'Library statistics')} className="border-y border-border">
        <dl className="mx-auto grid max-w-page-wide grid-cols-1 px-4 sm:grid-cols-3 md:px-6">
          {stats.map((stat) => (
            <div
              key={stat.en}
              className="flex items-baseline justify-between gap-4 border-b border-border py-7 last:border-b-0 sm:flex-col sm:items-center sm:justify-center sm:border-b-0 sm:px-6 sm:text-center sm:not-last:border-e"
            >
              <dd className="font-mono text-display-sm font-medium text-foreground-display">
                {stat.value}
              </dd>
              <dt className="text-sm text-foreground-muted">
                {lang === 'zh' ? stat.zh : stat.en}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="featured-components" className="px-4 py-24 md:px-6 md:py-32">
        <header className="mx-auto mb-12 flex max-w-page-wide items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('精选组件', 'Featured components')}
            </span>
            <h2 id="featured-components" className="mt-4 text-balance text-display-sm text-foreground-display">
              {t('为 Agent 的每一步提供真实状态', 'Real states for every step an agent takes')}
            </h2>
          </div>
          <Link
            to="/components"
            className="hidden font-mono text-label uppercase tracking-widest text-foreground-muted underline-offset-4 hover:text-foreground-display hover:underline sm:block"
          >
            {t('查看全部', 'View all')}
          </Link>
        </header>

        <div className="landing-preview-shell mx-auto max-w-page-wide">
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            <PreviewCard name="PlanCard" group="Agent" href="/components/agent">
              <PlanCard title={t('执行计划', 'EXECUTION PLAN')} steps={planSteps} compact />
            </PreviewCard>

            <PreviewCard name="ToolCallRow" group="Agent" href="/components/agent">
              <div className="flex w-full flex-col gap-3">
                <ToolCallRow
                  tool="read_file"
                  activeLabel={t('正在读取上下文', 'Reading context')}
                  status="running"
                  elapsedMs={640}
                />
                <ToolCallRow tool="type_check" status="done" elapsedMs={1180} />
              </div>
            </PreviewCard>

            <PreviewCard name="Sender" group="Conversation" href="/components/conversation">
              <Sender
                size="sm"
                defaultValue={t('把这个页面调整为 AIOS 风格', 'Restyle this page with AIOS')}
                tags={<KeywordTag>{t('当前页面', 'Current page')}</KeywordTag>}
                footer={({ components: { SendButton } }) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="font-mono text-caption text-foreground-subtle">ENTER TO SEND</span>
                    <SendButton>{t('发送', 'Send')}</SendButton>
                  </div>
                )}
              />
            </PreviewCard>

            <PreviewCard name="ApprovalGate" group="Agent" href="/components/agent">
              <ApprovalGate
                action={t('应用 4 个文件改动', 'Apply changes to 4 files')}
                impact={t('仅修改当前界面，可随时撤销。', 'Only the current interface changes. Fully reversible.')}
                risk="low"
                state="approved"
              />
            </PreviewCard>

            <PreviewCard name="ProgressTrace" group="Agent" href="/components/agent">
              <ProgressTrace title={t('执行轨迹', 'EXECUTION TRACE')} steps={traceSteps} />
            </PreviewCard>

            <PreviewCard name="Activity states" group="System" href="/components/agent">
              <div className="flex w-full max-w-xs flex-col gap-5">
                <ThinkingIndicator state="thinking" label={t('正在推理', 'Thinking')} />
                <ThinkingIndicator state="acting" label={t('正在执行', 'Acting')} />
                <ThinkingIndicator state="done" label={t('已完成', 'Done')} />
                <ActivityLabel
                  active
                  activeLabel={t('正在同步组件状态', 'Syncing component state')}
                />
              </div>
            </PreviewCard>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-foreground-display text-background">
        <div className="mx-auto flex max-w-page-wide flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-end md:px-6 md:py-20">
          <div className="max-w-3xl">
            <span className="font-mono text-label uppercase tracking-widest opacity-60">
              {t('开始构建', 'Start building')}
            </span>
            <h2 className="mt-4 text-balance text-display-sm">
              {t('从一个真实组件开始。', 'Start with a real component.')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/components" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
              {t('打开组件目录', 'Open component index')}
            </Link>
            <Link
              to="/docs/installation"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              {t('阅读文档', 'Read documentation')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
