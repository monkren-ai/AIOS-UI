import { DotMatrix } from 'nothing-ui/dot-matrix'

export default function DotMatrixPattern() {
  return (
    <DotMatrix
      rows={8}
      cols={16}
      dotSize="md"
      theme="dark"
      activeDots={[
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [3, 2],
        [3, 3],
        [5, 10],
        [5, 11],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [7, 10],
        [7, 11],
      ]}
      dimDots={[
        [0, 0],
        [0, 15],
        [7, 0],
        [7, 15],
      ]}
    />
  )
}
