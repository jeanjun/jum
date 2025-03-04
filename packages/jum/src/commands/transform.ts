import { assign } from '../helpers/assign'
import { styles } from '../helpers/styles'
import type { Shared } from '../shared'

type Options = {
  x: number
  y: number
  scale: number
  animation?: boolean
}

export const transform = (shared: Shared) => (options: Partial<Options>) => {
  return new Promise<void>((resolve) => {
    const { instance } = shared
    const { x, y, scale, animation } = assign(shared.camera, options)
    shared.camera = { x, y, scale }

    styles(instance.element, {
      transform: `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`,
      transformOrigin: '0 0',
      transition: 
        animation
          ? 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)' 
          : ''
    })

    if (animation) {
      instance.element.addEventListener('transitionend', () => resolve(), { once: true })
    } else {
      resolve()
    }
  })
}