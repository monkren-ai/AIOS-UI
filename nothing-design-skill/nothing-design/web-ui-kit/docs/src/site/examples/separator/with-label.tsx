import { Separator } from 'aios-ui-kit/separator'

export default function SeparatorWithLabel() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-sm text-foreground-muted">Sign in with your account.</p>
      <Separator label="or" />
      <p className="text-sm text-foreground-muted">Continue with a one-time code.</p>
      <Separator label="Advanced" size="lg" />
      <p className="text-sm text-foreground-muted">Bring your own identity provider.</p>
    </div>
  )
}
