//#region src/States/states-variants.d.ts
/**
 * 四个状态占位块（loading / error / empty / disabled）的共享容器。
 *
 * `variant` 这里描述的是语义状态而非 §3 的强调层级——状态块不参与
 * primary / secondary 那套词表。`size` 在 v1 里就没有对应样式，这里保留
 * 成空档位只为了不改公开 API。
 */
declare const stateVariants: (props?: ({
  variant?: "disabled" | "empty" | "error" | "loading" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 进度条的单个刻度。 */
declare const loadingSegmentVariants: (props?: ({
  filled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type StateVariant = 'loading' | 'error' | 'empty' | 'disabled';
type StateSize = 'sm' | 'md' | 'lg';
//#endregion
export { StateSize, StateVariant, loadingSegmentVariants, stateVariants };
//# sourceMappingURL=states-variants.d.mts.map