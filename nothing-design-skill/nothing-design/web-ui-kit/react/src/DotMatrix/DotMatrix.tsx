// Re-export from the canonical StaticDotMatrix implementation
// to avoid duplicate symbol definitions across the codebase.
export {
  StaticDotMatrix as DotMatrix,
  dotMatrixVariants,
  dotVariants,
  type StaticDotMatrixProps as DotMatrixProps,
  default,
} from '../components/StaticDotMatrix'
