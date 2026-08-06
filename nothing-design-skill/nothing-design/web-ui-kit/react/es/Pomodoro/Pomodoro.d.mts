import { pomodoroVariants } from "./pomodoro-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Pomodoro/Pomodoro.d.ts
type PomodoroPhase = 'work' | 'break';
type PomodoroRunState = 'idle' | 'running' | 'paused';
interface PomodoroProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof pomodoroVariants>, 'phase' | 'running'> {
  workMinutes?: number;
  breakMinutes?: number;
  totalSegments?: number;
  updateInterval?: number;
  phase?: PomodoroPhase;
  running?: boolean;
}
declare function Pomodoro({
  className,
  workMinutes,
  breakMinutes,
  totalSegments,
  updateInterval,
  phase: phaseProp,
  running: runningProp,
  style,
  ref,
  ...props
}: PomodoroProps): React$1.JSX.Element;
declare namespace Pomodoro {
  var displayName: string;
}
//#endregion
export { Pomodoro, PomodoroPhase, PomodoroProps, PomodoroRunState };
//# sourceMappingURL=Pomodoro.d.mts.map