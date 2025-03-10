import { useEffect, useRef, useState, cloneElement, isValidElement } from 'react'
import { jum } from 'jum-core'

import type { JumOptions } from 'jum-core'

export type JumProps = React.PropsWithChildren<
  Partial<JumOptions> & {
    onJum?: (instance: ReturnType<typeof jum>) => void
  }
>

export const Jum = ({
  children,
  onJum,
  ...options
}: JumProps) => {
  const childRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (childRef.current) {
      const instance = jum(childRef.current, options)
      onJum?.(instance)

      return () => {
        instance.destroy()
      }
    }
  }, [options])

  if (isValidElement(children)) {
    return cloneElement(children, { ref: childRef } as any)
  }

  return null
}