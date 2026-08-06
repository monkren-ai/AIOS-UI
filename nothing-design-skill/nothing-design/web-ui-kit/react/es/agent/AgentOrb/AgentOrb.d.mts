import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/AgentOrb/AgentOrb.d.ts
type AgentState = 'idle' | 'thinking' | 'acting' | 'paused' | 'error';
declare const agentOrbVariants: (props?: ({
  state?: "idle" | "paused" | "error" | "thinking" | "acting" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface AgentOrbProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof agentOrbVariants> {
  state?: AgentState;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}
declare const AgentOrb: React$1.ForwardRefExoticComponent<AgentOrbProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { AgentOrb, AgentOrbProps, AgentState, agentOrbVariants };
//# sourceMappingURL=AgentOrb.d.mts.map