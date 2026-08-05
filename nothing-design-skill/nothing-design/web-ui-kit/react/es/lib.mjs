import { cn, dataAttr, mergeSemanticProps } from "./lib/utils.mjs";
import { mergeRefs } from "./lib/refs.mjs";
import { Slot } from "./lib/slot.mjs";
import { isSingleReactElement } from "./lib/polymorphic.mjs";
import { enterTransition, exitFallbackMs, exitTransition, spring } from "./lib/motion.mjs";
import { FONT_WEIGHT_TRANSITION_CSS, fontVariationWeights, fontWeightValues } from "./lib/fontWeight.mjs";
export { FONT_WEIGHT_TRANSITION_CSS, Slot, cn, dataAttr, enterTransition, exitFallbackMs, exitTransition, fontVariationWeights, fontWeightValues, isSingleReactElement, mergeRefs, mergeSemanticProps, spring };
