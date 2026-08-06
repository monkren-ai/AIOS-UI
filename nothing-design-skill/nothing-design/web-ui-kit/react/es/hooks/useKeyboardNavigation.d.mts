//#region src/hooks/useKeyboardNavigation.d.ts
interface KeyboardNavigationOptions {
  items: HTMLElement[];
  orientation?: 'horizontal' | 'vertical' | 'both';
  loop?: boolean;
  onSelect?: (index: number) => void;
}
declare function useKeyboardNavigation({
  items,
  orientation,
  loop,
  onSelect
}: KeyboardNavigationOptions): (e: React.KeyboardEvent, currentIndex: number) => void;
//#endregion
export { useKeyboardNavigation };
//# sourceMappingURL=useKeyboardNavigation.d.mts.map