//#region src/MusicPlayer/music-player-variants.d.ts
/**
 * MusicPlayer 的视觉变体。
 *
 * 三个版型差别很大，所以 `variant` 在这里描述的是版型而不是 §3 的强调层级：
 * - `default` 是一张完整的播放器卡片（走语义令牌，跟随 [data-theme]）；
 * - `compact` 是桌面小组件的窄条（走 widget 色板，不跟随主题）；
 * - `mini` 直接复用 widget-card 那套既有类，样式不在本文件里。
 */
declare const musicPlayerVariants: (props?: ({
  variant?: "default" | "compact" | "mini" | null | undefined;
  recording?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type MusicPlayerVariant = 'default' | 'compact' | 'mini';
//#endregion
export { MusicPlayerVariant, musicPlayerVariants };
//# sourceMappingURL=music-player-variants.d.mts.map