# SVG 图标组件拆分计划

## 背景

`NothingWidgets20.tsx` 是一个 4500+ 行的巨型文件，包含约 360 个内部函数组件。其中大量是 SVG 图标组件（68×68 圆形图标、pill 形状切换按钮、152×152 卡片组件等），它们全部挤在一个文件中，导致：
- 文件过大，难以维护
- 无法单独复用图标
- 编译缓慢（所有组件打包在一起）

## 拆分策略

按组件类型和功能分为 **6 个独立文件**，每个文件对应一类视觉形态：

### 1. `WidgetIcons.tsx` — 68×68 圆形图标（39个）
所有 `widget-icon-wrapper--68` 包裹的 SVG 图标组件：
- Home, DarkMode, Remote, Subtitle, Wallet, Location, DarkMode1, NoSignam, DownArrow, DoNotDisturb, QrCode, Storage, Share, NoConnection, Record, FullNetwork, Shield, Glyphs, Aeroplane, Chart, Video, Temp, AutoRotate, Info, MicOff, NoSim, Watch, Record1, AccessCamera, Dots, Filter, Home1, Cast, DoNotDisturb1, ArrowDown, QrCode1, Subtitle1, Scan, Cast1, BatteryPlus

### 2. `WidgetPills.tsx` — Pill 形状切换按钮（16个）
所有 `widget-pill` 包裹的组件：
- Dim, Dim1, Calculator, BatterySaver, HomeControls, Nfc, Bedtime, DarkMode2, Weather, Remote1, Share1, Hotspot, Share2, Dim2, DataSaver, Torch, Share3

### 3. `WidgetCards152.tsx` — 152×152 卡片组件（~20个）
所有 `widget-card--152` / `widget-card-wrapper` 包裹的组件：
- PairNewDevice, Overlimit, MusicPlayer, TotalTime, StepsCounter, OverLimit, LoadingBar1, Card, Card1, Dots3, Play, NothingEar, Card2, Date, Date1, Counter, Music, Device, Mode, DoubleDown, SelectDevice

### 4. `WidgetGlyphs.tsx` — 点阵/字形图标（~15个）
所有 Group* / Glyphs* / Dots* 类的点阵图案组件：
- Group17-16, Group19-27, Group28-37, Glyphs1, Glyphs2, Dots4-7, Marks, Hands, Watchface, Flash, Campus 等

### 5. `WidgetComposites.tsx` — 复合功能组件（~10个）
包含复杂交互逻辑或组合多个子组件的卡片：
- WatchAnalog, Compass, TempControl, Active, Recording, LocationAccess, Weather1, ActivityTracker, Weather2, Wedget

### 6. `NothingWidgets20.tsx` — 保留入口 + 布局网格
仅保留：
- Frame49（7×6 图标网格）, Frame50（4×5 pill 网格）, Frame46, Frame48, Frame47, Frame10
- 主导出函数 `NothingWidgets`
- 从上述 5 个文件导入所有子组件

## 实施步骤

### Step 1: 创建 `WidgetIcons.tsx`
- 提取 39 个 68×68 图标组件
- 导入 `svgPaths`
- 导出所有图标组件（named export）
- 同时创建一个 `WidgetIconGrid` 组件，替代 Frame49

### Step 2: 创建 `WidgetPills.tsx`
- 提取 16 个 pill 组件
- 导入 `svgPaths`
- 导出所有 pill 组件
- 同时创建一个 `WidgetPillGrid` 组件，替代 Frame50

### Step 3: 创建 `WidgetCards152.tsx`
- 提取 ~20 个 152×152 卡片组件
- 导入 `svgPaths` 和图片资源
- 导出所有卡片组件
- 同时创建一个 `WidgetCardGrid` 组件，替代 Frame48

### Step 4: 创建 `WidgetGlyphs.tsx`
- 提取所有点阵/字形图案组件
- 导入 `svgPaths`
- 导出所有字形组件

### Step 5: 创建 `WidgetComposites.tsx`
- 提取复合功能组件
- 导入 `svgPaths` 和图片资源
- 导入 WidgetGlyphs 中的子组件
- 导出所有复合组件

### Step 6: 重构 `NothingWidgets20.tsx`
- 删除所有已迁移的函数定义
- 从 5 个新文件导入组件
- 保留 Frame10 和主导出函数
- 验证功能不变

### Step 7: 验证
- TypeScript 类型检查
- 构建测试
- 浏览器渲染对比

## 文件依赖关系

```
svgPaths (共享)
  ├── WidgetIcons.tsx
  ├── WidgetPills.tsx
  ├── WidgetCards152.tsx (图片资源)
  ├── WidgetGlyphs.tsx
  └── WidgetComposites.tsx (图片资源, 依赖 WidgetGlyphs)
        │
        └── NothingWidgets20.tsx (导入以上所有)
              └── App.tsx (仅导入 NothingWidgets20)
```

## 预期效果

| 文件 | 预估行数 | 组件数 |
|------|---------|--------|
| WidgetIcons.tsx | ~800 | 39 + 1 Grid |
| WidgetPills.tsx | ~500 | 16 + 1 Grid |
| WidgetCards152.tsx | ~800 | 20 + 1 Grid |
| WidgetGlyphs.tsx | ~1200 | ~60 |
| WidgetComposites.tsx | ~600 | ~10 |
| NothingWidgets20.tsx | ~100 | 6 Frame + 1 Export |
| **总计** | **~4000** | **~150** |
