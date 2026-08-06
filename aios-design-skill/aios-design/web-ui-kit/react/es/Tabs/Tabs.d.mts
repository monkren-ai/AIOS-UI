import { TabsIndicator, TabsVariant, tabTriggerVariants, tabsHoverBackgroundVariants, tabsIndicatorVariants, tabsListVariants, tabsPanelVariants, tabsVariants } from "./tabs-variants.mjs";
import * as React$1 from "react";

//#region src/Tabs/Tabs.d.ts
interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}
interface TabPanelProps {
  value: string;
  children: React$1.ReactNode;
}
interface TabsProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'value' | 'defaultValue'> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 视觉形态。 */
  variant?: TabsVariant;
  /** 选中态的表达方式。 */
  indicator?: TabsIndicator;
  /**
   * 是否启用 proximity hover 背景预览。
   * @default true
   */
  enableProximityHover?: boolean;
}
declare const TabPanel: React$1.FC<TabPanelProps>;
declare function Tabs({
  className,
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant,
  indicator,
  enableProximityHover,
  children,
  ...props
}: TabsProps): React$1.JSX.Element;
declare namespace Tabs {
  var displayName: string;
}
//#endregion
export { TabItem, TabPanel, TabPanelProps, Tabs, TabsProps };
//# sourceMappingURL=Tabs.d.mts.map