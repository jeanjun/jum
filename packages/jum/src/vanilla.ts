import { version } from '.'
import { assign } from './helpers/assign'
import { createCommands } from './commands/createCommands'
import { Camera, createShared, type JumInstance, type Options } from './shared'
import { createGestures } from './gestures'
import { warn } from './helpers/warn'

const createObject = <T extends object, P extends object>(
  proto: T,
  props: P
) => (
  Object.create(proto, Object.getOwnPropertyDescriptors(props))
)

export const jum = (
  element: HTMLElement,
  options: Partial<Options> = {}
) => {
  const shared = createShared()
  shared.element = element
  shared.options = assign({
    x: 0,
    y: 0,
    scale: 1,
    minScale: 0.5,
    maxScale: 4
  }, options)

  // Object.create 사용은 단순, 고수준 API와 저수준 API를 구분하기 위한 의미가 큼.
  const instance: JumInstance = (shared.instance = createObject({
    ...createCommands(shared),
    ...createGestures(shared)
  }, {
    element,
    get camera () {
      return shared.camera
    },
    set camera (v: Camera) {
      warn('camera 속성은 직접 수정할 수 없습니다. transform 메서드를 사용해 주세요.')
    }
  }))

  const { x, y, scale } = shared.options
  instance.transform({ x, y, scale })
  instance.attach()
  return instance
}