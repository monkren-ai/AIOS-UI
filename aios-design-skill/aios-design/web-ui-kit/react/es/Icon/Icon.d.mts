import { IconSize } from "./icon-variants.mjs";
import * as React$1 from "react";

//#region src/Icon/Icon.d.ts
type IconGlyph = React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
interface IconProps extends Omit<React$1.SVGProps<SVGSVGElement>, 'children'> {
  /** 任意遵循 SVG props 的图标组件，例如 @tabler/icons-react。 */
  glyph: IconGlyph;
  size?: IconSize;
  /** 有语义的图标提供 label；省略时图标对辅助技术隐藏。 */
  label?: string;
}
declare function Icon({
  glyph: Glyph,
  size,
  label,
  className,
  ...props
}: IconProps): React$1.JSX.Element;
declare namespace Icon {
  var displayName: string;
}
//#endregion
export { Icon, IconGlyph, IconProps };
//# sourceMappingURL=Icon.d.mts.map