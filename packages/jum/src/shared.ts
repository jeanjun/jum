import type { Commands } from './commands/createCommands'

export type Point = {
  x: number
  y: number
}

export type Camera = {
  x: number 
  y: number
  z: number
}

export type Options = {
  minScale: number
  maxScale: number
  camera: Camera
}

export type JumInstance = Commands & {
  version: string
}

export type Shared = {
  element: HTMLElement
  options: Options
  instance: JumInstance
}

export const createShared = () => ({} as Shared)
