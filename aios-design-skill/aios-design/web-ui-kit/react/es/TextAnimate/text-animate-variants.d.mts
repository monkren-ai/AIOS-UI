//#region src/TextAnimate/text-animate-variants.d.ts
/**
 * TextAnimate 的视觉变体。
 *
 * 容器只承担过渡与 mode 钩子；逐段揭示的动画写在 segment 上（见 TextAnimate.css
 * 的 `aios-text-reveal` keyframes + 组件里的 `motion-safe:animate-[...]`）。
 * `mode` 决定切分粒度，并在此挂上 `data-mode` 供样式选择。
 */
declare const textAnimateVariants: (props?: ({
  mode?: "char" | "word" | "line" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type TextAnimateMode = 'char' | 'word' | 'line';
//#endregion
export { TextAnimateMode, textAnimateVariants };
//# sourceMappingURL=text-animate-variants.d.mts.map