//#region src/hooks/useLocalStorageState.d.ts
declare function useLocalStorageState<T>(key: string, defaultValue: T): [T, (v: T | ((prev: T) => T)) => void];
//#endregion
export { useLocalStorageState };
//# sourceMappingURL=useLocalStorageState.d.mts.map