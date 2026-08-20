import { AicssOrbs, AicssThinkingReasoning, AicssThinkingState } from 'aios-ui-kit/agent'

export default function AicssThinking() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AicssThinkingState />
      <AicssThinkingReasoning status="running" summary="正在核对鉴权中间件">
        <p>定位 jwt.verify 调用，确认算法白名单是否缺失。</p>
        <p>核对签名密钥的加载路径，避免回传到客户端。</p>
      </AicssThinkingReasoning>
      <AicssOrbs status="running" size="sm" />
    </div>
  )
}
