import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

export const useRefState = <T>(
  initialValue: T | (() => T),
): [T, MutableRefObject<T>, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialValue)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  return [state, stateRef, setState]
}

export default useRefState