import { cn } from "@/lib/utils"
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-[#EDE9E3]", className)} {...props} />
}
export { Skeleton }
