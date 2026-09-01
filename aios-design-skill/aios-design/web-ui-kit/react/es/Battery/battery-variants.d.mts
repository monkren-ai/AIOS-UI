//#region src/Battery/battery-variants.d.ts
declare const batteryVariants: (props?: ({
  variant?: "segmented" | "ring" | null | undefined;
  level?: "critical" | "low" | "high" | "medium" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const batteryRingVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const batteryDeviceVariants: (props?: ({
  clickable?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { batteryDeviceVariants, batteryRingVariants, batteryVariants };
//# sourceMappingURL=battery-variants.d.mts.map