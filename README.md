# AIOS UI · Design Skill

AIOS UI 是一个包含 AI 界面设计 Skill、React 组件库和文档站点的 monorepo。Skill 当前版本为 `4.0.0`，将 AIOS UI 的视觉规则、设计令牌、组件模式和跨平台实现建议整理成可复用的设计工作流。

## Skill 能力

在 Claude Code 中显式使用 `/aios-design`、`AIOS style` 或 `AIOS design` 后，Skill 可以：

- 按照单色、排版驱动的工业美学设计 AI 产品界面
- 在开始设计前声明 Google Fonts，并选择深色或浅色模式
- 使用三层视觉层级、间距、颜色、表面和无阴影等设计规则
- 参考按钮、卡片、列表、表格、弹层和数据可视化等组件模式
- 将设计规则映射为 HTML/CSS、React/Tailwind 或 SwiftUI 实现
- 对现有项目执行扫描、技术栈识别、组件匹配和设计迁移

Skill 不会自动响应泛化的 UI 或设计请求；需要明确提出 AIOS 风格或迁移/应用 AIOS 设计。

## 安装 Skill

将 [`aios-design`](./aios-design-skill/aios-design) 目录复制到 Claude Code 的 Skills 目录：

```bash
cp -r aios-design-skill/aios-design ~/.claude/skills/
```

安装后，在 Claude Code 中使用 `/aios-design`，或直接提出“使用 AIOS 风格设计”，即可调用该能力。

Skill 的完整说明见 [`SKILL.md`](./aios-design-skill/aios-design/SKILL.md)，设计令牌和组件规则见 [`references/`](./aios-design-skill/aios-design/references)。

## 配套 UI 组件库

仓库同时提供 `aios-ui-kit` React 组件库（React 19、Tailwind CSS v4、CVA）和文档站点，用于将 Skill 中的设计规则落地为可复用代码。组件库当前版本为 `3.0.0`，新增全局主题家族和浏览器本地 DTCG 主题导入。

```bash
npm install aios-ui-kit motion
```

## Links

- [GitHub](https://github.com/monkren-ai/AIOS-UI)
- [Documentation](https://monkren-ai.github.io/AIOS-UI/)

## Development

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run build       # 构建组件库和文档站点
npm run build:docs  # 仅构建文档站点
npm run test        # 运行组件库测试
npm run lint        # 检查组件库代码
```

## Workspace

- `aios-design-skill/aios-design/web-ui-kit/react`：React 组件库
- `docs`：文档站点
- `scripts`：项目辅助脚本
