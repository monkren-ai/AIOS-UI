//#region src/hooks/useFloating.d.ts
type Placement = 'top' | 'bottom' | 'left' | 'right';
interface FloatingReturn {
  style: React.CSSProperties;
  update: (anchor: HTMLElement, floating: HTMLElement) => void;
}
declare function useFloating(placement?: Placement): FloatingReturn;
//#endregion
export { FloatingReturn, Placement, useFloating };
//# sourceMappingURL=useFloating.d.mts.map