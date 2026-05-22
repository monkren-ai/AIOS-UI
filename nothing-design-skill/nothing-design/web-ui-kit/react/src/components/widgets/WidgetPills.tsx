import React from "react";
import WidgetPill from "./WidgetPill";
import svgPaths from "./widget-svg-paths";

interface PillProps {
  theme?: 'light' | 'dark' | 'accent' | 'error'
  onClick?: () => void
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

function PillIcon({ pathData }: { pathData: string }) {
  return (
    <svg
      className="nothing-widget-icon-svg"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
    >
      <path d={pathData} />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg
      className="nothing-widget-icon-svg"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
    >
      <circle cx="6.58064" cy="9.67743" r="1.16129" />
      <circle cx="6.58064" cy="12" r="1.16129" />
      <circle cx="6.58064" cy="14.3225" r="1.16129" />
      <circle cx="9.29033" cy="7.35483" r="1.16129" />
      <circle cx="9.29033" cy="9.67743" r="1.16129" />
      <circle cx="9.29033" cy="12" r="1.16129" />
      <circle cx="9.29033" cy="14.3225" r="1.16129" />
      <circle cx="9.29033" cy="16.6451" r="1.16129" />
      <circle cx="12" cy="7.35483" r="1.16129" />
      <circle cx="12" cy="9.67743" r="1.16129" />
      <circle cx="12" cy="12" r="1.16129" />
      <circle cx="12" cy="14.3225" r="1.16129" />
      <circle cx="12" cy="16.6451" r="1.16129" />
      <circle cx="14.7097" cy="7.35483" r="1.16129" />
      <circle cx="14.7097" cy="9.67743" r="1.16129" />
      <circle cx="14.7097" cy="12" r="1.16129" />
      <circle cx="14.7097" cy="14.3225" r="1.16129" />
      <circle cx="14.7097" cy="16.6451" r="1.16129" />
      <circle cx="17.4194" cy="9.67743" r="1.16129" />
      <circle cx="17.4194" cy="12" r="1.16129" />
      <circle cx="17.4194" cy="14.3225" r="1.16129" />
      <circle cx="12" cy="1.16129" r="1.16129" />
      <circle cx="12" cy="22.8387" r="1.16129" />
      <circle cx="4.33588" cy="4.33589" r="1.16129" transform="rotate(-45 4.33588 4.33589)" />
      <circle cx="19.6641" cy="19.6642" r="1.16129" transform="rotate(-45 19.6641 19.6642)" />
      <circle cx="22.8387" cy="12" r="1.16129" transform="rotate(90 22.8387 12)" />
      <circle cx="1.16129" cy="12" r="1.16129" transform="rotate(90 1.16129 12)" />
      <circle cx="19.6641" cy="4.33589" r="1.16129" transform="rotate(45 19.6641 4.33589)" />
      <circle cx="4.33589" cy="19.6641" r="1.16129" transform="rotate(45 4.33589 19.6641)" />
    </svg>
  );
}

/** Mobile Data pill (light theme) */
export function MobileData({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p2bea2300} />}
      label="Mobile Data"
    />
  );
}
/** @deprecated Use MobileData */
export { MobileData as Dim };

/** Battery Share pill (light theme) */
export function BatteryShare({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p105235f0} />}
      label="Battery Share"
    />
  );
}
/** @deprecated Use BatteryShare */
export { BatteryShare as Dim1 };

/** Calculator pill (light theme) */
export function Calculator({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p13cd59f0} />}
      label="Calculator"
    />
  );
}

/** Battery Saver pill (light theme) */
export function BatterySaver({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p19d8a940} />}
      label="Battery Saver"
    />
  );
}

/** Home Controls pill (light theme) */
export function HomeControls({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p17852172} />}
      label="Home Controls"
    />
  );
}

/** NFC pill (dark theme) */
export function Nfc({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p1183f380} />}
      label="NFC"
    />
  );
}

/** Bedtime mode pill (light theme) */
export function Bedtime({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p289138c0} />}
      label="Bedtime Mode"
    />
  );
}

/** Dark mode pill (dark theme) */
export function DarkModePill({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p6adc900} />}
      label="Dark Mode"
    />
  );
}
/** @deprecated Use DarkModePill */
export { DarkModePill as DarkMode2 };

/** Weather / Sunny pill (dark theme) */
export function Weather({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<DotsIcon />}
      label="Sunny"
    />
  );
}

/** TV Remote pill (dark theme) */
export function TvRemote({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p143d3df0} />}
      label="TV Remote"
    />
  );
}
/** @deprecated Use TvRemote */
export { TvRemote as Remote1 };

/** Storage pill (dark theme) */
export function Storage({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p394c4300} />}
      label="Storage"
    />
  );
}
/** @deprecated Use Storage */
export { Storage as Share1 };

/** Hotspot pill (dark theme) */
export function Hotspot({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p2cbe2200} />}
      label="Hotspot"
    />
  );
}

/** Nearby Share pill (dark theme) */
export function NearbyShare({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p30a92a00} />}
      label="Nearby Share"
    />
  );
}
/** @deprecated Use NearbyShare */
export { NearbyShare as Share2 };

/** Extra Dim pill (light theme) */
export function ExtraDim({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p2174f00} />}
      label="Extra Dim"
    />
  );
}
/** @deprecated Use ExtraDim */
export { ExtraDim as Dim2 };

/** Data Saver pill (light theme) */
export function DataSaver({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p216ccf00} />}
      label="Data Saver"
    />
  );
}

/** Torch pill (light theme) */
export function Torch({ theme = 'light', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p28fe7100} />}
      label="Torch"
    />
  );
}

/** Bluetooth pill (dark theme) */
export function Bluetooth({ theme = 'dark', onClick, className, 'aria-label': ariaLabel, style }: PillProps) {
  return (
    <WidgetPill
      theme={theme}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={style}
      icon={<PillIcon pathData={svgPaths.p192dc300} />}
      label="Bluetooth"
    />
  );
}
/** @deprecated Use Bluetooth */
export { Bluetooth as Share3 };

export const WidgetPillList = [
  MobileData, BatteryShare, Calculator, BatterySaver, HomeControls, Nfc, Bedtime, DarkModePill,
  Weather, TvRemote, Storage, Hotspot, NearbyShare, ExtraDim, DataSaver, Torch, Bluetooth
];
