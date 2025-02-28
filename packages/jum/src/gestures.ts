import type { Shared } from './shared'

export type Gestures = {
  attach: () => void
  detach: () => void
}

export const createGestures = (shared: Shared) => {
  const { element } = shared
  let attached = false

  const handleTouchStart = (event: TouchEvent) => {
    console.log(event, 'touchstart')
  }

  const handleTouchMove = (event: TouchEvent) => {

  }

  const handleTouchEnd = (event: TouchEvent) => {

  }

  const attach = () => {
    if (attached) {
      return
    }

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)

    attached = true
  }

  const detach = () => {
    if (!attached) {
      return
    }

    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)

    attached = false
  }

  return {
    attach,
    detach
  }
}