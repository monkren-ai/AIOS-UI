# 补充 Figma Nothing Widgets 2.0 组件 Spec

## Why
Figma 社区文件 "Nothing Widgets 2.0" 包含 10 个创意小部件设计概念，当前 web-ui-kit 仅覆盖了其中部分功能（Clock 覆盖了基础时钟，SystemMonitor 部分覆盖了系统信息），其余 8 个独特小部件尚未实现。补充这些组件可以大幅丰富 UI Kit 的表现力和实用性。

## What Changes
- 新增 8 个小部件组件（Vanilla JS + React 双版本）
- 更新演示页面和文档

### Figma "Nothing Widgets 2.0" 完整组件列表 vs 现有覆盖情况

| # | Figma 组件 | 描述 | 现有覆盖 | 需要新增 |
|---|-----------|------|---------|---------|
| 1 | **Caffeinate Widget** | 咖啡因摄入追踪器：记录咖啡饮用量，显示咖啡因水平随时间衰减曲线 | ❌ 无 | ✅ |
| 2 | **Clipboard Widget** | 剪贴板管理器：显示最近复制的文本条目，支持快速粘贴 | ❌ 无 | ✅ |
| 3 | **Pomodoro Widget** | 番茄钟计时器：工作/休息循环，分段进度条显示剩余时间 | ❌ 无 | ✅ |
| 4 | **Walkie-Talkie Widget** | 对讲机风格：Push-to-talk 语音交互（Web 端适配为录音按钮） | ❌ 无 | ✅ |
| 5 | **Sun-Dial Widget** | 日晷/日出日落追踪器：弧形可视化显示日照时段，当前太阳位置 | ❌ 无 | ✅ |
| 6 | **Age in Motion** | 年龄/生命进度可视化：以分段条或环形图展示已度过的时间比例 | ❌ 无 | ✅ |
| 7 | **Chrono Widget** | 秒表/计时器：开始/暂停/重置，圈数记录（Lap） | ⚠️ Clock 部分覆盖 | ✅ 独立组件 |
| 8 | **Sys Info Widget** | 系统信息面板：CPU/RAM/存储/网络/电池综合信息 | ⚠️ SystemMonitor 部分覆盖 | ✅ 扩展组件 |
| 9 | **Spinner Widget** | 决策转盘：可旋转的选择轮盘，随机选中一个选项 | ❌ 无 | ✅ |
| 10 | **World Clock** | 世界时钟：同时显示多个时区的时间 | ⚠️ Clock 部分覆盖 | ✅ 独立组件 |

## Impact
- Affected specs: web-ui-kit 组件库
- Affected code: `web-ui-kit/css/`, `web-ui-kit/js/`, `web-ui-kit/react/src/`, `web-ui-kit/vanilla/index.html`, `web-ui-kit/react/src/App.tsx`, `web-ui-kit/README.md`, `SKILL.md`

## ADDED Requirements

### Requirement: Caffeinate Widget
系统应提供咖啡因追踪组件，显示当前咖啡因水平（mg），支持添加饮品记录，以分段进度条或衰减曲线展示咖啡因水平。

#### Scenario: 添加咖啡记录
- **WHEN** 用户点击添加按钮选择饮品类型
- **THEN** 咖啡因水平增加，进度条更新，显示预计衰减到阈值的时间

#### Scenario: 咖啡因衰减
- **WHEN** 时间流逝
- **THEN** 咖啡因水平按半衰期公式自动衰减，进度条缩短

### Requirement: Clipboard Widget
系统应提供剪贴板管理组件，显示最近复制的文本条目列表，支持点击复制和删除。

#### Scenario: 显示剪贴板条目
- **WHEN** 组件加载
- **THEN** 显示最近 N 条剪贴板记录，每条显示截断文本和时间戳

#### Scenario: 点击复制
- **WHEN** 用户点击某条记录
- **THEN** 该文本被复制到剪贴板，显示 `[COPIED]` 状态

### Requirement: Pomodoro Widget
系统应提供番茄钟组件，支持 25 分钟工作 / 5 分钟休息循环，分段进度条显示进度。

#### Scenario: 开始番茄钟
- **WHEN** 用户点击开始
- **THEN** 倒计时开始，进度条逐步填充，显示剩余时间

#### Scenario: 切换工作/休息
- **WHEN** 工作阶段结束
- **THEN** 自动切换到休息阶段，进度条重置，状态文字更新

### Requirement: Walkie-Talkie Widget
系统应提供对讲机风格组件，Push-to-talk 按钮用于录音（Web 端适配）。

#### Scenario: 按住说话
- **WHEN** 用户按住 PTT 按钮
- **THEN** 显示录音状态指示（脉冲动画），松开后显示 `[SENT]` 状态

### Requirement: Sun-Dial Widget
系统应提供日出日落追踪组件，以弧形可视化展示日照时段和当前太阳位置。

#### Scenario: 显示日照信息
- **WHEN** 组件加载
- **THEN** 显示弧形日照轨迹，当前太阳位置标记，日出/日落时间，剩余日照时长

### Requirement: Age in Motion Widget
系统应提供生命进度可视化组件，以分段条或环形图展示已度过的时间比例。

#### Scenario: 显示年龄进度
- **WHEN** 用户输入出生日期
- **THEN** 显示已度过的年/月/日/时/分/秒，以分段进度条展示生命各阶段比例

### Requirement: Chrono Widget
系统应提供独立秒表组件，支持开始/暂停/重置和圈数记录。

#### Scenario: 记录圈数
- **WHEN** 秒表运行中用户点击 LAP 按钮
- **THEN** 记录当前时间作为一圈，显示圈数列表，每圈显示耗时和累计时间

### Requirement: Sys Info Widget (扩展)
系统应扩展 SystemMonitor 组件，增加 CPU、网络、电池综合信息展示。

#### Scenario: 显示综合系统信息
- **WHEN** 组件加载
- **THEN** 显示 CPU 使用率、RAM 使用率、存储使用率、网络状态、电池状态，每个指标使用分段进度条

### Requirement: Spinner Widget
系统应提供决策转盘组件，支持自定义选项，旋转动画随机选中。

#### Scenario: 旋转选择
- **WHEN** 用户点击旋转按钮
- **THEN** 转盘旋转动画，减速后停在随机选项上，选中项高亮显示

### Requirement: World Clock Widget
系统应提供世界时钟组件，同时显示多个时区的当前时间。

#### Scenario: 显示多时区时间
- **WHEN** 组件加载
- **THEN** 显示多个城市的当前时间，每个城市显示时区偏移和本地时间，日/夜状态指示
