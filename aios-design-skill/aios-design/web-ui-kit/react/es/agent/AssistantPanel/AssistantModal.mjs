import { AssistantPanel } from "./AssistantPanel.mjs";
import { jsx } from "react/jsx-runtime";
//#region src/agent/AssistantPanel/AssistantModal.tsx
/**
* Oreo AssistantModal 的 AIOS 语义入口。
* 行为由 AssistantPanel 统一实现，避免两套浮动助手状态与焦点逻辑分叉。
*/
function AssistantModal(props) {
	return /* @__PURE__ */ jsx(AssistantPanel, {
		"data-slot": "assistant-modal",
		...props
	});
}
AssistantModal.displayName = "AssistantModal";
//#endregion
export { AssistantModal };

//# sourceMappingURL=AssistantModal.mjs.map