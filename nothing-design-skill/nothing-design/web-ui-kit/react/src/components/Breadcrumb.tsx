import '../styles/breadcrumb.css'

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/'
}) => {
  return (
    <nav className="nothing-breadcrumb" aria-label="Breadcrumb">
      <ol className="nothing-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={index}
              className="nothing-breadcrumb__item"
              aria-current={isLast ? 'page' : undefined}
            >
              {!isLast && item.href && (
                <a
                  className="nothing-breadcrumb__link"
                  href={item.href}
                  onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.() } : undefined}
                >
                  {item.label}
                </a>
              )}
              {!isLast && !item.href && item.onClick && (
                <button
                  className="nothing-breadcrumb__link"
                  onClick={item.onClick}
                  type="button"
                >
                  {item.label}
                </button>
              )}
              {!isLast && !item.href && !item.onClick && (
                <span className="nothing-breadcrumb__link">
                  {item.label}
                </span>
              )}
              {isLast && (
                <span className="nothing-breadcrumb__link nothing-breadcrumb__link--current">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="nothing-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
