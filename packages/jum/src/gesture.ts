import type { Shared } from './shared'

export type Gesture = {
  attach: () => void
  detach: () => void
}

export const createGesture = (shared: Shared) => {
  const { element } = shared

  const attach = () => {
    console.log(element)
  }

  const detach = () => {}

  return {
    attach,
    detach
  }
}