import { senderVariants } from "./sender-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/conversation/Sender/Sender.d.ts
type SenderSemanticType = 'root' | 'header' | 'content' | 'prefix' | 'input' | 'suffix' | 'footer';
interface SenderComponents {
  SendButton: React$1.ComponentType<React$1.ButtonHTMLAttributes<HTMLButtonElement>>;
  CancelButton: React$1.ComponentType<React$1.ButtonHTMLAttributes<HTMLButtonElement>>;
}
interface SenderProps extends Omit<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'prefix' | 'size'>, VariantProps<typeof senderVariants> {
  value?: string;
  defaultValue?: string;
  loading?: boolean;
  submitType?: 'enter' | 'shiftEnter';
  readOnly?: boolean;
  autoSize?: boolean | {
    minRows?: number;
    maxRows?: number;
  };
  prefix?: React$1.ReactNode | ((info: {
    components: SenderComponents;
  }) => React$1.ReactNode);
  suffix?: React$1.ReactNode | ((info: {
    components: SenderComponents;
  }) => React$1.ReactNode);
  header?: React$1.ReactNode;
  footer?: React$1.ReactNode | ((info: {
    components: SenderComponents;
  }) => React$1.ReactNode);
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  onChange?: (value: string, event?: React$1.ChangeEvent<HTMLTextAreaElement>) => void;
  classNames?: Partial<Record<SenderSemanticType, string>>;
  styles?: Partial<Record<SenderSemanticType, React$1.CSSProperties>>;
}
declare const Sender: React$1.ForwardRefExoticComponent<SenderProps & React$1.RefAttributes<HTMLTextAreaElement>>;
//#endregion
export { Sender, SenderComponents, SenderProps, SenderSemanticType };
//# sourceMappingURL=Sender.d.mts.map