import { version } from '.'
import { assign } from './utils/assign'
import { createCommands } from './commands/createCommands'
import { createShared, type Options } from './shared'

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

  return createObject({
    /**
     * prototype 으로 들어가게 해놨지만, 일반적인 인스턴스와 달리 실제로 함수를 공유 하지는 않음
     * 단순, 고수준 API와 저수준 API를 구분하기 위한 용도로 사용
     */
    ...createCommands(shared)
  }, {
    version
  })
}