//#region src/hooks/useDisclosure.d.ts
interface DisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
declare function useDisclosure(initialValue?: boolean): DisclosureReturn;
//#endregion
export { DisclosureReturn, useDisclosure };
//# sourceMappingURL=useDisclosure.d.mts.map