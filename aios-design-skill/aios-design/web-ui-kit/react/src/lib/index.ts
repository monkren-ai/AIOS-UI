export { cn, dataAttr, mergeSemanticProps } from './utils'
export type {
  SemanticClassNames,
  SemanticStyles,
  WithSemanticProps,
  ComponentConfig,
} from './types'
export { mergeRefs } from './refs'
export { Slot } from './slot'
export type { SlotProps } from './slot'
export { isSingleReactElement } from './polymorphic'
export type { AsChildProps, AsProp, PolymorphicProps } from './polymorphic'
export type {
  DivProps,
  SpanProps,
  ButtonPropsBase,
  AnchorProps,
  InputPropsBase,
  TextareaPropsBase,
  SelectPropsBase,
  ContainerProps,
} from './component-types'
export { spring, exitFallbackMs, enterTransition, exitTransition, type SpringToken } from './motion'
export {
  overlayDuration,
  overlayTiming,
  overlayMenuMotion,
  overlayContextMotion,
  overlayTooltipMotion,
  overlayModalMotion,
  overlaySheetTiming,
  OVERLAY_REDUCED_MOTION,
  OVERLAY_ORIGIN_AWARE,
  type OverlaySpringStep,
} from './overlay-motion'
export { fontVariationWeights, fontWeightValues, FONT_WEIGHT_TRANSITION_CSS } from './fontWeight'
