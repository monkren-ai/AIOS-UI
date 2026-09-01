import { SenderProps } from "../../conversation/Sender/Sender.mjs";
import { promptBoxVariants } from "./prompt-box-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/agent/PromptBox/PromptBox.d.ts
interface PromptBoxModelSelectProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React$1.ReactNode;
  label: React$1.ReactNode;
}
declare function PromptBoxModelSelect({
  icon,
  label,
  className,
  ref,
  ...props
}: PromptBoxModelSelectProps & {
  ref?: React$1.Ref<HTMLButtonElement>;
}): React$1.JSX.Element;
interface PromptBoxProps extends Omit<SenderProps, 'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'onStop' | 'running' | 'prefix' | 'suffix' | 'footer' | 'modelSelect'>, VariantProps<typeof promptBoxVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  running?: boolean;
  onStop?: () => void;
  onAttach?: () => void;
  onMention?: () => void;
  onVoiceToggle?: () => void;
  voice?: 'wave' | 'mic';
  voiceStatus?: 'idle' | 'inputting' | 'thinking';
  /** @deprecated Use voiceStatus="inputting" instead. */
  voiceActive?: boolean;
  modelSelect?: React$1.ReactNode;
  contextBefore?: React$1.ReactNode;
  contextAfter?: React$1.ReactNode;
  inset?: boolean;
}
declare function PromptBox({
  value,
  defaultValue,
  onValueChange,
  onSubmit,
  running,
  onStop,
  onAttach,
  onMention,
  onVoiceToggle,
  voice,
  voiceStatus,
  voiceActive,
  modelSelect,
  contextBefore,
  contextAfter,
  inset,
  autoSize,
  placeholder,
  density,
  className,
  ref,
  ...props
}: PromptBoxProps & {
  ref?: React$1.Ref<HTMLTextAreaElement>;
}): React$1.JSX.Element;
//#endregion
export { PromptBox, PromptBoxModelSelect, PromptBoxModelSelectProps, PromptBoxProps };
//# sourceMappingURL=PromptBox.d.mts.map