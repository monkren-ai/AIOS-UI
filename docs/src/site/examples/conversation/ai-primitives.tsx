import * as React from 'react'
import {
  Attachment,
  AttachmentList,
  BranchPicker,
  ConversationContent,
  ConversationScrollButton,
  ConversationViewport,
  KeywordTag,
  Message,
  MessageActions,
  MessageContent,
  MessageCopyAction,
  Response,
  Source,
  Sources,
} from 'aios-ui-kit/conversation'

export default function ConversationAIPrimitives() {
  const [branch, setBranch] = React.useState(2)

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex flex-col gap-3">
        <h3 className="font-mono text-label uppercase text-foreground-subtle">
          Attachments & context
        </h3>
        <AttachmentList>
          <Attachment label="brief.pdf" type="pdf" />
          <Attachment label="interface.tsx" type="code" loading progress={64} />
          <KeywordTag onRemove={() => undefined}>GPT-5</KeywordTag>
          <KeywordTag>src/conversation</KeywordTag>
        </AttachmentList>
      </section>

      <ConversationViewport className="h-72 rounded-card border border-border-visible bg-surface">
        <ConversationContent>
          <Message role="user" variant="surface">
            <MessageContent>请补齐 AI 组件，并保留旧 API。</MessageContent>
          </Message>
          <Message role="assistant" variant="plain">
            <MessageContent>
              <Response>
                {
                  '已完成 **兼容增量**：\n\n- 新增 Markdown 与来源\n- 保留 `Bubble` / `Sender`\n- Shiki 延迟加载'
                }
              </Response>
            </MessageContent>
            <MessageActions>
              <MessageCopyAction text="已完成兼容增量" />
              <BranchPicker
                current={branch}
                total={3}
                onPrevious={() => setBranch((value) => Math.max(1, value - 1))}
                onNext={() => setBranch((value) => Math.min(3, value + 1))}
              />
            </MessageActions>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </ConversationViewport>

      <Sources defaultOpen>
        <Source
          href="https://github.com/BIAsia/oreo-ui"
          domain="github.com"
          title="BIAsia / oreo-ui"
        />
        <Source href="https://github.com/monkren-ai/AIOS-UI" domain="github.com" title="AIOS UI" />
      </Sources>
    </div>
  )
}
