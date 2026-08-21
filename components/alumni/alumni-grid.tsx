import { AlumniCard, AlumniCardSkeleton } from "./alumni-card";
import type { AlumniProfile } from "@/types/alumni";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AlumniGrid({ profiles, loading, onClear }: { profiles: AlumniProfile[]; loading?: boolean; onClear?: ()=>void }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({length:8}).map((_,i)=><AlumniCardSkeleton key={i}/>)}
      </div>
    );
  }
  if (profiles.length===0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto border border-dashed border-[#C9C4BC] bg-white p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-[#E2DDD6] bg-[#F8F7F5]"><Users className="h-6 w-6 text-[#8B95A5]"/></div>
        <h3 className="font-heading text-lg font-semibold text-[#1A2332]">No alumni found</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#4B5563] mx-auto">No one matches your current search. Try a different name, or clear batch and branch.</p>
        {onClear && <Button variant="secondary" size="sm" className="mt-4 rounded-none" onClick={onClear}>Clear filters</Button>}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {profiles.map((p)=> (
        <AlumniCard key={p.uid} profile={p} />
      ))}
    </div>
  );
}
