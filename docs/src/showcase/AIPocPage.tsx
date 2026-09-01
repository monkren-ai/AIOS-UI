import * as React from "react";
import { Link } from "react-router-dom";
import { useShowcaseContext } from "./ShowcaseContext";
import { Sender } from "@/conversation/Sender";
import { BubbleList } from "@/conversation/Bubble/BubbleList";
import { ThoughtChain } from "@/conversation/ThoughtChain/ThoughtChain";
import { Prompts } from "@/conversation/Prompts";
import { Welcome } from "@/conversation/Welcome";
import { Conversations } from "@/conversation/Conversations";
import { Attachment, AttachmentList } from "@/conversation/Attachment";
import { BranchPicker } from "@/conversation/BranchPicker";
import { KeywordTag } from "@/conversation/KeywordTag";
import { Sources, Source } from "@/conversation/Sources";
import { Subagent, SubagentList } from "@/agent/Subagent";
import { Terminal, TerminalLine } from "@/agent/Terminal";
import { Button } from "@/Button";
import type { BubbleItemType } from "@/conversation/Bubble/BubbleList";
import type {
  ThoughtChainItem,
  ThoughtChainItemStatus,
} from "@/conversation/ThoughtChain/ThoughtChain";
import type { PromptItem } from "@/conversation/Prompts";
import type { ConversationItem } from "@/conversation/Conversations";

import "./styles/ai-poc.css";

interface Message {
  key: string;
  role: "user" | "ai";
  content: string;
  typing?: boolean | { step?: number; interval?: number };
}

interface Conversation {
  key: string;
  label: string;
  messages: Message[];
  thoughts: ThoughtChainItem[];
  loading: boolean;
}

function createWelcomeMessages(welcomeText: string): Message[] {
  return [
    {
      key: "welcome",
      role: "ai",
      content: welcomeText,
    },
  ];
}

function createInitialThoughtChain(): ThoughtChainItem[] {
  return [
    {
      key: "intent",
      title: "理解意图",
      description: "解析用户输入并识别目标",
      status: "success",
      collapsible: true,
      content: "识别到用户在询问系统能力，准备介绍当前可用的交互方式。",
    },
    {
      key: "retrieve",
      title: "检索上下文",
      description: "从历史记录中提取相关信息",
      status: "success",
      collapsible: true,
      content: "找到 1 条相关历史记录，置信度 0.94。",
    },
    {
      key: "plan",
      title: "生成执行计划",
      description: "制定回复步骤",
      status: "active",
      collapsible: true,
      content: "1. 确认可用组件\n2. 给出使用示例\n3. 提示下一步操作",
    },
    {
      key: "respond",
      title: "组织回复",
      description: "生成最终回复内容",
      status: "pending",
      collapsible: true,
    },
  ];
}

interface TimelineEvent {
  key: string;
  delay: number;
  status: ThoughtChainItemStatus;
}

const thinkingTimeline: TimelineEvent[] = [
  { key: "intent", delay: 0, status: "active" },
  { key: "intent", delay: 400, status: "success" },
  { key: "retrieve", delay: 300, status: "active" },
  { key: "retrieve", delay: 800, status: "success" },
  { key: "plan", delay: 600, status: "active" },
  { key: "plan", delay: 1200, status: "success" },
  { key: "respond", delay: 900, status: "active" },
];

const REPLY_DELAY = 1800;

function generateReply(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "收到一条空消息。";
  if (trimmed.length < 6)
    return `你发送了："${trimmed}"。可以多说一点，我会继续思考。`;
  return `收到你的消息："${trimmed}"。\n\n当前 PoC 已扩展 Prompts、Conversations、Welcome 等组件，与 Sender、BubbleList、ThoughtChain 形成更完整的 AI 组件矩阵。`;
}

/**
 * AI 组件 PoC 页面。
 *
 * 集成 Sender、BubbleList、ThoughtChain、Prompts、Welcome、Conversations，
 * 模拟多会话、提示词填充、空态欢迎等完整对话式 AI 交互流程。
 */
export function AIPocPage() {
  const { t, toggleLang, lang } = useShowcaseContext();
  const timersRef = React.useRef<number[]>([]);
  const cancelledRef = React.useRef(false);

  const initialConversations: Conversation[] = React.useMemo(
    () => [
      {
        key: "default",
        label: t("默认会话", "Default"),
        messages: createWelcomeMessages(
          t(
            "你好，我是 AIOS AI。试试在下方输入框发送消息，或点击推荐提示词开始对话。",
            "Hello, I am AIOS AI. Send a message below or click a suggested prompt to start.",
          ),
        ),
        thoughts: createInitialThoughtChain(),
        loading: false,
      },
      {
        key: "empty",
        label: t("新会话", "New Chat"),
        messages: [],
        thoughts: createInitialThoughtChain().map((item) => ({
          ...item,
          status: "pending" as const,
        })),
        loading: false,
      },
    ],
    [t],
  );

  const [conversations, setConversations] =
    React.useState<Conversation[]>(initialConversations);
  const [activeKey, setActiveKey] = React.useState("default");
  const [draft, setDraft] = React.useState("");
  const [branch, setBranch] = React.useState(1);

  const activeConversation = React.useMemo(
    () => conversations.find((c) => c.key === activeKey) ?? conversations[0],
    [conversations, activeKey],
  );

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  React.useEffect(() => {
    return () => {
      cancelledRef.current = true;
      clearTimers();
    };
  }, [clearTimers]);

  const updateActiveConversation = React.useCallback(
    (updater: (conversation: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.key === activeKey ? updater(conversation) : conversation,
        ),
      );
    },
    [activeKey],
  );

  const updateThoughtStatus = React.useCallback(
    (key: string, status: ThoughtChainItem["status"]) => {
      updateActiveConversation((conversation) => ({
        ...conversation,
        thoughts: conversation.thoughts.map((item) =>
          item.key === key ? { ...item, status } : item,
        ),
      }));
    },
    [updateActiveConversation],
  );

  const bubbleItems: BubbleItemType[] = React.useMemo(
    () =>
      activeConversation.messages.map((msg) => ({
        key: msg.key,
        role: msg.role,
        content: msg.content,
        typing: msg.typing,
        header: msg.role === "ai" ? "AIOS AI" : "YOU",
      })),
    [activeConversation.messages],
  );

  const roleConfig = React.useMemo(
    () => ({
      ai: {
        placement: "start" as const,
        variant: "outlined" as const,
        shape: "corner" as const,
        avatar: "AI",
      },
      user: {
        placement: "end" as const,
        variant: "filled" as const,
        shape: "corner" as const,
        avatar: "ME",
      },
    }),
    [],
  );

  const handleSubmit = React.useCallback(
    (value: string) => {
      cancelledRef.current = false;
      const userMessage: Message = {
        key: `user-${Date.now()}`,
        role: "user",
        content: value,
      };

      updateActiveConversation((conversation) => ({
        ...conversation,
        messages: [...conversation.messages, userMessage],
        loading: true,
      }));
      setDraft("");
      clearTimers();

      thinkingTimeline.forEach(({ key, delay, status }) => {
        timersRef.current.push(
          window.setTimeout(() => {
            if (cancelledRef.current) return;
            updateThoughtStatus(key, status);
          }, delay),
        );
      });

      timersRef.current.push(
        window.setTimeout(() => {
          if (cancelledRef.current) return;
          const reply: Message = {
            key: `ai-${Date.now()}`,
            role: "ai",
            content: generateReply(value),
            typing: { step: 2, interval: 24 },
          };
          updateActiveConversation((conversation) => ({
            ...conversation,
            messages: [...conversation.messages, reply],
            loading: false,
          }));
          updateThoughtStatus("respond", "success");
          clearTimers();
        }, REPLY_DELAY),
      );
    },
    [clearTimers, updateActiveConversation, updateThoughtStatus],
  );

  const handleCancel = React.useCallback(() => {
    cancelledRef.current = true;
    clearTimers();
    updateActiveConversation((conversation) => ({
      ...conversation,
      loading: false,
    }));
    updateThoughtStatus("respond", "error");
  }, [clearTimers, updateActiveConversation, updateThoughtStatus]);

  const handleReset = React.useCallback(() => {
    cancelledRef.current = true;
    clearTimers();
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.key === activeKey
          ? {
              ...conversation,
              messages: createWelcomeMessages(
                t(
                  "对话已重置。试试在下方输入框发送消息，或点击推荐提示词开始对话。",
                  "Conversation reset. Send a message below or click a suggested prompt.",
                ),
              ),
              thoughts: createInitialThoughtChain().map((item) =>
                item.key === "intent" || item.key === "retrieve"
                  ? { ...item, status: "success" as const }
                  : item.key === "plan"
                    ? { ...item, status: "active" as const }
                    : { ...item, status: "pending" as const },
              ),
              loading: false,
            }
          : conversation,
      ),
    );
    setDraft("");
  }, [activeKey, clearTimers, t]);

  const handlePromptClick = React.useCallback((item: PromptItem) => {
    setDraft(String(item.title ?? ""));
  }, []);

  const promptTemplates: PromptItem[] = React.useMemo(
    () => [
      {
        key: "intro",
        title: t("介绍一下 AIOS UI", "Introduce AIOS UI"),
        description: t("了解设计系统与组件库", "Learn about the design system"),
      },
      {
        key: "components",
        title: t("演示 AI 组件", "Show AI components"),
        description: t(
          "查看 Prompts、Conversations、Welcome",
          "See Prompts, Conversations, Welcome",
        ),
      },
      {
        key: "code",
        title: t("写一段代码示例", "Write a code example"),
        description: t(
          "生成可运行的 React 代码",
          "Generate runnable React code",
        ),
      },
      {
        key: "design",
        title: t("解释设计系统", "Explain the design system"),
        description: t(
          "了解令牌、颜色与布局原则",
          "Learn about tokens, colors, and layout",
        ),
      },
    ],
    [t],
  );

  const conversationItems: ConversationItem[] = React.useMemo(
    () =>
      conversations.map((conversation) => ({
        key: conversation.key,
        label: conversation.label,
        meta: `${conversation.messages.length} ${t("条消息", "messages")}`,
      })),
    [conversations, t],
  );

  const isEmpty = activeConversation.messages.length === 0;

  return (
    <main className="ai-poc-page">
      <header className="ai-poc-header">
        <div className="ai-poc-header__left">
          <Link className="ai-poc-back" to="/">
            <span aria-hidden="true">← </span>
            {t("返回展示页", "Back to Showcase")}
          </Link>
          <h1 className="ai-poc-title">
            {t("AI 对话 PoC", "AI Conversation PoC")}
          </h1>
          <p className="ai-poc-subtitle">
            {t(
              "基于 AIOS UI 独立设计系统的对话式 AI 组件演示",
              "Conversational AI components powered by the AIOS UI design system",
            )}
          </p>
        </div>
        <div className="ai-poc-header__actions">
          <Button variant="secondary" size="sm" onClick={toggleLang}>
            {lang === "zh" ? "EN" : "ZH"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            {t("重置当前会话", "Reset Current")}
          </Button>
        </div>
      </header>

      <div className="ai-poc-layout ai-poc-layout--three-col">
        <nav
          className="ai-poc-conversations"
          aria-label={t("会话列表", "Conversations")}
        >
          <Conversations
            items={conversationItems}
            activeKey={activeKey}
            onActiveChange={setActiveKey}
            header={t("会话", "CHATS")}
            variant="bordered"
            size="sm"
          />
        </nav>

        <section className="ai-poc-chat" aria-label={t("对话", "Conversation")}>
          <div className="ai-poc-chat__scroll">
            {isEmpty ? (
              <Welcome
                variant="centered"
                title={t("AIOS AI", "AIOS AI")}
                description={t(
                  "选择一个推荐提示词开始对话，或在下方输入框直接输入消息。",
                  "Pick a suggested prompt to start, or type a message below.",
                )}
                icon="◉"
                actions={
                  <Prompts
                    title={t("你可以这样问我", "You can ask me like this")}
                    items={promptTemplates}
                    layout="grid"
                    onItemClick={handlePromptClick}
                  />
                }
                extra={t(
                  "切换左侧会话可体验多会话管理。",
                  "Switch conversations on the left.",
                )}
              />
            ) : (
              <BubbleList
                items={bubbleItems}
                role={roleConfig}
                autoScroll
                className="ai-poc-bubble-list"
              />
            )}
          </div>

          <div className="ai-poc-input">
            <Sender
              value={draft}
              loading={activeConversation.loading}
              submitType="enter"
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder={t(
                "输入消息，按 Enter 发送…",
                "Type a message and press Enter…",
              )}
              onChange={setDraft}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              attachments={
                <AttachmentList>
                  <Attachment label="context.md" type="text" size="sm" />
                </AttachmentList>
              }
              tags={<KeywordTag kind="model">AIOS-1</KeywordTag>}
              modelSelect={
                <span className="font-mono text-caption text-foreground-muted">
                  AUTO
                </span>
              }
              suffix={({ components: { SendButton, CancelButton } }) => (
                <div className="ai-poc-sender-actions">
                  {activeConversation.loading ? (
                    <CancelButton>{t("停止", "Stop")}</CancelButton>
                  ) : (
                    <SendButton>{t("发送", "Send")}</SendButton>
                  )}
                </div>
              )}
            />
          </div>
        </section>

        <aside
          className="ai-poc-thoughts"
          aria-label={t("思维链", "Thought Chain")}
        >
          <h2 className="ai-poc-thoughts__title">
            {t("思考过程", "THINKING")}
          </h2>
          <ThoughtChain
            items={activeConversation.thoughts}
            defaultExpandedKeys={["intent", "plan"]}
          />
          <BranchPicker
            current={branch}
            total={3}
            onPrevious={() => setBranch((value) => Math.max(1, value - 1))}
            onNext={() => setBranch((value) => Math.min(3, value + 1))}
          />
          <SubagentList>
            <Subagent
              name={t("检索资料", "Research")}
              status={activeConversation.loading ? "running" : "done"}
              progress={activeConversation.loading ? 62 : 100}
            />
          </SubagentList>
          <Terminal
            command="aios inspect --thread"
            running={activeConversation.loading}
          >
            <TerminalLine>
              {t("读取会话上下文", "Reading conversation context")}
            </TerminalLine>
          </Terminal>
          <Sources defaultOpen>
            <Source
              domain="github.com"
              title="AIOS UI"
              href="https://github.com/monkren-ai/AIOS-UI"
            />
          </Sources>
        </aside>
      </div>
    </main>
  );
}

export default AIPocPage;
