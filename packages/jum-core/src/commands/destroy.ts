
import type { Shared } from '../shared'

export const destroy = (shared: Shared) => () => {
  const destroy = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => {
      const item = obj[key]
      if (item instanceof HTMLElement) {
        item.remove()
      }
      obj[key] = null
    })
  }

  const instance = shared.instance
  destroy(shared)
  destroy(instance)
}