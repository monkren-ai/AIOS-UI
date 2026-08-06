import { StateSize, loadingSegmentVariants, stateVariants } from "./states-variants.mjs";
import * as React$1 from "react";
//#region src/States/States.d.ts
interface LoadingStateProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  progress?: number;
  totalSegments?: number;
  label?: string;
  size?: StateSize;
}
declare function LoadingState({
  className,
  progress,
  totalSegments,
  label,
  size,
  ...props
}: LoadingStateProps): React$1.JSX.Element;
declare namespace LoadingState {
  var displayName: string;
}
interface ErrorStateProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onClick'> {
  headline: string;
  message?: string;
  prefix?: string;
  onRetry?: () => void;
  size?: StateSize;
}
declare function ErrorState({
  className,
  headline,
  message,
  prefix,
  onRetry,
  size,
  ...props
}: ErrorStateProps): React$1.JSX.Element;
declare namespace ErrorState {
  var displayName: string;
}
interface EmptyStateProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  headline?: string;
  description?: string;
  action?: React$1.ReactNode;
  size?: StateSize;
}
declare function EmptyState({
  className,
  headline,
  description,
  action,
  size,
  ...props
}: EmptyStateProps): React$1.JSX.Element;
declare namespace EmptyState {
  var displayName: string;
}
interface DisabledStateProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  headline?: string;
  description?: string;
  size?: StateSize;
}
declare function DisabledState({
  className,
  headline,
  description,
  size,
  ...props
}: DisabledStateProps): React$1.JSX.Element;
declare namespace DisabledState {
  var displayName: string;
}
//#endregion
export { DisabledState, DisabledStateProps, EmptyState, EmptyStateProps, ErrorState, ErrorStateProps, LoadingState, LoadingStateProps };
//# sourceMappingURL=States.d.mts.map