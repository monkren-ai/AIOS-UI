import * as React$1 from "react";

//#region src/conversation/ThreadList/ThreadList.d.ts
declare function ThreadList({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLElement> & {
  ref?: React$1.Ref<HTMLElement>;
}): React$1.JSX.Element;
declare function ThreadListSection({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function ThreadListNew({
  children,
  className,
  ref,
  ...props
}: React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React$1.Ref<HTMLButtonElement>;
}): React$1.JSX.Element;
interface ThreadListItemProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React$1.ReactNode;
  meta?: React$1.ReactNode;
  active?: boolean;
  unread?: boolean;
  actions?: React$1.ReactNode;
  onSelect?: () => void;
}
declare function ThreadListItem({
  title,
  meta,
  active,
  unread,
  actions,
  onSelect,
  className,
  ref,
  ...props
}: ThreadListItemProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function ThreadListItemAction({
  className,
  ref,
  onClick,
  ...props
}: React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React$1.Ref<HTMLButtonElement>;
}): React$1.JSX.Element;
//#endregion
export { ThreadList, ThreadListItem, ThreadListItemAction, ThreadListItemProps, ThreadListNew, ThreadListSection };
//# sourceMappingURL=ThreadList.d.mts.map