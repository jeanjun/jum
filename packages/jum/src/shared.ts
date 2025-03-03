import type { Commands } from './commands/createCommands'
import type { Gestures } from './gestures'

export type Options = {
  minScale: number
  maxScale: number
  x: number 
  y: number
  scale: number 
}

export type Camera = {
  x: number
  y: number
  scale: number
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
}

export const createShared = () => ({} as Shared)
