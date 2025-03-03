import { assign } from '../helpers/assign'
import { styles } from '../helpers/styles'
import type { Shared } from '../shared'

type Options = {
  x: number
  y: number
  scale: number
}

export const transform = (shared: Shared) => ({
  x,
  y,
  scale
}: Partial<Options>) => {
  const { element } = shared
  shared.camera = assign(shared.camera, { x, y, scale })
  styles(element, shared.camera)
}