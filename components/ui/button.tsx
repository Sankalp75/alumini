import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[10px] text-sm font-semibold transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-[#1B3A5C] text-white hover:bg-[#14304E] active:bg-[#0F243C] shadow-brand hover:shadow-brand-hover focus-visible:ring-[#2E7D6F] disabled:bg-[#E2DDD6] disabled:text-[#8B95A5]",
        secondary: "bg-white text-[#1B3A5C] border border-[#E2DDD6] hover:bg-[#F8F7F5] hover:border-[#C9C4BC] active:bg-[#F1EFEA] focus-visible:ring-[#2E7D6F]",
        ghost: "bg-transparent text-[#4B5563] hover:bg-[#F1EFEA] hover:text-[#1A2332] active:bg-[#EDE9E3] focus-visible:ring-[#2E7D6F]",
        destructive: "bg-[#C0392B] text-white hover:bg-[#A93226] active:bg-[#922B21] focus-visible:ring-[#C0392B]",
        link: "bg-transparent text-[#2E7D6F] underline-offset-4 hover:underline hover:text-[#256A5E] active:text-[#1F5D52] focus-visible:ring-[#2E7D6F] h-auto p-0",
      },
      size: {
        sm: "h-8 px-3.5 py-2 text-[13px]",
        md: "h-10 px-5 py-2.5 text-[14px]",
        lg: "h-12 px-7 py-3.5 text-[16px]",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"
export { Button, buttonVariants }
