import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { AlumniProfile } from "@/types/alumni";
import { MapPin, GraduationCap } from "lucide-react";
import { collegeShortName } from "@/lib/colleges";

export function AlumniCardsMobile({ profiles }: { profiles: AlumniProfile[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:hidden">
      {profiles.map(p=> {
        const col = (p as unknown as { college?: string }).college || "";
        const colOther = (p as unknown as { collegeOther?: string }).collegeOther || "";
        const displayCol = col==="Other" && colOther ? colOther : col ? collegeShortName(col) : "—";
        return (
        <Card key={p.uid} className="p-3 border-l-[3px] border-l-[#C9A86A] rounded-none">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 rounded-none border border-[#E2DDD6]"><AvatarFallback className="bg-[#E8EDF3] text-[#1B3A5C] text-xs rounded-none">{p.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1A2332] truncate leading-none">{p.name}</p>
              <p className="text-xs tabular-nums text-[#4B5563] truncate">{p.email}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#1B3A5C] border border-[#E8EDF3] bg-[#F8FAFC] px-2 py-1 truncate"><GraduationCap className="h-3 w-3 shrink-0"/>{displayCol}</p>
              <div className="mt-2 flex gap-1.5"><Badge variant="batch" className="rounded-none text-[11px]">{p.batch}</Badge><Badge variant="generic" className="rounded-none text-[11px]">{p.branch}</Badge></div>
              <p className="mt-2 text-sm text-[#1A2332]">{p.company || "—"}</p>
              <p className="flex items-center gap-1 text-xs text-[#4B5563]"><MapPin className="h-3 w-3 text-[#8B95A5]"/>{p.location || "—"}</p>
            </div>
          </div>
          <Link href={`/profile/${p.uid}`} className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-[#1B3A5C] underline underline-offset-4">View record</Link>
        </Card>
      )})}
    </div>
  );
}
