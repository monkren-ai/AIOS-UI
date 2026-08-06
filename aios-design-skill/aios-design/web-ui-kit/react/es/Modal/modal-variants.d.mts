//#region src/Modal/modal-variants.d.ts
/**
 * Modal 的视觉变体。
 *
 * 居中不再用 `top/left: 50%` + `translate(-50%, -50%)`：那套写法在 RTL 下
 * 需要额外镜像。改用 `fixed inset-0 m-auto`（inset 对称，天然 RTL 安全），
 * 把 translate 完整让给进场动画。
 */
declare const modalBackdropVariants: (props?: ({
  alert?: boolean | null | undefined;
  visible?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const modalVariants: (props?: ({
  alert?: boolean | null | undefined;
  destructive?: boolean | null | undefined;
  noHeader?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 关闭按钮（右上角的 ×）。无标题时贴得更靠边。 */
declare const modalCloseVariants: (props?: ({
  noHeader?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 头部。默认给 × 留出 60px 的行末空间；alert 没有 × 就不用留。 */
declare const modalHeaderVariants: (props?: ({
  alert?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const modalTitleVariants: (props?: ({
  alert?: boolean | null | undefined;
  destructive?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const modalDescriptionVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const modalBodyVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const modalFooterVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const modalCancelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const modalConfirmVariants: (props?: ({
  destructive?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { modalBackdropVariants, modalBodyVariants, modalCancelVariants, modalCloseVariants, modalConfirmVariants, modalDescriptionVariants, modalFooterVariants, modalHeaderVariants, modalTitleVariants, modalVariants };
//# sourceMappingURL=modal-variants.d.mts.map