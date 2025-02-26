import type { Shared } from './shared'

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