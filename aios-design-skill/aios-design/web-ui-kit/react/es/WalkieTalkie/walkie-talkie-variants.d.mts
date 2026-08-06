//#region src/WalkieTalkie/walkie-talkie-variants.d.ts
/**
 * WalkieTalkie 的视觉变体。
 *
 * `status` 描述的是对讲机自身的状态机（待机 / 发射中 / 已发送），
 * 不参与 §3 的强调层级词表。
 */
declare const walkieTalkieVariants: (props?: ({
  status?: "ready" | "transmitting" | "sent" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type WalkieStatus = 'ready' | 'transmitting' | 'sent';
//#endregion
export { WalkieStatus, walkieTalkieVariants };
//# sourceMappingURL=walkie-talkie-variants.d.mts.map