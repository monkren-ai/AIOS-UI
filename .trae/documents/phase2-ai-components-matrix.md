# Nothing UI — 阶段 2：扩展 AI 组件矩阵

## Context

阶段 1 已落地 Sender、Bubble/BubbleList、ThoughtChain 三个核心 AI 组件，并通过 `/ai-poc` 页面验证了它们与 Nothing 独立设计系统的联动效果。阶段 2 在此基础上继续参考 `https://github.com/ant-design/x` 的组件形态，但保持不引入 Ant Design 依赖，新增 3 个代表性 AI 组件：**Prompts**、**Conversations**、**Welcome**，并将它们集成到 `/ai-poc` 演示页面，形成更完整的对话式 AI 组件矩阵。

## Scope

本次只新增 3 个组件及其集成，不实现 Ant Design X 全矩阵。

| 组件 | 职责 | 与现有组件的关系 |
|---|---|---|
| **Prompts** | 提示词模板网格/列表，点击后填充 Sender | 与 Sender 联动 |
| **Conversations** | 会话侧边栏，支持激活态、悬停态、切换 | 作为 `/ai-poc` 的会话导航 |
| **Welcome** | 空会话欢迎页，含标题、描述、建议操作区 | 与 Prompts 组合作为空态 fallback |

## Design Principles

- 沿用 Phase 1 的语义化 `classNames` / `styles` API、`data-slot` 约定、CVA 变体文件拆分。
- 仅使用现有黑白高对比色板 + `--accent` 红色，禁止新增阴影、blur、渐变。
- 所有新增 UI 文本通过 `t(zh, en)` 提供中英双语。
- 每个语义节点必须带 `data-slot`。
- 复用 `cn`、`dataAttr`、`mergeSemanticProps`、现有 `Button` 等工具与组件。

## File Changes

### 新增组件目录

```text
nothing-design-skill/nothing-design/web-ui-kit/react/src/conversation/
├── Prompts/
│   ├── Prompts.tsx
│   ├── prompts-variants.ts
│   ├── Prompts.css
│   ├── Prompts.test.tsx
│   └── index.ts
├── Conversations/
│   ├── Conversations.tsx
│   ├── conversations-variants.ts
│   ├── Conversations.css
│   ├── Conversations.test.tsx
│   └── index.ts
└── Welcome/
    ├── Welcome.tsx
    ├── welcome-variants.ts
    ├── Welcome.css
    ├── Welcome.test.tsx
    └── index.ts
```

### 修改文件

- `src/conversation/index.ts`：新增 Prompts、Conversations、Welcome 的导出。
- `src/index.ts`：通过 `pnpm sync:exports` 自动重新生成 barrel 导出。
- `src/showcase/AIPocPage.tsx`：引入会话状态、三栏布局、Prompts → Sender 联动。
- `src/showcase/styles/ai-poc.css`：新增 Conversations、Welcome、Prompts 在演示页中的布局与响应式样式。
- `src/showcase/AIPocPage.test.tsx`：补充会话切换、空态、Prompts 填充等测试。

## API Overview

### Prompts

```ts
export type PromptsSemanticType =
  | 'root' | 'title' | 'list' | 'item' | 'itemIcon' | 'itemTitle' | 'itemDescription'

export interface PromptItem {
  key: string
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export interface PromptsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof promptsVariants> {
  items: PromptItem[]
  title?: React.ReactNode
  layout?: 'grid' | 'list' | 'wrap'
  onItemClick?: (item: PromptItem, index: number) => void
  classNames?: Partial<Record<PromptsSemanticType, string>>
  styles?: Partial<Record<PromptsSemanticType, React.CSSProperties>>
}
```

- 每项渲染为 `<button>`，支持键盘 Enter/Space 触发。
- `disabled` 项设置 `disabled` 并跳过 `onItemClick`。

### Conversations

```ts
export type ConversationsSemanticType =
  | 'root' | 'header' | 'list' | 'item' | 'itemIcon' | 'itemLabel' | 'itemMeta' | 'itemActions' | 'footer'

export interface ConversationItem {
  key: string
  icon?: React.ReactNode
  label: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode | ((item: ConversationItem) => React.ReactNode)
  disabled?: boolean
}

export interface ConversationsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof conversationsVariants> {
  items: ConversationItem[]
  activeKey?: string
  defaultActiveKey?: string
  onActiveChange?: (key: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  classNames?: Partial<Record<ConversationsSemanticType, string>>
  styles?: Partial<Record<ConversationsSemanticType, React.CSSProperties>>
}
```

- 支持受控/非受控 `activeKey`。
- 当前项使用 `aria-current="true"`。

### Welcome

```ts
export type WelcomeSemanticType =
  | 'root' | 'icon' | 'title' | 'description' | 'actions' | 'extra'

export interface WelcomeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof welcomeVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  actions?: React.ReactNode
  classNames?: Partial<Record<WelcomeSemanticType, string>>
  styles?: Partial<Record<WelcomeSemanticType, React.CSSProperties>>
}
```

- `variant="centered"` 使整体居中对齐。
- `actions` 在 `/ai-poc` 中传入 `<Prompts />`。

## /ai-poc Integration

### Layout

桌面端改为三栏布局：

```text
+------------------+------------------------+------------------+
| Conversations    | Chat / Welcome         | ThoughtChain     |
| (260px)          | (1fr)                  | (320px)          |
+------------------+------------------------+------------------+
```

响应式：
- `< 1024px`：Conversations 折叠为顶部可切换面板。
- `< 960px`：ThoughtChain 下移到聊天区下方。
- `< 640px`：三栏垂直堆叠。

### State Changes

- 引入 `Conversation` 模型，包含 `key`、`label`、`messages`、`thoughts`。
- 默认提供「默认会话」和「新会话」。
- `activeKey` 切换时，中间区域显示对应会话的消息或 Welcome 空态。
- Sender 改为受控，Prompts 点击时填充 `draft`。

### Interaction Flow

1. 空会话显示 `Welcome` + `Prompts`。
2. 点击 `Prompts` 项填充 Sender。
3. 发送消息后，`Welcome` 隐藏，`BubbleList` 出现。
4. 切换 `Conversations` 会话，消息与思维链状态正确切换。
5. 保留原有的发送/取消/重置逻辑。

## Implementation Order

1. **Prompts**：先实现，可被 Welcome 和 AIPocPage 复用。
2. **Welcome**：依赖 Prompts 作为 actions 内容，但组件本身解耦。
3. **Conversations**：独立实现，最后接入 AIPocPage 状态。
4. **AIPocPage 改造**：引入会话状态、三栏布局、Prompts → Sender 联动。
5. **导出与验证**：更新 `src/conversation/index.ts`，运行 `pnpm sync:exports`，执行类型检查、lint、测试、构建。

## Testing Strategy

### Prompts Tests

- 渲染根节点 `data-slot="prompts"`。
- 渲染标题、图标、描述。
- 点击 item 调用 `onItemClick(item, index)`。
- `Enter` / `Space` 触发 item 点击。
- `disabled` item 不可点击。
- `classNames` / `styles` 正确作用于对应 slot。
- 不同 `layout` / `variant` 生成对应 className。

### Conversations Tests

- 渲染根节点 `data-slot="conversations"`。
- 渲染 `header`、`footer`。
- 默认激活 `defaultActiveKey`。
- 点击 item 切换激活态并调用 `onActiveChange`。
- 受控 `activeKey` 模式下不维护内部状态。
- `disabled` item 不可激活。

### Welcome Tests

- 渲染 `data-slot="welcome"`。
- 渲染 `title`、`description`、`icon`、`actions`、`extra`。
- `variant="centered"` 应用对应 className。
- 语义 `classNames` / `styles` 正确生效。

### AIPocPage Tests

- 切换 `Conversations` 后，当前会话标题与消息列表更新。
- 空会话显示 `Welcome` 与 `Prompts`。
- 点击 `Prompts` 项后，Sender 输入框被填充。
- 发送消息后，`Welcome` 消失，`BubbleList` 出现。
- 原有「发送/取消/重置」测试继续通过。

## Verification Steps

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react

# 1. 类型检查
pnpm type-check

# 2. 代码风格
pnpm lint

# 3. 单元测试
pnpm test --run

# 4. 导出同步
pnpm sync:exports

# 5. 组件库构建
pnpm build

# 6. 展示站点构建
pnpm build:showcase
```

浏览器验证清单：

- [ ] 访问 `/ai-poc`，页面正常加载。
- [ ] 暗色/亮色主题切换无样式异常。
- [ ] 中英文切换后新组件文本同步更新。
- [ ] 空会话显示 `Welcome` + `Prompts`。
- [ ] 点击 `Prompts` 项填充 Sender。
- [ ] 发送消息后 `Welcome` 隐藏，`BubbleList` 出现。
- [ ] 切换 `Conversations` 会话，消息与思维链状态正确切换。
- [ ] 键盘可聚焦 `Prompts` / `Conversations` 项并按 `Enter` 触发。
- [ ] 响应式布局在 1024px / 960px / 640px 断点正常。
