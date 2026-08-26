import { Icon } from 'aios-ui-kit/icon'

function StatusGlyph(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><circle cx="12" cy="12" r="8" /><path d="m8 12 2.5 2.5L16 9" /></svg>
}

export default function IconBasic() {
  return <Icon glyph={StatusGlyph} label="Ready" size="lg" />
}
