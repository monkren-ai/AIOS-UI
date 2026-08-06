# ADR-001：参考 Ant Design X 升级 AIOS UI

## 状态

Accepted

## 背景

用户提出「全方位参考 `https://github.com/ant-design/x` 对本地 AIOS UI 项目升级」。Ant Design X 是蚂蚁推出的面向 AI 界面的 React 组件库，提供 `Bubble`、`Sender`、`ThoughtChain`、`Prompts` 等对话式 AI 组件，以及 `XProvider`、`classNames/styles` 语义化 API 等工程实践。

AIOS UI 当前是一个独立设计系统的 React 组件库，基于：

- React 19 + TypeScript 6
- `@base-ui/react` 提供底层交互 primitive
- `class-variance-authority` 管理变体
- 纯 CSS + CSS Variables 样式方案
- 无 Ant Design 依赖

## 决策

### 1. 不引入 Ant Design 作为依赖

AIOS UI 的定位是独立设计系统。本次升级只借鉴 Ant Design X 的组件形态、API 设计、工程实践，不引入 `antd`、`@ant-design/cssinjs` 等依赖，保持包体积与独立性。

### 2. 保持 Nothing 设计语言

所有新增组件必须遵循现有 `tokens.css` 设计令牌：

- 黑白高对比、monochrome + red event 配色
- 无阴影、无 blur、无渐变
- Doto / Space Grotesk / Space Mono 字体栈
- 点阵、边框、1px 像素风格

### 3. PoC 先行

由于用户偏好 proof of concept，第一阶段仅实现 3 个代表性 AI 组件（`Sender`、`Bubble`、`ThoughtChain`）的最小可用版本，验证 API 与视觉后再批量复制。

### 4. 语义化 API 统一

所有新增/重构组件统一支持 `classNames` / `styles` 语义化结构，并扩展 `ConfigProvider` 以支持全局组件配置。

### 5. Skill 与 UI Kit 同步

新增组件必须同步更新 `aios-design-skill` 中的 `SKILL.md`、`design.md` 与 `references/ai-components.md`。

## 影响

- 新增 `src/conversation/` 模块，承载 AI 对话组件。
- `src/lib/utils.ts` 新增语义化 props 合并工具。
- `src/ConfigProvider` 扩展 `components` 全局配置能力。
- Showcase 站点新增 AI 相关演示页面。
- 不破坏现有组件 API（向后兼容）。

## 基线

- `npm run type-check`：通过
- `npm run test`：135 tests passed
- `npm run lint`：通过
- `npm run build`：成功，253 files, 1.11 MB

## 参考

- Ant Design X: https://github.com/ant-design/x
- Ant Design X 文档: https://x.ant.design
