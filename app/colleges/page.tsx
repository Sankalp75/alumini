"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, GraduationCap, Users, Building2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PUNJAB_COLLEGES, collegeShortName, collegeCategory } from "@/lib/colleges";
import { getAllAlumniProfiles, collegeCounts } from "@/lib/firestore";
import type { AlumniProfile } from "@/types/alumni";

export default function CollegesPage() {
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    getAllAlumniProfiles()
      .then(list => { setProfiles(list); setLoadingCounts(false); })
      .catch(()=>setLoadingCounts(false));
    const t = setTimeout(()=> setLoadingCounts(false), 3000);
    return ()=> clearTimeout(t);
  }, []);

  const counts = useMemo(() => collegeCounts(profiles), [profiles]);
  const countMap = useMemo(() => new Map(counts.map(c=>[c.college, c.count])), [counts]);

  const filtered = useMemo(() => {
    if (!q) return PUNJAB_COLLEGES;
    const s = q.toLowerCase();
    return PUNJAB_COLLEGES.filter(c => c.toLowerCase().includes(s));
  }, [q]);

  const totalColleges = PUNJAB_COLLEGES.length;
  const withAlumni = counts.length;
  const totalAlumni = profiles.length;

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#1B3A5C] underline underline-offset-4">Home</Link> <span className="mx-1 text-[#C9C4BC]">/</span> <span className="text-[#1A2332] font-medium">Colleges</span>
          </nav>
          <div className="mt-3">
            <h1 className="font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Government engineering colleges in Punjab</h1>
            <p className="text-sm text-[#4B5563] max-w-[72ch]">DTE Punjab colleges plus NIT, IIT and centrally funded institutes in Punjab: NIT Jalandhar, IIT Ropar, PEC Chandigarh and SLIET Longowal. No “Other” needed. Every Punjab government engineering admission maps to a registered college.</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4 border-l-[3px] border-l-[#1B3A5C] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]"> Institutions</p><p className="font-heading text-[24px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{totalColleges}</p></Card>
            <Card className="p-4 border-l-[3px] border-l-[#C9A86A] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">With alumni</p><p className="font-heading text-[24px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{loadingCounts ? "…" : withAlumni}</p></Card>
            <Card className="p-4 border-l-[3px] border-l-[#2E7D6F] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">Total records</p><p className="font-heading text-[24px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{loadingCounts ? "…" : totalAlumni}</p></Card>
          </div>

          <div className="mt-4 border border-[#C9A86A] bg-[#FDF6E3] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#1A2332]">College not listed?</p>
              <p className="text-xs text-[#4B5563]">Official authorities (Principal/Registrar/Director) can request inclusion. Verified in 48 hours via AICTE/DTE.</p>
            </div>
            <Button asChild className="rounded-none shrink-0"><a href="/colleges/request">Register your college</a></Button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B95A5]" />
              <Input placeholder="Search college (e.g. IIT, NIT, PEC)…" value={q} onChange={e=>setQ(e.target.value)} className="pl-9 rounded-none h-9" aria-label="Search colleges" />
            </div>
            <div className="flex gap-2">
              <Button asChild className="rounded-none"><Link href="/register">Register with your college <ArrowRight className="h-4 w-4"/></Link></Button>
              <Button variant="secondary" asChild className="rounded-none"><Link href="/directory">View directory</Link></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(col => {
            const count = countMap.get(col) || 0;
            const cat = collegeCategory(col);
            const catColor = cat==="IIT" ? "bg-[#1B3A5C] text-white" : cat==="NIT" ? "bg-[#2E7D6F] text-white" : "bg-[#F8F7F5] text-[#4B5563] border border-[#E2DDD6]";
            return (
              <Card key={col} className="p-4 rounded-none border-l-[3px] border-l-[#E2DDD6] hover:border-l-[#1B3A5C] transition-colors flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-8 w-8 border border-[#E2DDD6] bg-[#F8F7F5] grid place-items-center shrink-0"><GraduationCap className="h-4 w-4 text-[#1B3A5C]" /></div>
                  <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-1 ${catColor}`}>{cat}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-[#1A2332]">{col}</h3>
                <p className="mt-1 text-xs text-[#4B5563] flex items-center gap-1"><Building2 className="h-3 w-3" />{cat==="IIT" ? "Ministry of Education, GoI, Rupnagar" : cat==="NIT" ? "Ministry of Education, GoI, Jalandhar" : "Government · DTE Punjab"}</p>
                <div className="mt-2">
                  <Badge variant={count>0 ? "alumni" : "generic"} className="rounded-none text-[11px] tabular-nums">{loadingCounts ? "…" : `${count} alumni`}</Badge>
                </div>
                <div className="mt-3 flex gap-2 pt-3 border-t border-[#F1EFEA]">
                  <Button size="sm" variant="secondary" asChild className="rounded-none h-7 text-xs flex-1"><Link href={`/directory?college=${encodeURIComponent(col)}`}>View alumni</Link></Button>
                  <Button size="sm" asChild className="rounded-none h-7 text-xs flex-1"><Link href={`/register?college=${encodeURIComponent(col)}`}>Register here</Link></Button>
                </div>
                {!loadingCounts && count>0 && <div className="mt-2 flex items-center gap-1 text-xs text-[#1F7A4A]"><Users className="h-3 w-3" />{count} verified records</div>}
              </Card>
            );
          })}
        </div>
        {filtered.length===0 && <p className="py-12 text-center text-sm text-[#4B5563] border border-dashed border-[#C9C4BC] bg-white mt-4">No colleges match “{q}”. Try “IIT”, “NIT” or “PEC”.</p>}
        <p className="mt-6 text-xs leading-relaxed text-[#8B95A5] border-t border-[#E2DDD6] pt-3 max-w-[80ch]">All NIT (Jalandhar), IIT (Ropar) and DTE Punjab government engineering colleges are registered. There is no IIIT inside Punjab. The nearest is IIIT Una, Himachal Pradesh, so no IIIT appears above. If your Punjab admission college is missing, ask your Principal or Registrar to <a href="/colleges/request" className="underline text-[#1B3A5C]">register the college</a>.</p>
      </div>
    </div>
  );
}
