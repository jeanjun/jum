import type { Shared } from './shared'

export type Gestures = {
  attach: () => void
  detach: () => void
}

export type Point = {
  x: number
  y: number
}

const getDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.hypot(dx, dy)
}

const getMidPoint = (p1: Point, p2: Point): {
  x: number
  y: number
} => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2
})

const PINCH_POINTER_COUNT = 2

export const createGestures = (shared: Shared) => {
  const { element, options } = shared
  let attached = false

  const pinchState = {
    distance: 0,
    midPoint: { x: 0, y: 0 },
    relativePoint: { x: 0, y: 0 }
  }

  const camera = {
    ...shared.camera
  }

  const handleTouchStart = (event: TouchEvent) => {
    const touches = Array.from(event.touches)

    const pinchPointerCount = touches.length
    if (pinchPointerCount >= PINCH_POINTER_COUNT) {
      const point1 = { x: touches[0].clientX, y: touches[0].clientY }
      const point2 = { x: touches[1].clientX, y: touches[1].clientY }
      pinchState.distance = getDistance(point1, point2)
      pinchState.midPoint = getMidPoint(point1, point2)
      pinchState.relativePoint = {
        x: (pinchState.midPoint.x - camera.x) / camera.scale,
        y: (pinchState.midPoint.y - camera.y) / camera.scale
      }

      event.preventDefault()
    }
  }

  const handleTouchMove = (event: TouchEvent) => {
    const touches = Array.from(event.touches)
    if (touches.length >= PINCH_POINTER_COUNT) {
      const point1 = { x: touches[0].clientX, y: touches[0].clientY }
      const point2 = { x: touches[1].clientX, y: touches[1].clientY }
      const distance = getDistance(point1, point2)
      const midPoint = getMidPoint(point1, point2)
      camera.scale = camera.scale * (distance / pinchState.distance)
      camera.x = midPoint.x - camera.scale * pinchState.relativePoint.x
      camera.y = midPoint.y - camera.scale * pinchState.relativePoint.y
    }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    console.log(event, 'touchend')
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