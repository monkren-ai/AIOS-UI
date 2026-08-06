import * as React$1 from "react";

//#region src/ErrorBoundary/ErrorBoundary.d.ts
interface ErrorBoundaryProps {
  children: React$1.ReactNode;
  fallback?: React$1.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
declare class ErrorBoundary extends React$1.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps);
  static getDerivedStateFromError(error: Error): ErrorBoundaryState;
  componentDidCatch(error: Error, errorInfo: React$1.ErrorInfo): void;
  handleReload: () => void;
  render(): React$1.ReactNode;
}
//#endregion
export { ErrorBoundary };
//# sourceMappingURL=ErrorBoundary.d.mts.map