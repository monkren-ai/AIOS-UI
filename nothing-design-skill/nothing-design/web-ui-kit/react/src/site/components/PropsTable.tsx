import { useT } from '../i18n'
import type { ApiSection } from '../registry/types'

/**
 * API reference 的一张属性表。
 *
 * 窄屏下换成卡片堆叠 —— 四列的技术表格在手机上横向滚动基本没法读。
 */
export function PropsTable({ section }: { section: ApiSection }) {
  const { t, tb } = useT()

  return (
    <section data-slot="props-table" className="flex flex-col gap-3">
      <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground-display">
        {section.name}
      </h4>
      {section.description && (
        <p className="text-sm text-foreground-muted">{tb(section.description)}</p>
      )}

      <div className="overflow-hidden rounded-card-compact border border-border">
        {/* 宽屏：常规表格 */}
        <table className="hidden w-full border-collapse text-start text-sm md:table">
          <thead>
            <tr className="border-b border-border bg-surface">
              {[
                t('属性', 'Prop'),
                t('类型', 'Type'),
                t('默认值', 'Default'),
                t('说明', 'Description'),
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-start font-mono text-label uppercase tracking-widest font-medium text-foreground-subtle"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.props.map((prop) => (
              <tr key={prop.name} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 align-top font-mono text-xs text-foreground-display">
                  {prop.name}
                  {prop.required && (
                    <span className="ms-1 text-accent" title={t('必填', 'Required')}>
                      *
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-accent">{prop.type}</td>
                <td className="px-4 py-3 align-top font-mono text-xs text-foreground-muted">
                  {prop.required ? t('必填', 'Required') : (prop.default ?? '—')}
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  {tb(prop.description)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 窄屏：卡片堆叠 */}
        <ul className="divide-y divide-border md:hidden">
          {section.props.map((prop) => (
            <li key={prop.name} className="flex flex-col gap-1 p-4">
              <span className="font-mono text-xs text-foreground-display">
                {prop.name}
                {prop.required && <span className="ms-1 text-accent">*</span>}
              </span>
              <span className="font-mono text-xs text-accent">{prop.type}</span>
              <span className="font-mono text-xs text-foreground-subtle">
                {prop.required
                  ? t('必填', 'Required')
                  : `${t('默认', 'Default')}: ${prop.default ?? '—'}`}
              </span>
              <span className="pt-1 text-sm text-foreground-muted">{tb(prop.description)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PropsTable
