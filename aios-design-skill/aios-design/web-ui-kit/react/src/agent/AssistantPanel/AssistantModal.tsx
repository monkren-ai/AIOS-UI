import type { AssistantPanelProps } from './AssistantPanel'
import { AssistantPanel } from './AssistantPanel'

export type AssistantModalProps = AssistantPanelProps

/**
 * Oreo AssistantModal 的 AIOS 语义入口。
 * 行为由 AssistantPanel 统一实现，避免两套浮动助手状态与焦点逻辑分叉。
 */
export function AssistantModal(props: AssistantModalProps) {
  return <AssistantPanel data-slot="assistant-modal" {...props} />
}

AssistantModal.displayName = 'AssistantModal'
