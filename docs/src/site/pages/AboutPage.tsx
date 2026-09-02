import { Link } from 'react-router-dom'
import {
  ActivityLabel,
  PlanCard,
  ProgressTrace,
  ToolCallRow,
  type PlanStep,
  type TraceStep,
} from 'aios-ui-kit/agent'
import { Badge } from 'aios-ui-kit/badge'
import { buttonVariants } from 'aios-ui-kit/button'
import { Surfaces } from 'aios-ui-kit/surfaces'
import { TabPanel, Tabs } from 'aios-ui-kit/tabs'
import { useT } from '../i18n'

export function AboutPage() {
  const { t } = useT()

  const planSteps: PlanStep[] = [
    {
      id: 'intent',
      description: t('理解设计意图与约束', 'Understand design intent and constraints'),
      status: 'done',
    },
    {
      id: 'compose',
      description: t('用系统组件组合界面', 'Compose the interface with system components'),
      status: 'running',
    },
    {
      id: 'verify',
      description: t('验证行为、状态与交付', 'Verify behaviour, states, and delivery'),
      status: 'pending',
    },
  ]

  const traceSteps: TraceStep[] = [
    { id: 'principles', label: t('设计原则', 'Design principles'), status: 'done' },
    { id: 'components', label: t('组件实现', 'Component implementation'), status: 'done' },
    { id: 'documentation', label: t('文档验证', 'Documentation verification'), status: 'active' },
  ]

  return (
    <main className="overflow-hidden">
      <section className="border-t border-border">
        <div className="mx-auto grid min-h-[42rem] max-w-page-wide items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.82fr)] lg:gap-16">
          <header className="max-w-3xl">
            <Badge variant="outline" size="lg" dot>
              {t('项目介绍', 'Project overview')}
            </Badge>
            <h1 className="mt-7 text-balance text-display-md font-medium text-foreground-display md:text-display-lg">
              {t(
                '把难以描述的设计判断，变成可以执行的共同语言',
                'Turn hard-to-describe design judgement into an executable shared language',
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-subheading text-foreground-muted">
              {t(
                'AIOS UI 把设计原则、React 实现与文档验证放在同一个闭环里，让 Agent 不只生成界面，也能清楚说明它正在做什么。',
                'AIOS UI puts design principles, React implementation, and documentation verification in one loop—so an agent can build an interface and clearly explain what it is doing.',
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/components"
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
              >
                {t('浏览组件目录', 'Browse component index')}
              </Link>
              <Link
                to="/docs/design-principles"
                className={buttonVariants({ variant: 'secondary', size: 'lg' })}
              >
                {t('阅读设计原则', 'Read design principles')}
              </Link>
            </div>
          </header>

          <Surfaces
            elevation={2}
            padding="sm"
            border="visible"
            radius="lg"
            className="min-w-0"
            aria-label={t('AIOS 工作流示例', 'AIOS workflow example')}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-3 py-2">
              <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
                {t('实时工作流', 'Live workflow')}
              </span>
              <ActivityLabel
                active
                activeLabel={t('正在组合页面', 'Composing page')}
                label={t('等待任务', 'Awaiting task')}
              />
            </div>
            <div className="grid gap-2 p-2">
              <PlanCard title={t('页面更新计划', 'PAGE UPDATE PLAN')} steps={planSteps} compact />
              <ToolCallRow
                tool="component_registry"
                activeLabel={t('正在匹配自身组件', 'Matching native components')}
                status="running"
                elapsedMs={820}
                args={{ scope: 'about-page', source: 'aios-ui-kit' }}
                result={t('组件已就绪', 'Components ready')}
                expandLabel={t('显示调用详情', 'Show call details')}
                collapseLabel={t('隐藏调用详情', 'Hide call details')}
              />
            </div>
          </Surfaces>
        </div>
      </section>

      <section aria-labelledby="system-loop-title" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-page-wide px-4 py-20 md:px-6 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.62fr)_minmax(0,1fr)] lg:gap-20">
            <header className="max-w-xl">
              <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
                {t('同一个系统', 'One system')}
              </span>
              <h2 id="system-loop-title" className="mt-4 text-balance text-display-sm text-foreground-display">
                {t('三个部分，形成一个可验证的闭环', 'Three parts form one verifiable loop')}
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-muted">
                {t(
                  '从判断到实现，再回到可观察的结果。选择任一层，查看它在系统中承担的工作。',
                  'From judgement to implementation, then back to observable results. Select a layer to see the work it carries in the system.',
                )}
              </p>
            </header>

            <Tabs
              items={[
                { value: 'skill', label: '01 / Skill' },
                { value: 'kit', label: '02 / Kit' },
                { value: 'docs', label: '03 / Docs' },
              ]}
              defaultValue="skill"
              variant="default"
              className="min-w-0 [&_[data-slot=tabs-list]]:overflow-x-auto"
              aria-label={t('项目组成', 'Project layers')}
            >
              <TabPanel value="skill">
                <Surfaces elevation={1} padding="lg" border="visible" radius="md">
                  <div className="grid gap-8 md:grid-cols-[minmax(0,0.78fr)_minmax(20rem,1fr)] md:items-center">
                    <div>
                      <Badge variant="soft" size="md">Design Skill</Badge>
                      <h3 className="mt-5 text-heading text-foreground-display">
                        {t('先把判断说清楚，再开始构建', 'Make the judgement explicit before building')}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {t(
                          'Skill 记录视觉原则、约束和执行顺序，让设计意图可以被读取、复用和审查。',
                          'The Skill records visual principles, constraints, and execution order so design intent can be read, reused, and reviewed.',
                        )}
                      </p>
                    </div>
                    <PlanCard title={t('设计决策', 'DESIGN DECISIONS')} steps={planSteps} compact />
                  </div>
                </Surfaces>
              </TabPanel>

              <TabPanel value="kit">
                <Surfaces elevation={1} padding="lg" border="visible" radius="md">
                  <div className="grid gap-8 md:grid-cols-[minmax(0,0.78fr)_minmax(20rem,1fr)] md:items-center">
                    <div>
                      <Badge variant="soft" size="md">React Kit</Badge>
                      <h3 className="mt-5 text-heading text-foreground-display">
                        {t('让复杂状态拥有一致的语法', 'Give complex states a consistent grammar')}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {t(
                          '类型、交互状态和可访问行为被封装进组件，产品页面只需要组合真实能力。',
                          'Types, interaction states, and accessible behaviour live inside the components, so product pages only compose real capabilities.',
                        )}
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <ToolCallRow tool="read_context" status="done" elapsedMs={460} />
                      <ToolCallRow
                        tool="compose_interface"
                        activeLabel={t('正在组合界面', 'Composing interface')}
                        status="running"
                        elapsedMs={1180}
                      />
                    </div>
                  </div>
                </Surfaces>
              </TabPanel>

              <TabPanel value="docs">
                <Surfaces elevation={1} padding="lg" border="visible" radius="md">
                  <div className="grid gap-8 md:grid-cols-[minmax(0,0.78fr)_minmax(20rem,1fr)] md:items-center">
                    <div>
                      <Badge variant="soft" size="md">Documentation</Badge>
                      <h3 className="mt-5 text-heading text-foreground-display">
                        {t('用真实示例解释并验证系统', 'Explain and verify the system with real examples')}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {t(
                          '文档不是组件截图仓库，而是组合方式、交互状态和交付标准的可运行证据。',
                          'Documentation is not a screenshot archive; it is runnable evidence of composition, interaction states, and delivery standards.',
                        )}
                      </p>
                    </div>
                    <ProgressTrace
                      title={t('验证轨迹', 'VERIFICATION TRACE')}
                      steps={traceSteps}
                      expandLabel={t('展开验证轨迹', 'Expand verification trace')}
                      collapseLabel={t('收起验证轨迹', 'Collapse verification trace')}
                    />
                  </div>
                </Surfaces>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-foreground-display text-background">
        <div className="mx-auto flex max-w-page-wide flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-end md:px-6 md:py-20">
          <div className="max-w-3xl">
            <Badge variant="outline" size="md" className="border-background/30 text-background/70">
              {t('开始构建', 'Start building')}
            </Badge>
            <h2 className="mt-5 text-balance text-display-sm">
              {t(
                '从真实组件开始，让每个状态都可以被看见。',
                'Start with real components and make every state visible.',
              )}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/components"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              {t('查看组件', 'View components')}
            </Link>
            <a
              href="https://github.com/monkren-ai/AIOS-UI"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
