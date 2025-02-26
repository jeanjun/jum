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

export type Shared = {
  element: HTMLElement
  options: Options
}

export const createShared = () => ({} as Shared)
