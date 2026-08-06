import { welcomeVariants } from "./welcome-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/conversation/Welcome/Welcome.d.ts
type WelcomeSemanticType = 'root' | 'icon' | 'title' | 'description' | 'actions' | 'extra';
interface WelcomeProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof welcomeVariants> {
  title?: React$1.ReactNode;
  description?: React$1.ReactNode;
  icon?: React$1.ReactNode;
  extra?: React$1.ReactNode;
  actions?: React$1.ReactNode;
  classNames?: Partial<Record<WelcomeSemanticType, string>>;
  styles?: Partial<Record<WelcomeSemanticType, React$1.CSSProperties>>;
}
declare const Welcome: React$1.ForwardRefExoticComponent<WelcomeProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { Welcome, WelcomeProps, WelcomeSemanticType };
//# sourceMappingURL=Welcome.d.mts.map