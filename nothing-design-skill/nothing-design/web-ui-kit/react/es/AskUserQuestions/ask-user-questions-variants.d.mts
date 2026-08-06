//#region src/AskUserQuestions/ask-user-questions-variants.d.ts
/**
 * AskUserQuestions 的视觉变体。
 *
 * 容器色走 agent 专用的间接层（`--surface-agent` / `--border-agent` /
 * `--radius-agent-card`）而不是直接写 `bg-surface`：这几个变量存在的意义
 * 就是让整套 AI OS 组件能被一起重定向，绕过它就把这条口子堵死了。
 */
declare const askUserQuestionsVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type AskUserQuestionsSize = 'sm' | 'md' | 'lg';
//#endregion
export { AskUserQuestionsSize, askUserQuestionsVariants };
//# sourceMappingURL=ask-user-questions-variants.d.mts.map