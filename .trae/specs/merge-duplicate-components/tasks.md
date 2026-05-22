# Tasks

- [x] Task 1: 清理 WidgetIcons.tsx deprecated 别名，App.tsx 改用新名称
  - [x] 1.1: 在 App.tsx 中将 deprecated 别名替换为推荐名称（Home1→HomeLight, DarkMode1→DarkModeLight, DoNotDisturb1→DoNotDisturbLight, QrCode1→QrCodeLight, Subtitle1→SubtitleLight, Record1→RecordAlt, Cast1→CastAlt, ArrowDown→ArrowDownAlt）
  - [x] 1.2: 更新 App.tsx import 语句使用新名称
  - [x] 1.3: 从 WidgetIcons.tsx 中移除 deprecated 别名导出和 WidgetIconList 中的旧名称引用
  - [x] 1.4: 验证 TypeScript 编译通过

- [x] Task 2: 合并 WidgetIcon 到 SvgIcon
  - [x] 2.1: 为 SvgIcon 添加 `label` prop，当提供时渲染标签文字（复用 nothing-widget-icon__label 样式）
  - [x] 2.2: 更新 SvgIcon 的 CSS（svg-icon.css），添加 label 相关样式
  - [x] 2.3: 在 App.tsx 中将 `<WidgetIcon>` 替换为 `<SvgIcon label={...}>`
  - [x] 2.4: 删除 `src/components/widgets/WidgetIcon.tsx`
  - [x] 2.5: 删除 `src/styles/widget-icon.css`（样式已合并到 svg-icon.css）
  - [x] 2.6: 从 App.tsx 移除 WidgetIcon 导入和 widget-icon.css 导入
  - [x] 2.7: 验证 TypeScript 编译通过

- [x] Task 3: 合并 Cards 和 WidgetCard 为统一 Card 组件
  - [x] 3.1: 创建新的 `src/components/Card.tsx`，合并 Cards.tsx 和 WidgetCard.tsx 的功能，支持 `mode: 'content' | 'widget'`
  - [x] 3.2: 创建新的 `src/styles/card.css`，合并 cards.css 和 widget-card.css 的样式
  - [x] 3.3: 在 App.tsx 中更新 Card 和 WidgetCard 的导入和使用
  - [x] 3.4: 删除 `src/components/Cards.tsx` 和 `src/components/WidgetCard.tsx`
  - [x] 3.5: 删除 `src/styles/cards.css` 和 `src/styles/widget-card.css`
  - [x] 3.6: 更新 App.tsx 的 CSS 导入
  - [x] 3.7: 验证 TypeScript 编译通过

- [x] Task 4: 最终验证
  - [x] 4.1: 运行 `npx tsc --noEmit` 确认编译通过
  - [x] 4.2: 启动开发服务器确认页面正常渲染

# Task Dependencies
- Task 2 依赖 Task 1（先清理别名再合并组件，避免冲突）
- Task 3 独立于 Task 1 和 Task 2
- Task 4 依赖 Task 1、2、3 全部完成
