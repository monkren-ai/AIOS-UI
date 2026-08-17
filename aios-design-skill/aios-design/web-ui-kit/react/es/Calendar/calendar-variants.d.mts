//#region src/Calendar/calendar-variants.d.ts
/**
 * Calendar 的视觉变体。
 *
 * 两种版型共用同一张卡片（surface + border + 12px 圆角 + 32px 内边距），
 * `compact` 只是把内容居中成「日 / 号 / 月」三行的大字块。
 */
declare const calendarVariants: (props?: ({
  type?: "full" | "compact" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 月历里的单个日期格。 */
declare const dayVariants: (props?: ({
  isOtherMonth?: boolean | null | undefined;
  isToday?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { calendarVariants, dayVariants };
//# sourceMappingURL=calendar-variants.d.mts.map