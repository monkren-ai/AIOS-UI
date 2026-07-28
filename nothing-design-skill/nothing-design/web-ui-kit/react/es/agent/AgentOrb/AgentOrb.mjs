import { cn, dataAttr } from "../../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./AgentOrb.css";
//#region src/agent/AgentOrb/AgentOrb.tsx
const agentOrbVariants = cva("nothing-agent-orb", {
	variants: {
		state: {
			idle: "nothing-agent-orb--idle",
			thinking: "nothing-agent-orb--thinking",
			acting: "nothing-agent-orb--acting",
			paused: "nothing-agent-orb--paused",
			error: "nothing-agent-orb--error"
		},
		size: {
			sm: "nothing-agent-orb--sm",
			md: "nothing-agent-orb--md",
			lg: "nothing-agent-orb--lg"
		}
	},
	defaultVariants: {
		state: "idle",
		size: "md"
	}
});
const stateLabels = {
	idle: "[IDLE]",
	thinking: "[THINKING]",
	acting: "[ACTING]",
	paused: "[WAITING]",
	error: "[ERROR]"
};
const ariaLabels = {
	idle: "Agent is idle",
	thinking: "Agent is thinking",
	acting: "Agent is acting",
	paused: "Agent is paused",
	error: "Agent has encountered an error"
};
const AgentOrb = React.forwardRef(({ state = "idle", size = "md", showLabel = false, label, className, ...props }, ref) => {
	const displayLabel = label ?? (showLabel ? stateLabels[state] : void 0);
	const ariaLabel = label ?? ariaLabels[state];
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(agentOrbVariants({
			state,
			size
		}), className),
		"data-slot": "agent-orb",
		"data-state": dataAttr(state),
		"data-size": dataAttr(size),
		role: "status",
		"aria-live": "polite",
		"aria-busy": state === "thinking" || state === "acting" || void 0,
		"aria-label": ariaLabel,
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "nothing-agent-orb__dot",
			"aria-hidden": "true"
		}), displayLabel && /* @__PURE__ */ jsx("span", {
			className: "nothing-agent-orb__label",
			children: displayLabel
		})]
	});
});
AgentOrb.displayName = "AgentOrb";
//#endregion
export { AgentOrb, AgentOrb as default, agentOrbVariants };

//# sourceMappingURL=AgentOrb.mjs.map