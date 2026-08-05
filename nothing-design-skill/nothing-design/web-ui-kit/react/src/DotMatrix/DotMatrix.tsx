// Re-export from the canonical StaticDotMatrix implementation
// to avoid duplicate symbol definitions across the codebase.
export {
  StaticDotMatrix as DotMatrix,
  dotMatrixVariants,
  dotMatrixRowVariants,
  dotVariants,
  type StaticDotMatrixProps as DotMatrixProps,
  default,
} from '../components/StaticDotMatrix'

export type {
  DotMatrixPattern,
  DotMatrixSize,
  DotMatrixTheme,
  DotState,
} from './dot-matrix-variants'
