import * as React$1 from "react";

//#region src/conversation/Attachment/Attachment.d.ts
type AttachmentType = 'image' | 'video' | 'document' | 'text' | 'code' | 'json' | 'audio' | 'link' | 'pdf' | 'unknown';
interface AttachmentProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string;
  type?: AttachmentType;
  src?: string;
  size?: 'sm' | 'md';
  loading?: boolean;
  progress?: number;
  onRemove?: () => void;
  removeLabel?: string;
}
declare function Attachment({
  label,
  type,
  src,
  size,
  loading,
  progress,
  onRemove,
  removeLabel,
  className,
  ref,
  ...props
}: AttachmentProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function AttachmentList({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Attachment, AttachmentList, AttachmentProps, AttachmentType };
//# sourceMappingURL=Attachment.d.mts.map