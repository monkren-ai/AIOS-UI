import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AgentOrb, ApprovalGate, PlanCard, ProgressTrace, ToolCallRow } from '@/agent'
import { buttonVariants } from 'aios-ui-kit/button'
import type { PlanStep, TraceStep } from '@/agent'
import { useShowcaseContext } from './ShowcaseContext'
import './styles/project-intro-page.css'

export function ProjectIntroPage() {
  const { t } = useShowcaseContext()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const [introPlanSteps, setIntroPlanSteps] = useState<PlanStep[]>([
    {
      id: '1',
      description: t('分析用户需求与上下文', 'Analyze user needs and context'),
      status: 'approved',
    },
    {
      id: '2',
      description: t('检索相关文档与数据', 'Retrieve relevant documents and data'),
      status: 'approved',
    },
    {
      id: '3',
      description: t('生成建议并等待授权', 'Generate suggestions and await authorization'),
      status: 'pending',
    },
  ])

  const handleStepToggle = (stepId: string, approved: boolean) => {
    setIntroPlanSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, status: approved ? 'approved' : 'pending' } : step,
      ),
    )
  }

  const handleApproveAll = () => {
    setIntroPlanSteps((steps) => steps.map((step) => ({ ...step, status: 'approved' })))
  }

  const handleReset = () => {
    setIntroPlanSteps((steps) => steps.map((step) => ({ ...step, status: 'pending' })))
  }

  const traceSteps: TraceStep[] = [
    {
      id: 'init',
      label: t('初始化 Agent', 'Initialize Agent'),
      status: 'done',
      timestamp: '09:00:00',
    },
    {
      id: 'parse',
      label: t('解析意图', 'Parse intent'),
      status: 'done',
      timestamp: '09:00:12',
    },
    {
      id: 'invoke',
      label: t('调用工具', 'Invoke tools'),
      status: 'active',
      timestamp: '09:00:34',
    },
    {
      id: 'confirm',
      label: t('等待用户确认', 'Await user confirmation'),
      status: 'pending',
    },
  ]

  const orbStates = ['idle', 'thinking', 'acting', 'paused', 'error'] as const

  return (
    <div className="project-intro-page">
      <main>
        <section className="pi-hero">
          <div className="pi-container pi-hero__content">
            <span className="pi-eyebrow">{t('项目介绍', 'Project Intro')}</span>
            <h1 className="pi-title">AIOS UI</h1>
            <p className="pi-subtitle">
              {t(
                '为 AI OS 构建的单色设计系统。以克制的视觉语言、工业级精确度和可解释的 Agent 界面，重新定义人机协作。',
                'A monochrome design system built for AI OS. Redefining human-machine collaboration through restrained visual language, industrial precision, and explainable Agent interfaces.',
              )}
            </p>
            <div className="pi-meta">
              <span className="pi-meta__dot" aria-hidden="true"></span>
              <span>Design System</span>
              <span>·</span>
              <span>React</span>
              <span>·</span>
              <span>AI OS</span>
              <span>·</span>
              <span>v1.0</span>
            </div>
            <figure
              className="pi-visual pi-hero__visual"
              aria-label={t('AI OS 界面可视化', 'AI OS interface visualization')}
            >
              <svg
                viewBox="0 0 920 460"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="920" height="460" fill="var(--pi-surface)" />
                <rect
                  x="24"
                  y="24"
                  width="72"
                  height="412"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="40" y="48" width="40" height="4" rx="2" fill="var(--pi-text-primary)" />
                <rect x="40" y="64" width="28" height="4" rx="2" fill="var(--pi-text-secondary)" />
                <rect x="40" y="80" width="32" height="4" rx="2" fill="var(--pi-text-secondary)" />
                <rect x="40" y="96" width="24" height="4" rx="2" fill="var(--pi-text-secondary)" />
                <circle cx="60" cy="392" r="8" fill="var(--pi-accent)" />

                <rect
                  x="116"
                  y="24"
                  width="780"
                  height="64"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="140" y="52" width="160" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="780" y="48" width="96" height="16" rx="8" fill="var(--pi-text-primary)" />

                <rect
                  x="116"
                  y="108"
                  width="480"
                  height="328"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="140" y="132" width="120" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="140" y="156" width="432" height="1" fill="var(--pi-border-visible)" />
                <rect
                  x="140"
                  y="176"
                  width="200"
                  height="120"
                  rx="4"
                  fill="var(--pi-surface)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect
                  x="372"
                  y="176"
                  width="200"
                  height="120"
                  rx="4"
                  fill="var(--pi-surface)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect
                  x="140"
                  y="316"
                  width="432"
                  height="96"
                  rx="4"
                  fill="var(--pi-surface)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <circle cx="164" cy="200" r="6" fill="var(--pi-accent)" />
                <rect x="188" y="196" width="120" height="4" rx="2" fill="var(--pi-text-primary)" />
                <rect
                  x="188"
                  y="208"
                  width="80"
                  height="4"
                  rx="2"
                  fill="var(--pi-text-secondary)"
                />
                <rect
                  x="188"
                  y="220"
                  width="100"
                  height="4"
                  rx="2"
                  fill="var(--pi-text-secondary)"
                />

                <rect
                  x="620"
                  y="108"
                  width="276"
                  height="156"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="644" y="132" width="96" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="644" y="156" width="228" height="1" fill="var(--pi-border-visible)" />
                <rect x="644" y="172" width="228" height="8" rx="4" fill="var(--pi-text-primary)" />
                <rect
                  x="644"
                  y="188"
                  width="180"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect
                  x="644"
                  y="204"
                  width="200"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect
                  x="644"
                  y="220"
                  width="140"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />

                <rect
                  x="620"
                  y="280"
                  width="276"
                  height="156"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="644" y="304" width="120" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="644" y="328" width="228" height="1" fill="var(--pi-border-visible)" />
                <circle cx="660" cy="356" r="6" fill="var(--pi-text-tertiary)" />
                <circle cx="692" cy="356" r="6" fill="var(--pi-text-secondary)" />
                <circle cx="724" cy="356" r="6" fill="var(--pi-text-primary)" />
                <circle cx="756" cy="356" r="6" fill="var(--pi-accent)" />
                <circle cx="788" cy="356" r="6" fill="var(--pi-text-tertiary)" />
                <rect x="644" y="380" width="228" height="1" fill="var(--pi-border-visible)" />
                <rect
                  x="644"
                  y="396"
                  width="160"
                  height="4"
                  rx="2"
                  fill="var(--pi-text-secondary)"
                />
              </svg>
            </figure>
          </div>
        </section>

        <div className="pi-container">
          <section className="pi-section" id="philosophy">
            <header className="pi-section__header">
              <span className="pi-section__label">Philosophy</span>
              <h2 className="pi-section__title">
                {t('更少装饰，更多结构', 'Less Decoration, More Structure')}
              </h2>
            </header>
            <p className="pi-body">
              {t(
                'AIOS UI 从瑞士字体排印、Braun 与 Teenage Engineering 中汲取灵感。我们相信界面应该像仪器面板一样清晰：每一个元素都有功能，每一种灰度都在传递层级，而非装饰。',
                'AIOS UI draws inspiration from Swiss typography, Braun, and Teenage Engineering. We believe interfaces should read like instrument panels: every element has a function, every gray value carries hierarchy, not decoration.',
              )}
            </p>
            <div className="pi-grid">
              <article className="pi-card">
                <div className="pi-card__number">01</div>
                <h3 className="pi-card__title">{t('单色', 'Monochrome')}</h3>
                <p className="pi-card__text">
                  {t(
                    '颜色是事件，不是默认。灰阶层级承担主要工作；红色只留给唯一的紧急信号。',
                    'Color is an event, not a default. Gray scales do the heavy lifting; red is reserved for the single urgent signal.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">02</div>
                <h3 className="pi-card__title">{t('字体驱动', 'Type-Driven')}</h3>
                <p className="pi-card__text">
                  {t(
                    '结构即装饰。Doto、Space Grotesk 与 Space Mono 构成三声部系统，字体本身传递意义。',
                    'Structure is decoration. Doto, Space Grotesk, and Space Mono form a three-voice system where type itself conveys meaning.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">03</div>
                <h3 className="pi-card__title">{t('工业感', 'Industrial')}</h3>
                <p className="pi-card__text">
                  {t(
                    '诚实的几何、紧致的圆角、单线图标、无装饰模糊。每个像素都必须有存在的理由。',
                    'Honest geometry, tight radius, single-line icons, no decorative blur. Every pixel must earn its place.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">04</div>
                <h3 className="pi-card__title">{t('Agent 就绪', 'Agent-Ready')}</h3>
                <p className="pi-card__text">
                  {t(
                    'AI OS 是语义扩展：Agent 状态成为界面结构，授权成为新的点击。',
                    'AI OS is a semantic extension: Agent states become interface structure, and approval becomes the new click.',
                  )}
                </p>
              </article>
            </div>
          </section>

          <section className="pi-section" id="typography">
            <header className="pi-section__header">
              <span className="pi-section__label">Typography</span>
              <h2 className="pi-section__title">
                {t('三种声音，一个系统', 'Three Voices, One System')}
              </h2>
            </header>
            <div className="pi-grid">
              <div className="pi-type-card">
                <div className="pi-type-card__sample pi-type-card__sample--doto">Aa</div>
                <p className="pi-type-card__name">Doto</p>
                <p className="pi-type-card__role">{t('展示 / 标题', 'Display / Headlines')}</p>
              </div>
              <div className="pi-type-card">
                <div className="pi-type-card__sample pi-type-card__sample--grotesk">Aa</div>
                <p className="pi-type-card__name">Space Grotesk</p>
                <p className="pi-type-card__role">{t('正文 / 界面', 'Body / UI')}</p>
              </div>
              <div className="pi-type-card">
                <div className="pi-type-card__sample pi-type-card__sample--mono">Aa</div>
                <p className="pi-type-card__name">Space Mono</p>
                <p className="pi-type-card__role">{t('数据 / 标签', 'Data / Labels')}</p>
              </div>
            </div>
          </section>

          <section className="pi-section" id="color">
            <header className="pi-section__header">
              <span className="pi-section__label">Color</span>
              <h2 className="pi-section__title">{t('无阴影的深度', 'Depth Without Shadows')}</h2>
            </header>
            <p className="pi-body">
              {t(
                '通过表面明度与 1px 边框构建层级。没有玻璃、没有模糊、没有投影——只有精确的灰阶与作为事件出现的红色。',
                'Hierarchy is built through surface brightness and 1px borders. No glass, no blur, no drop shadows—only precise grayscale and red appearing as an event.',
              )}
            </p>
            <div className="pi-color-grid">
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#000000' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--black</p>
                  <p className="pi-color-card__value">#000000 · OLED Black</p>
                </div>
              </div>
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#111111' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--surface</p>
                  <p className="pi-color-card__value">#111111 · Surface</p>
                </div>
              </div>
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#1A1A1A' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--surface-raised</p>
                  <p className="pi-color-card__value">#1A1A1A · Raised</p>
                </div>
              </div>
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#333333' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--border-visible</p>
                  <p className="pi-color-card__value">#333333 · Border</p>
                </div>
              </div>
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#E8E8E8' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--text-primary</p>
                  <p className="pi-color-card__value">#E8E8E8 · Primary Text</p>
                </div>
              </div>
              <div className="pi-color-card">
                <div className="pi-color-card__swatch" style={{ background: '#D71921' }}></div>
                <div className="pi-color-card__info">
                  <p className="pi-color-card__token">--accent</p>
                  <p className="pi-color-card__value">#D71921 · Signal Red</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pi-section" id="components">
            <header className="pi-section__header">
              <span className="pi-section__label">Components</span>
              <h2 className="pi-section__title">{t('从按钮到 Agent', 'From Button to Agent')}</h2>
            </header>
            <p className="pi-body">
              {t(
                '超过 60 个组件覆盖核心交互、数据展示、系统监控与特色组件。每一个都遵循相同的几何与色彩纪律。',
                'Over 60 components cover core interactions, data display, system monitoring, and feature widgets. Each follows the same geometry and color discipline.',
              )}
            </p>
            <figure
              className="pi-visual pi-visual--framed"
              aria-label={t('组件概览', 'Component overview')}
            >
              <svg
                viewBox="0 0 800 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="800" height="320" fill="var(--pi-surface)" />

                <rect x="24" y="24" width="120" height="40" rx="8" fill="var(--pi-text-display)" />
                <rect x="44" y="40" width="80" height="8" rx="4" fill="var(--pi-surface)" />

                <rect
                  x="160"
                  y="24"
                  width="120"
                  height="40"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="176" y="40" width="88" height="8" rx="4" fill="var(--pi-text-primary)" />

                <rect
                  x="296"
                  y="24"
                  width="120"
                  height="40"
                  rx="20"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="316" y="40" width="80" height="8" rx="4" fill="var(--pi-text-secondary)" />

                <rect
                  x="432"
                  y="24"
                  width="120"
                  height="40"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="488" y="32" width="56" height="24" rx="12" fill="var(--pi-text-display)" />
                <circle cx="532" cy="44" r="8" fill="var(--pi-surface)" />

                <rect
                  x="568"
                  y="24"
                  width="208"
                  height="40"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect
                  x="588"
                  y="40"
                  width="120"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect x="720" y="36" width="40" height="16" rx="8" fill="var(--pi-accent)" />

                <rect
                  x="24"
                  y="80"
                  width="372"
                  height="120"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="44" y="100" width="120" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="44" y="120" width="332" height="1" fill="var(--pi-border-visible)" />
                <rect x="44" y="140" width="200" height="8" rx="4" fill="var(--pi-text-primary)" />
                <rect
                  x="44"
                  y="156"
                  width="160"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect
                  x="44"
                  y="172"
                  width="120"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />

                <rect
                  x="408"
                  y="80"
                  width="368"
                  height="120"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="428" y="100" width="96" height="8" rx="4" fill="var(--pi-text-display)" />
                <rect x="428" y="120" width="328" height="1" fill="var(--pi-border-visible)" />
                <rect x="428" y="140" width="328" height="12" rx="6" fill="var(--pi-surface)" />
                <rect
                  x="428"
                  y="140"
                  width="240"
                  height="12"
                  rx="6"
                  fill="var(--pi-text-primary)"
                />
                <rect x="428" y="164" width="328" height="12" rx="6" fill="var(--pi-surface)" />
                <rect
                  x="428"
                  y="164"
                  width="160"
                  height="12"
                  rx="6"
                  fill="var(--pi-text-secondary)"
                />

                <rect
                  x="24"
                  y="216"
                  width="248"
                  height="80"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="40" y="236" width="160" height="8" rx="4" fill="var(--pi-text-primary)" />
                <rect
                  x="40"
                  y="256"
                  width="120"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect x="216" y="248" width="40" height="16" rx="8" fill="var(--pi-accent)" />

                <rect
                  x="288"
                  y="216"
                  width="248"
                  height="80"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="308" y="236" width="100" height="8" rx="4" fill="var(--pi-text-primary)" />
                <rect
                  x="308"
                  y="256"
                  width="80"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <circle
                  cx="500"
                  cy="256"
                  r="12"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M500 250 L500 256 L506 256"
                  stroke="var(--pi-text-primary)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                <rect
                  x="552"
                  y="216"
                  width="224"
                  height="80"
                  rx="8"
                  fill="var(--pi-surface-raised)"
                  stroke="var(--pi-border-visible)"
                  strokeWidth="1"
                />
                <rect x="572" y="236" width="184" height="8" rx="4" fill="var(--pi-text-primary)" />
                <rect
                  x="572"
                  y="252"
                  width="120"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
                <rect
                  x="572"
                  y="268"
                  width="80"
                  height="8"
                  rx="4"
                  fill="var(--pi-text-secondary)"
                />
              </svg>
            </figure>
            <div className="pi-grid">
              <div className="pi-component-card">
                <span className="pi-component-card__label">Button</span>
                <div className="pi-component-card__preview">
                  <button className="pi-button pi-button--primary">{t('主要', 'Primary')}</button>
                </div>
              </div>
              <div className="pi-component-card">
                <span className="pi-component-card__label">Card</span>
                <div className="pi-component-card__preview">
                  <div className="pi-card-demo">
                    <div className="pi-card-demo__title">{t('示例', 'Demo')}</div>
                    <div className="pi-card-demo__content">{t('内容区域', 'Content')}</div>
                  </div>
                </div>
              </div>
              <div className="pi-component-card">
                <span className="pi-component-card__label">Switch</span>
                <div className="pi-component-card__preview">
                  <label className="pi-switch">
                    <input type="checkbox" defaultChecked readOnly />
                    <span>{t('启用', 'On')}</span>
                  </label>
                </div>
              </div>
              <div className="pi-component-card">
                <span className="pi-component-card__label">Tag</span>
                <div className="pi-component-card__preview">
                  <span className="pi-tag">{t('状态标签', 'Status')}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="pi-section" id="ai-os">
            <header className="pi-section__header">
              <span className="pi-section__label">AI OS</span>
              <h2 className="pi-section__title">
                {t('Agent 是结构，不是加载动画', 'Agent Is Structure, Not a Loading Spinner')}
              </h2>
            </header>
            <div className="pi-agent-demos">
              <div className="pi-agent-demo">
                <span className="pi-agent-demo__label">{t('Agent 状态', 'Agent States')}</span>
                <div className="pi-agent-demo__content">
                  {orbStates.map((state) => (
                    <AgentOrb key={state} state={state} size="md" showLabel />
                  ))}
                </div>
              </div>

              <div className="pi-agent-demo">
                <span className="pi-agent-demo__label">{t('执行计划', 'Agent Plan')}</span>
                <PlanCard
                  title={t('AGENT PLAN', 'AGENT PLAN')}
                  steps={introPlanSteps}
                  editable
                  compact
                  onStepToggle={handleStepToggle}
                  onApproveAll={handleApproveAll}
                  onReset={handleReset}
                  approveAllLabel={t('全部批准', 'APPROVE ALL')}
                  resetLabel={t('重置', 'RESET')}
                  approveDisabledHint={t('需先批准所有步骤', 'Approve all steps first')}
                />
              </div>

              <div className="pi-agent-demo">
                <span className="pi-agent-demo__label">{t('工具调用', 'Tool Calls')}</span>
                <div className="pi-agent-demo__content pi-agent-demo__content--col">
                  <ToolCallRow
                    tool="Search"
                    args={{ query: 'AIOS UI design system' }}
                    status="done"
                    elapsedMs={240}
                    result={t('找到 12 条相关结果', 'Found 12 relevant results')}
                  />
                  <ToolCallRow
                    tool="SendEmail"
                    args={{ to: 'team@example.com', subject: t('设计更新', 'Design update') }}
                    status="pending"
                  />
                </div>
              </div>

              <div className="pi-agent-demo">
                <span className="pi-agent-demo__label">{t('进度追踪', 'Progress Trace')}</span>
                <ProgressTrace steps={traceSteps} title={t('TRACE', 'TRACE')} />
              </div>

              <div className="pi-agent-demo pi-agent-demo--wide">
                <span className="pi-agent-demo__label">{t('审批门', 'Approval Gate')}</span>
                <ApprovalGate
                  action={t(
                    '允许 Agent 读取当前项目文档？',
                    'Allow agent to read the current project document?',
                  )}
                  impact={t(
                    '只读访问，不会修改文件内容。授权后可随时在设置中撤销。',
                    'Read-only access. File will not be modified. Authorization can be revoked in settings.',
                  )}
                  risk="high"
                  reversible
                  allowLabel={t('ALLOW', 'ALLOW')}
                  denyLabel={t('DENY', 'DENY')}
                />
              </div>
            </div>

            <p className="pi-body">
              {t(
                'AI OS 扩展不改变 AIOS 的视觉基因，而是改变交互模型：从“用户操作界面”转向“用户授权 Agent”。PlanCard、ToolCallRow、ProgressTrace 与 ApprovalGate 让 Agent 的每一步都可见、可审查、可撤销。',
                'The AI OS extension does not alter AIOS\'s visual DNA; it changes the interaction model: from "user operates the interface" to "user authorizes the Agent." PlanCard, ToolCallRow, ProgressTrace, and ApprovalGate make every Agent step visible, reviewable, and reversible.',
              )}
            </p>
          </section>

          <section className="pi-section" id="skill">
            <header className="pi-section__header">
              <span className="pi-section__label">Skill</span>
              <h2 className="pi-section__title">
                {t('让 AI 也掌握这套设计语言', 'Teach the AI the Same Design Language')}
              </h2>
            </header>
            <p className="pi-body">
              {t(
                'AIOS UI 不只是组件库，还配套了一个 aios-design Skill：把整套设计哲学、Craft Rules、反模式与工作流封装为 AI Agent 可读、可调用的知识包。说一句 "AIOS style"，Agent 就会按同一套纪律产出界面——人与 AI 共享同一份审美标准。',
                'AIOS UI is more than a component library. It ships with a aios-design Skill that packages the design philosophy, craft rules, anti-patterns, and workflows into a knowledge base an AI agent can read and invoke. Say "AIOS style" and the agent produces interfaces under the same discipline — human and AI sharing one aesthetic standard.',
              )}
            </p>
            <div className="pi-grid">
              <article className="pi-card">
                <div className="pi-card__number">01</div>
                <h3 className="pi-card__title">{t('设计哲学', 'Design Philosophy')}</h3>
                <p className="pi-card__text">
                  {t(
                    '减法优先、结构即装饰、单色为底、字体承担层级。每条规则都被编码，AI 也会先问"能不能去掉"。',
                    'Subtract first, structure as ornament, monochrome as canvas, type carrying hierarchy. Every rule is encoded so the AI also asks "can this go?"',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">02</div>
                <h3 className="pi-card__title">{t('Craft Rules', 'Craft Rules')}</h3>
                <p className="pi-card__text">
                  {t(
                    '三层视觉层级、每屏 2 字族 3 字号 2 字重、间距即意义、灰阶即层级。把审美判断变成可执行约束。',
                    'Three-layer hierarchy, two font families and three sizes per screen, spacing as meaning, grayscale as hierarchy. Aesthetic judgment turned into executable constraints.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">03</div>
                <h3 className="pi-card__title">{t('反模式守护', 'Anti-Pattern Guards')}</h3>
                <p className="pi-card__text">
                  {t(
                    '显式禁止渐变、阴影与模糊；改造的 Skeleton、Toast、GradientGlow 以点阵与内联状态条提供 AIOS 替代，而非照搬常见模式。',
                    'Gradients, shadows, and blur are explicitly banned; the adapted Skeleton, Toast, and GradientGlow ship dot-matrix and inline-status-bar alternatives instead of copying common patterns.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">04</div>
                <h3 className="pi-card__title">{t('双工作流', 'Two Workflows')}</h3>
                <p className="pi-card__text">
                  {t(
                    '标准设计流：从声明字体到组件构建；项目迁移流：扫描现有代码、匹配组件、按 Token 注入或整体替换三种策略落地。',
                    'Standard design flow: from declaring fonts to building components. Project migration flow: scan existing code, match components, then apply via Token Injection or full replacement.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">05</div>
                <h3 className="pi-card__title">{t('Web UI Kit', 'Web UI Kit')}</h3>
                <p className="pi-card__text">
                  {t(
                    '内建 80+ 组件，shadcn 架构、CVA 变体、CSS 变量主题，ref-as-prop 与 data-slot 语义钩子贯穿全套。',
                    '80+ built-in components, shadcn-style architecture, CVA variants, CSS-variable theming, with ref-as-prop and data-slot hooks throughout.',
                  )}
                </p>
              </article>
              <article className="pi-card">
                <div className="pi-card__number">06</div>
                <h3 className="pi-card__title">{t('触发即用', 'Trigger on Demand')}</h3>
                <p className="pi-card__text">
                  {t(
                    '说 "AIOS style" 或 "/aios-design" 即可唤起；工具权限限定为只读与编辑，不随意改动未授权的文件。',
                    'Invoke with "AIOS style" or "/aios-design"; tool permissions are scoped to read and edit, so it never touches files it was not asked to.',
                  )}
                </p>
              </article>
            </div>
          </section>

          <section className="pi-closing">
            <h2 className="pi-closing__title">{t('开始构建', 'Start Building')}</h2>
            <p className="pi-body">
              {t(
                '查看组件库展示页，或直接在项目中引入 AIOS UI 开始构建你的 AI OS 界面。',
                'Explore the component showcase or import AIOS UI directly into your project to start building your AI OS interface.',
              )}
            </p>
            <div className="pi-closing__actions">
              <Link
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
                to="/components"
              >
                {t('浏览组件库', 'Browse Components')}
              </Link>
              <button
                type="button"
                className={buttonVariants({ variant: 'secondary', size: 'lg' })}
                onClick={scrollToTop}
              >
                {t('回到顶部', 'Back to Top')}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="pi-container pi-footer">
        <span>AIOS UI · v1.0</span>
        <span>Monochrome Design System for AI OS</span>
      </footer>
    </div>
  )
}
