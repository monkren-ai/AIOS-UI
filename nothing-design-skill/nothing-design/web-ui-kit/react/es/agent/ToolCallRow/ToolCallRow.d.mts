import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/ToolCallRow/ToolCallRow.d.ts
type ToolCallStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped';
declare const toolCallRowVariants: (props?: ({
  status?: "running" | "error" | "pending" | "done" | "skipped" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ToolCallRowProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof toolCallRowVariants> {
  tool: string;
  args?: Record<string, unknown>;
  status?: ToolCallStatus;
  elapsedMs?: number;
  result?: string;
  error?: string;
  showArgs?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
}
declare const ToolCallRow: React$1.ForwardRefExoticComponent<ToolCallRowProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ToolCallRow, ToolCallRowProps, ToolCallStatus, toolCallRowVariants };
//# sourceMappingURL=ToolCallRow.d.mts.map