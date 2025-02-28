import { version } from '.'
import { assign } from './utils/assign'
import { createCommands } from './commands/createCommands'
import { createShared, type JumInstance, type Options } from './shared'
import { createGestures } from './gestures'

const createObject = <T extends object, P extends object>(
  proto: T,
  props: P
) => (
  Object.create(proto, Object.getOwnPropertyDescriptors(props))
)

export const createJum = (
  element: HTMLElement,
  options?: Options
) => {
  const shared = createShared()
  shared.element = element
  shared.options = assign({
    minScale: 0.5,
    maxScale: 4,
    camera: {
      x: 0,
      y: 0,
      z: 1
    }
  }, options)

  // Object.create 사용은 prototype등의 이점 보다는
  // 단순, 고수준 API와 저수준 API를 구분하기 위한 의미가 큼.
  const instance: JumInstance = shared.instance = createObject({
    ...createCommands(shared),
    ...createGestures(shared)
  }, {
    version
  })

  instance.attach()
  return instance
}