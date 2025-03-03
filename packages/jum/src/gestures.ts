import type { Camera, Shared } from './shared'

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
    camera: { x: 0, y: 0, scale: 1 },
    midPoint: { x: 0, y: 0 },
    relativePoint: { x: 0, y: 0 }
  }

  const onZoomStart = (event: TouchEvent, camera: Camera) => {
    options?.onZoomStart({ nativeEvent: event, camera })
  }

  const onZoomUpdate = (event: TouchEvent, camera: Camera) => {
    shared.isZooming = true

    shared.instance.transform(camera)

    options?.onZoomUpdate({ nativeEvent: event, camera })
  }

  const onZoomEnd = (event: TouchEvent, camera: Camera) => {
    shared.isZooming = false

    options?.onZoomEnd({ nativeEvent: event, camera })
  }

  const handleTouchStart = (event: TouchEvent) => {
    const touches = Array.from(event.touches)
    if (touches.length >= PINCH_POINTER_COUNT) {
      const point1 = { x: touches[0].clientX, y: touches[0].clientY }
      const point2 = { x: touches[1].clientX, y: touches[1].clientY }
      pinchState.distance = getDistance(point1, point2)
      pinchState.midPoint = getMidPoint(point1, point2)
      pinchState.camera = { ...shared.camera }
      pinchState.relativePoint = {
        x: (pinchState.midPoint.x - pinchState.camera.x) / pinchState.camera.scale,
        y: (pinchState.midPoint.y - pinchState.camera.y) / pinchState.camera.scale
      }

      onZoomStart(event, { ...pinchState.camera })

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
      const newScale = pinchState.camera.scale * (distance / pinchState.distance)
      const newX = midPoint.x - newScale * pinchState.relativePoint.x
      const newY = midPoint.y - newScale * pinchState.relativePoint.y

      onZoomUpdate(event, {
        x: newX,
        y: newY,
        scale: newScale
      })

      event.preventDefault()
    }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    shared.isZooming = false

    onZoomEnd(event, { ...shared.camera })

    event.preventDefault()
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