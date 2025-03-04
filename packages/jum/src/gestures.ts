import { styles } from './helpers/styles'
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
  const { options } = shared
  let attached = false

  const { minScale, maxScale } = options

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

    styles(shared.element, { overflow: '' })
    shared.instance.transform(camera)

    options?.onZoomUpdate({ nativeEvent: event, camera })
  }

  const onZoomEnd = async (event: TouchEvent, camera: Camera) => {
    shared.isZooming = false

    if (camera.scale > maxScale) {
      await resetToMaxZoom()
    }

    if (camera.scale < minScale) {
      resetToMinZoom()
    }

    if (camera.scale > minScale) {
      switchToScrollMode()
    }

    options?.onZoomEnd({ nativeEvent: event, camera })
  }

  const resetToMinZoom = () => {
    shared.instance.transform({
      x: 0,
      y: 0,
      scale: minScale,
      animation: true
    })
  }

  const resetToMaxZoom = () => {
    return shared.instance.transform({
      x: pinchState.midPoint.x - maxScale * pinchState.relativePoint.x,
      y: pinchState.midPoint.y - maxScale * pinchState.relativePoint.y,
      scale: maxScale,
      animation: true
    })
  }

  const switchToScrollMode = () => {
    const camera = { ...shared.camera }    
    shared.instance.transform({
      x: 0,
      y: 0,
      scale: camera.scale
    })
  
    styles(shared.element, { overflow: 'auto' })
    shared.element.scrollLeft = Math.abs(camera.x)
    shared.element.scrollTop = Math.abs(camera.y)
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
    if (shared.isZooming) {
      onZoomEnd(event, { ...shared.camera })

      event.preventDefault()
    }
  }

  const handleScroll = () => {
    shared.camera = {
      ...shared.camera,
      x: -shared.element.scrollLeft,
      y: -shared.element.scrollTop
    }
  }

  const attach = () => {
    if (attached) {
      return
    }

    shared.element.addEventListener('touchstart', handleTouchStart)
    shared.element.addEventListener('touchmove', handleTouchMove)
    shared.element.addEventListener('touchend', handleTouchEnd)
    shared.element.addEventListener('scroll', handleScroll)

    attached = true
  }

  const detach = () => {
    if (!attached) {
      return
    }

    shared.element.removeEventListener('touchstart', handleTouchStart)
    shared.element.removeEventListener('touchmove', handleTouchMove)
    shared.element.removeEventListener('touchend', handleTouchEnd)
    shared.element.removeEventListener('scroll', handleScroll)

    attached = false
  }

  return {
    attach,
    detach
  }
}