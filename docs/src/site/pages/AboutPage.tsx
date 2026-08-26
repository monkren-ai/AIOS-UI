import { Link } from 'react-router-dom'
import { buttonVariants } from 'aios-ui-kit/button'
import monkrenAvatar from '@/assets/images/monkren-avatar.png'
import { useT } from '../i18n'

export function AboutPage() {
  const { t, lang } = useT()

  return (
    <main className="overflow-hidden">
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-page-widget gap-10 px-4 py-20 md:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] md:px-6 md:py-24">
          <figure className="m-0 min-w-0">
            <div className="aspect-square overflow-hidden rounded-card border border-border bg-background">
              <img
                src={monkrenAvatar}
                alt={t('张瑞圣的个人头像', 'Portrait of Zhang Ruisheng')}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('公开资料来源：monk.ren', 'Public profile source: monk.ren')}
            </figcaption>
          </figure>

          <div className="flex min-w-0 flex-col justify-between gap-12">
            <div>
              <span className="font-mono text-label uppercase tracking-widest text-accent">
                {t('创作者', 'Creator')}
              </span>
              <h1 className="mt-4 text-display-sm text-foreground-display">张瑞圣 · MONK.REN</h1>
              <p className="mt-2 font-mono text-label uppercase tracking-widest text-foreground-subtle">
                {t('北京 · 图形与界面设计师', 'Beijing · Graphic and interface designer')}
              </p>
              <div className="mt-7 max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-foreground-muted md:text-subheading">
                <p>
                  {t(
                    '专注于用户界面、用户体验研究、品牌图形与设计系统，也持续尝试把 AI 和代码带进设计实践。',
                    'Focused on user interfaces, experience research, brand graphics, and design systems, while continually bringing AI and code into design practice.',
                  )}
                </p>
                <p>
                  {t(
                    'AIOS UI 延续了这条路径：不把设计停在图稿里，而是将判断变成令牌、组件、文档和可重复执行的 Skill。',
                    'AIOS UI continues that path: design does not stop at mockups. Judgement becomes tokens, components, documentation, and a repeatable Skill.',
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://monk.ren/"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'primary', size: 'md' })}
              >
                {t('访问 MONK.REN', 'Visit MONK.REN')}
              </a>
              <a
                href="https://monk.ren/file/zhangruisheng.pdf"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'secondary', size: 'md' })}
              >
                {t('查看公开简历', 'View public résumé')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page-widget px-4 py-24 md:px-6 md:py-32">
        <header className="max-w-3xl">
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            AIOS UI
          </span>
          <h2 className="mt-4 text-balance text-display-sm text-foreground-display">
            {t('把难以描述的设计判断，变成可以执行的共同语言', 'Turn hard-to-describe design judgement into an executable shared language')}
          </h2>
          <p className="mt-5 text-pretty text-subheading text-foreground-muted">
            {t(
              '项目由三个互相校验的部分组成：Skill 负责决策过程，React 组件库负责实现，文档站负责解释与验证。',
              'Three parts continuously check one another: the Skill carries the decision process, the React kit carries the implementation, and the documentation explains and verifies both.',
            )}
          </p>
        </header>
        <div className="mt-12 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
          {[
            {
              number: '01',
              title: 'Design Skill',
              zh: '让 Agent 在动手前理解视觉原则、约束和设计意图。',
              en: 'Helps agents understand visual principles, constraints, and intent before they build.',
            },
            {
              number: '02',
              title: 'React Kit',
              zh: '把原则实现为带类型、状态与可访问行为的组件。',
              en: 'Implements the principles as typed components with states and accessible behaviour.',
            },
            {
              number: '03',
              title: 'Documentation',
              zh: '用真实示例记录组件应该如何组合、验证和交付。',
              en: 'Records how components should be composed, verified, and shipped through real examples.',
            },
          ].map((part) => (
            <article key={part.number} className="p-7 md:first:ps-0 md:last:pe-0">
              <span className="font-mono text-label text-foreground-subtle">{part.number}</span>
              <h3 className="mt-4 text-heading text-foreground-display">{part.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {lang === 'zh' ? part.zh : part.en}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-foreground-display text-background">
        <div className="mx-auto flex max-w-page-widget flex-col items-start justify-between gap-8 px-4 py-20 md:flex-row md:items-end md:px-6 md:py-24">
          <div className="max-w-3xl">
            <span className="font-mono text-label uppercase tracking-widest opacity-60">
              {t('继续探索', 'Continue exploring')}
            </span>
            <h2 className="mt-4 text-balance text-display-sm">
              {t('查看组件真实状态，或在 GitHub 参与下一次迭代。', 'Explore components in real states or help shape the next iteration on GitHub.')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/components/overview"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              {t('查看交互总览', 'View live overview')}
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
