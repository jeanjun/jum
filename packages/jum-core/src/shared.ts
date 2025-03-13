import type { Commands } from './commands/createCommands'
import type { Gestures } from './gestures'

export type Camera = {
  x: number
  y: number
  scale: number
}

export namespace JumEvents {
  export type zoomStart = {
    nativeEvent: TouchEvent
    camera: Camera
  }
  export type zoomUpdate = {
    nativeEvent: TouchEvent
    camera: Camera
  }
  export type zoomEnd = {
    nativeEvent: TouchEvent
    camera: Camera
  }
}

export type JumOptions = {
  minScale: number
  maxScale: number
  maxScalebounce: number
  x: number 
  y: number
  scale: number
  onZoomStart: (event: JumEvents.zoomStart) => void
  onZoomUpdate: (event: JumEvents.zoomUpdate) => void
  onZoomEnd: (event: JumEvents.zoomEnd) => void
}

export type JumInstance = Commands & Gestures & {
  element: HTMLElement
  wrapper: HTMLElement
  camera: Camera
}

export type Shared = {
  element: HTMLElement
  wrapper: HTMLElement
  options: JumOptions
  instance: JumInstance
  camera: Camera
  isZooming: boolean
  isAnimating: boolean
}

export const createShared = () => ({
  isZooming: false,
  isAnimating: false,
} as Shared)
