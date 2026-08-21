import Link from "next/link";
import { MapPin, Linkedin, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AlumniProfile } from "@/types/alumni";
import { collegeShortName, collegeCategory } from "@/lib/colleges";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0,2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length-1]![0]!).toUpperCase();
}
function avatarColors(name: string) {
  const colors: [string,string][] = [
    ["#E8EDF3","#1B3A5C"], ["#E6F2EF","#2E7D6F"], ["#FDF6E3","#8A6D1B"], ["#FDECEA","#922B21"], ["#EDE9E3","#4B5563"], ["#E6F4EA","#1F7A4A"]
  ];
  let h=0; for(let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) % colors.length;
  return colors[h]!;
}
function branchVariant(branch: string) {
  if (branch==="CSE") return "cse" as const;
  if (branch==="ECE") return "ece" as const;
  return "generic" as const;
}

export function AlumniCard({ profile }: { profile: AlumniProfile }) {
  const [bg, fg] = avatarColors(profile.name);
  const college = (profile as unknown as { college?: string }).college || "";
  const displayCollege = college ? collegeShortName(college) : "";
  const cat = college ? collegeCategory(college) : "Government";
  return (
    <Link href={`/profile/${profile.uid}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D6F] focus-visible:ring-offset-2">
      <Card className="p-4 flex flex-col gap-2.5 border-l-[3px] border-l-[#C9A86A] hover:border-[#E2DDD6] hover:border-l-[#1B3A5C] transition-colors">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border border-[#E2DDD6] rounded-none">
            {profile.photoURL ? <AvatarImage src={profile.photoURL} className="rounded-none" /> : null}
            <AvatarFallback style={{ background: bg, color: fg }} className="text-sm font-semibold rounded-none">{initials(profile.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight text-[#1A2332] truncate group-hover:text-[#1B3A5C]">{profile.name}</h3>
            <p className="text-xs tracking-wide text-[#4B5563]">{profile.batch} • {profile.branch}</p>
          </div>
          <span className="hidden sm:inline h-2 w-2 rounded-full bg-[#1F7A4A] mt-2" aria-hidden />
        </div>
        {displayCollege && <p className="flex items-center gap-1 text-xs leading-tight text-[#1B3A5C] font-medium border border-[#E8EDF3] bg-[#F8FAFC] px-2 py-1 truncate"><GraduationCap className="h-3 w-3 text-[#8B95A5] shrink-0" />{displayCollege}<span className="ml-auto text-[10px] font-semibold tracking-wide uppercase border px-1 py-0.5 bg-white text-[#4B5563] border-[#E2DDD6]">{cat}</span></p>}
        <div className="flex gap-1.5">
          <Badge variant="batch" className="rounded-none text-[11px] px-2 py-0.5">{profile.batch}</Badge>
          <Badge variant={branchVariant(profile.branch)} className="rounded-none text-[11px] px-2 py-0.5">{profile.branch}</Badge>
        </div>
        <div className="min-h-[40px]">
          {profile.company && <p className="text-sm font-medium text-[#1A2332] truncate">{profile.company}</p>}
          {profile.location && <p className="flex items-center gap-1 text-xs text-[#4B5563]"><MapPin className="h-3 w-3 shrink-0 text-[#8B95A5]"/>{profile.location}</p>}
        </div>
        <div className="flex items-center justify-between border-t border-[#F1EFEA] pt-3 mt-auto">
          {profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} className="inline-flex h-7 w-7 items-center justify-center border border-[#E2DDD6] text-[#2E7D6F] hover:bg-[#F1EFEA] hover:text-[#1B3A5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D6F]" aria-label={`LinkedIn profile for ${profile.name}`}><Linkedin className="h-4 w-4"/></a> : <span/>}
          <span className="text-xs font-semibold tracking-wide uppercase text-[#1B3A5C] group-hover:underline underline-offset-4">View record</span>
        </div>
      </Card>
    </Link>
  );
}

export function AlumniCardSkeleton() {
  return (
    <Card className="p-4 border-l-[3px] border-l-[#E2DDD6]">
      <div className="flex gap-3">
        <div className="h-10 w-10 bg-[#EDE9E3] animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 bg-[#EDE9E3] animate-pulse" />
          <div className="h-2 w-1/2 bg-[#F1EFEA] animate-pulse" />
        </div>
      </div>
      <div className="mt-3 h-3 w-full bg-[#F1EFEA] animate-pulse" />
      <div className="mt-2 h-2 w-2/3 bg-[#F1EFEA] animate-pulse" />
    </Card>
  );
}
