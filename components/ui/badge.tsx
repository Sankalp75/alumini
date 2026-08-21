import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide border transition-colors", {
  variants: {
    variant: {
      batch: "bg-[#E8EDF3] text-[#1B3A5C] border-[#D1D9E6]",
      cse: "bg-[#E6F2EF] text-[#2E7D6F] border-[#BFE0D8]",
      ece: "bg-[#FDF6E3] text-[#8A6D1B] border-[#F5E6B8]",
      generic: "bg-[#F1EFEA] text-[#4B5563] border-[#E2DDD6]",
      alumni: "bg-[#E6F4EA] text-[#1F7A4A] border-[#B7E0C5]",
      admin: "bg-[#E8EDF3] text-[#1B3A5C] border-[#B9C9E0]",
      success: "bg-[#E6F4EA] text-[#1F7A4A] border-[#B7E0C5]",
      warning: "bg-[#FEF3C7] text-[#B7791F] border-[#F5E6B8]",
      error: "bg-[#FDECEA] text-[#C0392B] border-[#F0B8B0]",
    }
  },
  defaultVariants: { variant: "generic" }
})
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(badgeVariants({ variant }), className)} {...props} /> }
export { Badge, badgeVariants }
