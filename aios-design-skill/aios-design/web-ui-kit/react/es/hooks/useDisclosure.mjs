import { useCallback, useState } from "react";
//#region src/hooks/useDisclosure.ts
function useDisclosure(initialValue = false) {
	const [isOpen, setIsOpen] = useState(initialValue);
	return {
		isOpen,
		open: useCallback(() => setIsOpen(true), []),
		close: useCallback(() => setIsOpen(false), []),
		toggle: useCallback(() => setIsOpen((v) => !v), [])
	};
}
//#endregion
export { useDisclosure };

//# sourceMappingURL=useDisclosure.mjs.map