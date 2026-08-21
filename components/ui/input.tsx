import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { error?: boolean }
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return <input type={type} className={cn("flex h-10 w-full rounded-[10px] border bg-white px-3.5 py-2.5 text-sm text-[#1A2332] placeholder:text-[#8B95A5] focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-[#F1EFEA] disabled:text-[#8B95A5] transition-colors", error ? "border-[#C0392B] bg-[#FDECEA] focus:border-[#C0392B] focus:ring-[#C0392B]/20" : "border-[#E2DDD6] focus:border-[#2E7D6F] focus:ring-[#2E7D6F]", className)} ref={ref} {...props} />
})
Input.displayName = "Input"
export { Input }
