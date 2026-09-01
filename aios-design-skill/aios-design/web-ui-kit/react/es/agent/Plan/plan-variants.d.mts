//#region src/agent/Plan/plan-variants.d.ts
declare const planVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const planStepVariants: (props?: ({
  status?: "active" | "done" | "pending" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { planStepVariants, planVariants };
//# sourceMappingURL=plan-variants.d.mts.map