import * as React$1 from "react";

//#region src/conversation/Sources/Sources.d.ts
interface SourcesProps {
  label?: React$1.ReactNode;
  count?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React$1.ReactNode;
  className?: string;
}
declare function Sources({
  label,
  count,
  open,
  defaultOpen,
  onOpenChange,
  children,
  className
}: SourcesProps): React$1.JSX.Element;
interface SourceProps extends Omit<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  domain: string;
  title: React$1.ReactNode;
  icon?: React$1.ReactNode;
}
declare function Source({
  domain,
  title,
  icon,
  className,
  ref,
  ...props
}: SourceProps & {
  ref?: React$1.Ref<HTMLAnchorElement>;
}): React$1.JSX.Element;
//#endregion
export { Source, SourceProps, Sources, SourcesProps };
//# sourceMappingURL=Sources.d.mts.map