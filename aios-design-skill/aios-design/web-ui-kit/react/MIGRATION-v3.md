# Migrating to AIOS UI 3.0

3.0 将明暗模式与“主题家族”拆成两个正交状态。原有 `theme`、`resolvedTheme`、`setTheme()` 与 `Theme = 'light' | 'dark' | 'system'` 保持不变；主题家族使用 `themeId` 与 `setThemeId()`。

```tsx
const { theme, setTheme, themeId, setThemeId } = useTheme()
setTheme('system')
setThemeId('aios-paper')
```

自定义主题应使用 `ThemeDefinition` 或通过 `parseDtcgTheme()` 导入 DTCG 2025.10 JSON，再传给 `ThemeProvider themes={themes}`。运行时只写入白名单视觉令牌，不加载 URL、CSS、脚本或远程字体。

## Removed exports

- `Caffeinate`, `Clipboard`, `MusicPlayer`, `PhotoCarousel`, `Quotes`, `WalkieTalkie`
- `DateWidget`, `Taskbar`, `WidgetCard`
- 对应的 `aios-ui-kit/<subpath>` 入口

替代方式：普通信息容器使用 `Card`；日期、任务栏、媒体播放器等产品级能力由应用层组合基础组件实现。

## Changed props

- `Card`: 删除 `mode="widget"` 和所有 `WidgetCard` props。
- `Battery`: 删除 `widgetMode`，使用 `variant="segmented" | "ring"`。
- `QuickToggle`, `AgeMotion`, `NextEvent`, `SunDial`: 删除局部 `theme`；通过最近的 `ThemeProvider` 切换全局主题家族。

升级后建议先运行 `tsc --noEmit`，编译器会定位所有删除的导出与 prop。
