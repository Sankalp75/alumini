import * as React from "react"
import { cn } from "@/lib/utils"
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { error?: boolean }
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, ...props }, ref) => {
  return <textarea className={cn("flex min-h-[96px] w-full rounded-[10px] border bg-white p-3 text-sm text-[#1A2332] placeholder:text-[#8B95A5] focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-[#F1EFEA] transition-colors", error ? "border-[#C0392B] bg-[#FDECEA] focus:border-[#C0392B] focus:ring-[#C0392B]/20" : "border-[#E2DDD6] focus:border-[#2E7D6F] focus:ring-[#2E7D6F]", className)} ref={ref} {...props} />
})
Textarea.displayName = "Textarea"
export { Textarea }
