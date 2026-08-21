"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { PUNJAB_COLLEGES, collegeShortName } from "@/lib/colleges";

export function FilterPanel({
  search, onSearch,
  batch, onBatch,
  branch, onBranch,
  college, onCollege,
  onClear,
  count
}: {
  search: string; onSearch: (v:string)=>void;
  batch: string; onBatch: (v:string)=>void;
  branch: string; onBranch: (v:string)=>void;
  college: string; onCollege: (v:string)=>void;
  onClear: ()=>void;
  count: number;
}) {
  const hasFilter = batch!=="All" || branch!=="All" || college!=="All" || search!=="";
  const batches = ["All", ...Array.from({length: 9}, (_,i)=> String(2018+i))];
  const branches = ["All","CSE","ECE","ME","CE","EE","IT","Other"];
  const colleges = ["All", ...PUNJAB_COLLEGES];
  return (
    <div className="bg-white border-b border-[#E2DDD6] py-3 sticky top-14 z-30">
      <div className="container flex flex-col xl:flex-row gap-3 items-start xl:items-center">
        <div className="relative w-full xl:max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B95A5]" />
          <Input placeholder="Search by name, college or company…" value={search} onChange={e=>onSearch(e.target.value)} className="pl-9 rounded-none h-9" aria-label="Search alumni" />
        </div>
        <Select value={college} onValueChange={onCollege}>
          <SelectTrigger className="w-full xl:w-[220px] rounded-none h-9"><SelectValue placeholder="College"/></SelectTrigger>
          <SelectContent className="rounded-none max-h-[260px]">{colleges.map(b=> <SelectItem key={b} value={b}>{b==="All"?"All colleges": b==="Other" ? "Other" : collegeShortName(b)}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={batch} onValueChange={onBatch}>
          <SelectTrigger className="w-full xl:w-[140px] rounded-none h-9"><SelectValue placeholder="Batch"/></SelectTrigger>
          <SelectContent className="rounded-none">{batches.map(b=> <SelectItem key={b} value={b}>{b==="All"?"All batches":b}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={branch} onValueChange={onBranch}>
          <SelectTrigger className="w-full xl:w-[140px] rounded-none h-9"><SelectValue placeholder="Branch"/></SelectTrigger>
          <SelectContent className="rounded-none">{branches.map(b=> <SelectItem key={b} value={b}>{b==="All"?"All branches":b}</SelectItem>)}</SelectContent>
        </Select>
        {hasFilter && <Button variant="ghost" size="sm" onClick={onClear} className="rounded-none">Clear all</Button>}
        <div className="ml-auto flex items-center gap-2">
          {hasFilter && <div className="hidden sm:flex gap-1.5 flex-wrap">
            {college!=="All" && <Badge variant="batch" className="rounded-none cursor-pointer" onClick={()=>onCollege("All")}>{collegeShortName(college)} <X className="h-3 w-3 ml-1"/></Badge>}
            {batch!=="All" && <Badge variant="batch" className="rounded-none cursor-pointer" onClick={()=>onBatch("All")}>{batch} <X className="h-3 w-3 ml-1"/></Badge>}
            {branch!=="All" && <Badge variant="cse" className="rounded-none cursor-pointer" onClick={()=>onBranch("All")}>{branch} <X className="h-3 w-3 ml-1"/></Badge>}
          </div>}
          <span className="text-xs tabular-nums text-[#4B5563] border border-[#E2DDD6] bg-[#F8F7F5] px-2 py-1 whitespace-nowrap">{count} records</span>
        </div>
      </div>
    </div>
  );
}
