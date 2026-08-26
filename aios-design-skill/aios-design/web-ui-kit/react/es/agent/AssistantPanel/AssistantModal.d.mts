import { AssistantPanelProps } from "./AssistantPanel.mjs";

//#region src/agent/AssistantPanel/AssistantModal.d.ts
type AssistantModalProps = AssistantPanelProps;
/**
 * Oreo AssistantModal 的 AIOS 语义入口。
 * 行为由 AssistantPanel 统一实现，避免两套浮动助手状态与焦点逻辑分叉。
 */
declare function AssistantModal(props: AssistantModalProps): import("react").JSX.Element;
declare namespace AssistantModal {
  var displayName: string;
}
//#endregion
export { AssistantModal, AssistantModalProps };
//# sourceMappingURL=AssistantModal.d.mts.map