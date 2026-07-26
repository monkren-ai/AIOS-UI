/**
 * Central SVG string registry for DotMatrixIcon integration.
 *
 * Provides full <svg>...</svg> markup strings for every icon set in the project:
 * - widgetIconSvg: 40 WidgetIcons (from widget-svg-paths.ts)
 * - quickToggleSvg: 8 QuickToggle inline SVGs (from App.tsx)
 * - weatherSvg: 7 weather SVG files (via Vite ?raw imports)
 * - componentIconSvg: key icons from Battery.tsx / Taskbar.tsx
 *
 * Used by SvgIcon (variant="dot"), DotMatrixWeatherIcon, and showcase demos.
 */
import svgPaths from './widget-svg-paths'
import {
  sunnyRaw,
  cloudyRaw,
  partlyCloudyDayRaw,
  partlyCloudyNightRaw,
  rainOrMistRaw,
  snowFallRaw,
  thunderRaw,
} from './weather-svg-strings'

/** Wrap a path d-string into a full <svg> markup for DotMatrixIcon rasterization. */
function wrapPath(d: string, viewBox = '0 0 68 68', fill = 'black'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path d="${d}" fill="${fill}"/></svg>`
}

/** Wrap multiple paths into a single <svg> markup. */
function wrapPaths(paths: string[], viewBox = '0 0 68 68', fill = 'black'): string {
  const body = paths.map((d) => `<path d="${d}" fill="${fill}"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`
}

/* ──────────────────────────────────────────────
   WidgetIcons — 40 icons mapped from WidgetIcons.tsx
   ────────────────────────────────────────────── */

export const widgetIconSvg: Record<string, string> = {
  // Simple path icons (viewBox 0 0 68 68, coordinates in 0-68 range)
  home: wrapPath(svgPaths.p2f639780),
  location: wrapPath(svgPaths.p3dac5000),
  remote: wrapPath(svgPaths.p20de0900),
  share: wrapPath(svgPaths.p362aab00),
  shield: wrapPath(svgPaths.p325eb300),
  aeroplane: wrapPath(svgPaths.p687b0f0),
  chart: wrapPath(svgPaths.p1832e580),
  micOff: wrapPath(svgPaths.p6242870),
  batteryPlus: wrapPath(svgPaths.pf1d8400),
  darkMode: wrapPath(svgPaths.p3ff6ad40),
  subtitle: wrapPath(svgPaths.p367a9ef0),
  wallet: wrapPath(svgPaths.p10ce0080),
  downArrow: wrapPath(svgPaths.p346526f2),
  storage: wrapPath(svgPaths.p37508c00),
  record: wrapPath(svgPaths.p28e78780),
  video: wrapPath(svgPaths.p99ce600),
  filter: wrapPath(svgPaths.p3358de80),
  doNotDisturb: wrapPath(svgPaths.p399f00),
  accessCamera: wrapPath(svgPaths.p113bc980),
  autoRotate: wrapPath(svgPaths.p7b40400),
  cast: wrapPath(svgPaths.p1f6d8d00),
  homeLight: wrapPath(svgPaths.p2f639780),
  darkModeLight: wrapPath(svgPaths.p3ff6ad40),
  doNotDisturbLight: wrapPath(svgPaths.p399f00),
  qrCodeLight: wrapPath(svgPaths.p1aaafdc0),
  subtitleLight: wrapPath(svgPaths.p11360480),
  recordAlt: wrapPath(svgPaths.p2a214d00),
  castAlt: wrapPath(svgPaths.p1f6d8d00),
  arrowDownAlt: wrapPath(svgPaths.p14c47600),
  qrCode: wrapPath(svgPaths.p1aaafdc0),

  // Multi-path icons
  scan: wrapPaths([svgPaths.p90a7c00, svgPaths.p2aa04480]),

  // clipPath icons — include defs so rasterization clips correctly
  noSignal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><g clipPath="url(#clip_nosignal)"><path d="${svgPaths.p1ff37100}" fill="black"/></g><defs><clipPath id="clip_nosignal"><rect x="23" y="22" width="22.6667" height="24"/></clipPath></defs></svg>`,
  fullNetwork: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><g clipPath="url(#clip_fullnet)"><path d="${svgPaths.p1229a080}" fill="black"/></g><defs><clipPath id="clip_fullnet"><rect x="22" y="22" width="24" height="24"/></clipPath></defs></svg>`,
  noSim: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><g clipPath="url(#clip_nosim)"><path d="${svgPaths.p38a80e80}" fill="black"/></g><defs><clipPath id="clip_nosim"><rect x="22" y="22" width="24" height="24"/></clipPath></defs></svg>`,

  // Complex icons with circles + paths — manually composed
  dots: (() => {
    const circles = [
      [28.6665, 25.3333], [31.3333, 25.3333], [34.0001, 25.3333], [36.6665, 25.3333], [39.3333, 25.3333],
      [31.3333, 34.2221], [34.0001, 34.2221], [36.6665, 34.2221],
      [26.0001, 27.9996], [28.6665, 27.9996], [31.3333, 27.9996], [34.0001, 27.9996], [36.6665, 27.9996], [39.3333, 27.9996], [42.0001, 27.9996],
      [28.6665, 36.8884], [31.3333, 36.8884], [34.0001, 36.8884], [36.6665, 36.8884], [39.3333, 36.8884],
      [34.0001, 43.1108],
      [23.3333, 30.6665], [42.0001, 30.6665], [26.0001, 30.6665], [44.6665, 30.6665],
    ]
    const circleTags = circles.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="1.8" fill="black"/>`).join('')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68">${circleTags}</svg>`
  })(),

  glyphs: (() => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><path d="${svgPaths.p29036d00}" fill="black"/><circle cx="1.5" cy="1.5" r="1.5" fill="black"/><circle cx="13.5" cy="1.5" r="1.5" fill="black"/><circle cx="7.5" cy="19.5" r="1.5" fill="black"/></svg>`
  })(),

  watch: (() => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><rect x="15.2106" y="27.2254" width="8" height="24" rx="4" fill="black" transform="rotate(-60 15.2106 27.2254)"/><rect x="56.5391" y="18.8007" width="2" height="28" rx="1" fill="black" transform="rotate(60 56.5391 18.8007)"/><circle cx="18.9999" cy="59.7108" r="2.5" fill="black"/></svg>`
  })(),

  // Empty icons (no path in original) — empty SVG produces no dots
  noConnection: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"/>',
  temp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"/>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"/>',
}

/* ──────────────────────────────────────────────
   QuickToggle — 8 inline SVGs extracted from App.tsx
   Stroke style converted to black for rasterization
   ────────────────────────────────────────────── */

export const quickToggleSvg: Record<string, string> = {
  active: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  torch: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1"/><circle cx="12" cy="12" r="4"/></svg>',
  dnd: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
  rotate: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/></svg>',
  hotspot: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14"/></svg>',
  bluetooth: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"><path d="M6.5 6.5h11v11h-11z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"/></svg>',
  mobileData: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4"/></svg>',
  nfc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18" stroke-linecap="round"/></svg>',
}

/* ──────────────────────────────────────────────
   Weather — 7 SVG files via Vite ?raw imports
   ────────────────────────────────────────────── */

export const weatherSvg: Record<string, string> = {
  sunny: sunnyRaw,
  cloudy: cloudyRaw,
  partlyCloudyDay: partlyCloudyDayRaw,
  partlyCloudyNight: partlyCloudyNightRaw,
  rainOrMist: rainOrMistRaw,
  snowFall: snowFallRaw,
  thunder: thunderRaw,
}

/* ──────────────────────────────────────────────
   Component inline SVG — key icons from Battery/Taskbar
   Only status/indicator/navigation icons (skip pure functional controls)
   ────────────────────────────────────────────── */

export const componentIconSvg: Record<string, string> = {
  // Battery icons (from Battery.tsx) — stroke style, black for rasterization
  batteryCharging: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  batteryLow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><rect x="2" y="6" width="18" height="14" rx="2" ry="2"/><rect x="20" y="10" width="2" height="6" rx="1" fill="black"/><rect x="6" y="12" width="4" height="4" rx="1" fill="black"/></svg>',
  batteryNormal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><rect x="2" y="6" width="18" height="14" rx="2" ry="2"/><rect x="20" y="10" width="2" height="6" rx="1" fill="black"/><rect x="6" y="10" width="8" height="6" rx="1" fill="black"/></svg>',

  // Device type icons (from Battery.tsx DeviceTypeIcon)
  deviceMouse: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="6"/><line x1="12" y1="2" x2="12" y2="10"/></svg>',
  deviceKeyboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><rect x="1" y="6" width="22" height="12" rx="2"/><line x1="5" y1="10" x2="7" y2="10" stroke-linecap="round"/><line x1="9" y1="10" x2="11" y2="10" stroke-linecap="round"/><line x1="13" y1="10" x2="15" y2="10" stroke-linecap="round"/><line x1="17" y1="10" x2="19" y2="10" stroke-linecap="round"/><line x1="7" y1="14" x2="17" y2="14" stroke-linecap="round"/></svg>',
  deviceEarbuds: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><circle cx="7" cy="7" r="4"/><circle cx="17" cy="7" r="4"/><path d="M7 11v5a4 4 0 0 0 4 4" stroke-linecap="round"/><path d="M17 11v5a4 4 0 0 1-4 4" stroke-linecap="round"/></svg>',
  devicePhone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18" stroke-linecap="round"/></svg>',
  deviceWatch: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><circle cx="12" cy="12" r="6"/><path d="M9 2h6l-1 4H10L9 2z" stroke-linejoin="round"/><path d="M9 22h6l-1-4H10L9 22z" stroke-linejoin="round"/></svg>',

  // Taskbar icons (from Taskbar.tsx)
  startIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>',
  searchIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round"/></svg>',
  volumeIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="black" stroke-width="2"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="black" stroke-width="2"/></svg>',
}
