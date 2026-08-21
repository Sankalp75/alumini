"use client";
import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
export function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const Icon = variant === "success" ? CheckCircle : variant === "error" ? AlertCircle : variant === "warning" ? AlertTriangle : variant === "info" ? Info : null
        return (
          <Toast key={id} variant={variant as never} {...props}>
            {Icon && <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${variant==="success"?"text-[#1F7A4A]": variant==="error"?"text-[#C0392B]": variant==="warning"?"text-[#B7791F]":"text-[#2B6CB0]"}`} />}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
