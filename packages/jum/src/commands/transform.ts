import { assign } from '../helpers/assign'
import { styles } from '../helpers/styles'
import type { Shared } from '../shared'

type Options = {
  x: number
  y: number
  scale: number
}

export const transform = (shared: Shared) => (options: Partial<Options>) => {
  const { element } = shared
  const { x, y, scale } = assign(shared.camera, options)
  shared.camera = { x, y, scale }

  styles(element, {
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    transformOrigin: '0 0'
  })
}