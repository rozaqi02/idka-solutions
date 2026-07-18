import { useState, useCallback, useRef, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export type Toast = {
  id: number
  message: string
  type: ToastType
}

let toastSeq = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const activeTimers = timers.current
    return () => {
      activeTimers.forEach((t) => clearTimeout(t))
      activeTimers.clear()
    }
  }, [])

  const removeToast = useCallback((id: number) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastSeq
    setToasts((prev) => [...prev, { id, message, type }])
    const timer = setTimeout(() => {
      timers.current.delete(id)
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
    timers.current.set(id, timer)
  }, [])

  return { toasts, addToast, removeToast }
}
