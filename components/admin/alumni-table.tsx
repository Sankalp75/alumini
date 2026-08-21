"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { AlumniProfile } from "@/types/alumni";
import { MapPin } from "lucide-react";
import { collegeShortName } from "@/lib/colleges";

type SortKey = "name"|"college"|"batch"|"branch"|"company"|"createdAt";
export function AlumniTable({ profiles }: { profiles: AlumniProfile[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const toggleSort = (k: SortKey) => {
    if (sortKey===k) setAsc(!asc);
    else { setSortKey(k); setAsc(true); }
  };

  const sorted = useMemo(() => {
    const arr = [...profiles];
    arr.sort((a,b) => {
      let va: string|number = ""; let vb: string|number = "";
      if (sortKey==="name") { va=a.name; vb=b.name; }
      else if (sortKey==="college") { va=(a as unknown as { college?: string }).college||""; vb=(b as unknown as { college?: string }).college||""; }
      else if (sortKey==="batch") { va=a.batch; vb=b.batch; }
      else if (sortKey==="branch") { va=a.branch; vb=b.branch; }
      else if (sortKey==="company") { va=a.company||""; vb=b.company||""; }
      else if (sortKey==="createdAt") { va=a.createdAt?.toMillis?.()||0; vb=b.createdAt?.toMillis?.()||0; }
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [profiles, sortKey, asc]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice(page*pageSize, (page+1)*pageSize);

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#F8F7F5]">
              <TableHead className="cursor-pointer tabular-nums" onClick={()=>toggleSort("name")}>Alumni <ArrowUpDown className="ml-1 inline h-3 w-3"/></TableHead>
              <TableHead className="cursor-pointer" onClick={()=>toggleSort("college")}>College <ArrowUpDown className="ml-1 inline h-3 w-3"/></TableHead>
              <TableHead className="cursor-pointer tabular-nums" onClick={()=>toggleSort("batch")}>Batch</TableHead>
              <TableHead className="cursor-pointer" onClick={()=>toggleSort("branch")}>Branch</TableHead>
              <TableHead className="cursor-pointer" onClick={()=>toggleSort("company")}>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="cursor-pointer tabular-nums" onClick={()=>toggleSort("createdAt")}>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map(p=> {
              const col = (p as unknown as { college?: string }).college || "";
              const colOther = (p as unknown as { collegeOther?: string }).collegeOther || "";
              const displayCol = col==="Other" && colOther ? colOther : col ? collegeShortName(col) : "—";
              return (
              <TableRow key={p.uid} className="hover:bg-[#F8F7F5]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-7 w-7 rounded-none border border-[#E2DDD6]"><AvatarFallback className="bg-[#E8EDF3] text-[#1B3A5C] text-[11px] rounded-none">{p.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                    <div><p className="font-medium text-[#1A2332] leading-none">{p.name}</p><p className="text-xs tabular-nums text-[#4B5563]">{p.email}</p></div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[180px] truncate text-xs">{displayCol}</TableCell>
                <TableCell><Badge variant="batch" className="rounded-none text-[11px]">{p.batch}</Badge></TableCell>
                <TableCell><Badge variant={p.branch==="CSE"?"cse":p.branch==="ECE"?"ece":"generic"} className="rounded-none text-[11px]">{p.branch}</Badge></TableCell>
                <TableCell className="text-sm">{p.company || "—"}</TableCell>
                <TableCell><span className="inline-flex items-center gap-1 text-xs text-[#4B5563]">{p.location ? <><MapPin className="h-3 w-3 text-[#8B95A5]"/>{p.location}</> : "—"}</span></TableCell>
                <TableCell><Badge variant={p.role==="admin"?"admin":"alumni"} className="rounded-none text-[11px] uppercase tracking-wide">{p.role}</Badge></TableCell>
                <TableCell className="text-xs tabular-nums text-[#4B5563]">{p.createdAt?.toDate?.().toLocaleDateString?.("en-IN",{day:"numeric", month:"short", year:"numeric"}) || "—"}</TableCell>
                <TableCell><Link href={`/profile/${p.uid}`} className="text-xs font-semibold uppercase tracking-wide text-[#1B3A5C] underline underline-offset-4 hover:text-[#14304E]">View</Link></TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2DDD6] bg-[#F8F7F5] px-3 py-2">
        <p className="text-xs tabular-nums text-[#4B5563]">Showing {sorted.length ? page*pageSize+1 : 0}–{Math.min((page+1)*pageSize, sorted.length)} of {sorted.length}</p>
        <div className="flex items-center gap-1">
          <Button variant="secondary" size="sm" className="rounded-none h-7 px-2" disabled={page===0} onClick={()=>setPage(p=>p-1)}>Prev</Button>
          <span className="flex items-center gap-0.5 mx-1">{Array.from({length: Math.min(totalPages,5)}).map((_,i)=>(
            <button key={i} onClick={()=>setPage(i)} className={`h-7 w-7 border text-xs tabular-nums ${page===i?"bg-[#1B3A5C] text-white border-[#1B3A5C]":"bg-white border-[#E2DDD6] hover:bg-[#F1EFEA]"}`}>{i+1}</button>
          ))}</span>
          <Button variant="secondary" size="sm" className="rounded-none h-7 px-2" disabled={page+1>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
