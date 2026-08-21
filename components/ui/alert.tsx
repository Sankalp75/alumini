import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const alertVariants = cva("relative w-full rounded-xl border p-4 flex gap-3 [&>svg]:h-5 [&>svg]:w-5", {
  variants: {
    variant: {
      default: "bg-white text-[#1A2332] border-[#E2DDD6]",
      destructive: "border-[#F0B8B0] bg-[#FDECEA] text-[#922B21]",
      success: "border-[#B7E0C5] bg-[#E6F4EA] text-[#1F7A4A]",
      warning: "border-[#F5E6B8] bg-[#FEF3C7] text-[#8A6D1B]",
      info: "border-[#B9C9E0] bg-[#EBF4FF] text-[#2B6CB0]",
    }
  },
  defaultVariants: { variant: "default" }
})
const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (<h5 ref={ref} className={cn("font-semibold text-sm", className)} {...props} />))
AlertTitle.displayName = "AlertTitle"
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (<div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />))
AlertDescription.displayName = "AlertDescription"
export { Alert, AlertTitle, AlertDescription }
