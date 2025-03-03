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

export type Options = {
  minScale: number
  maxScale: number
  x: number 
  y: number
  scale: number
  onZoomStart: (event: JumEvents.zoomStart) => void
  onZoomUpdate: (event: JumEvents.zoomUpdate) => void
  onZoomEnd: (event: JumEvents.zoomEnd) => void
}

export type JumInstance = Commands & Gestures & {
  element: HTMLElement
  camera: Camera
}

export type Shared = {
  element: HTMLElement
  options: Options
  instance: JumInstance
  camera: Camera
  isZooming: boolean
}

export const createShared = () => ({
  isZooming: false
} as Shared)
