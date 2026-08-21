import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="container py-12 space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-40 w-full" />
      <div className="grid grid-cols-3 gap-4"><Skeleton className="h-32"/><Skeleton className="h-32"/><Skeleton className="h-32"/></div>
    </div>
  );
}
