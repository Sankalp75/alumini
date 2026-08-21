"use client";
import * as React from "react"
type ToastProps = { id: string; title?: string; description?: string; variant?: "default"|"success"|"error"|"warning"|"info"; duration?: number; action?: React.ReactNode }
const TOAST_LIMIT = 4
type State = { toasts: ToastProps[] }
let count = 0
function genId() { count = (count + 1) % 1000000; return count.toString() }
type Action = { type: "ADD"; toast: ToastProps } | { type: "DISMISS"; id: string } | { type: "REMOVE"; id: string }
const listeners: Array<(s: State) => void> = []
let memoryState: State = { toasts: [] }
function dispatch(a: Action) {
  if (a.type === "ADD") memoryState = { toasts: [a.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT) }
  else if (a.type === "DISMISS") memoryState = { toasts: memoryState.toasts.filter(t => t.id !== a.id) }
  else if (a.type === "REMOVE") memoryState = { toasts: memoryState.toasts.filter(t => t.id !== a.id) }
  listeners.forEach(l => l(memoryState))
}
export function toast({ title, description, variant = "default", duration = 4000, action }: Omit<ToastProps, "id">) {
  const id = genId()
  dispatch({ type: "ADD", toast: { id, title, description, variant, duration, action } })
  if (duration) setTimeout(() => dispatch({ type: "DISMISS", id }), duration)
  return { id, dismiss: () => dispatch({ type: "DISMISS", id }) }
}
export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)
  React.useEffect(() => {
    listeners.push(setState)
    return () => { const i = listeners.indexOf(setState); if (i>-1) listeners.splice(i,1) }
  }, [])
  return { ...state, toast, dismiss: (id: string) => dispatch({ type: "DISMISS", id }) }
}
