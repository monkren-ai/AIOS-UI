import { cn, dataAttr, mergeSemanticProps } from "./lib/utils.mjs";
import { mergeRefs } from "./lib/refs.mjs";
import { Slot } from "./lib/slot.mjs";
import { isSingleReactElement } from "./lib/polymorphic.mjs";
import { enterTransition, exitFallbackMs, exitTransition, spring } from "./lib/motion.mjs";
import { OVERLAY_ORIGIN_AWARE, OVERLAY_REDUCED_MOTION, overlayContextMotion, overlayDuration, overlayMenuMotion, overlayModalMotion, overlaySheetTiming, overlayTiming, overlayTooltipMotion } from "./lib/overlay-motion.mjs";
import { FONT_WEIGHT_TRANSITION_CSS, fontVariationWeights, fontWeightValues } from "./lib/fontWeight.mjs";
export { FONT_WEIGHT_TRANSITION_CSS, OVERLAY_ORIGIN_AWARE, OVERLAY_REDUCED_MOTION, Slot, cn, dataAttr, enterTransition, exitFallbackMs, exitTransition, fontVariationWeights, fontWeightValues, isSingleReactElement, mergeRefs, mergeSemanticProps, overlayContextMotion, overlayDuration, overlayMenuMotion, overlayModalMotion, overlaySheetTiming, overlayTiming, overlayTooltipMotion, spring };
