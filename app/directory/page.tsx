"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useDebounce } from "@/hooks/use-debounce";
import { getAllAlumniProfiles } from "@/lib/firestore";
import type { AlumniProfile } from "@/types/alumni";
import { FilterPanel } from "@/components/alumni/filter-panel";
import { AlumniGrid } from "@/components/alumni/alumni-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function DirectoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("All");
  const [branch, setBranch] = useState("All");
  const [college, setCollege] = useState("All");
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    const col = searchParams.get("college");
    if (col) setCollege(col);
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    getAllAlumniProfiles().then(list => { setProfiles(list); setLoading(false); }).catch(()=>setLoading(false));
  }, [user]);

  const filtered = useMemo(() => {
    return profiles.filter(p => {
      if (batch !== "All" && p.batch !== batch) return false;
      if (branch !== "All" && p.branch !== branch) return false;
      const pc = (p as unknown as { college?: string }).college || "";
      if (college !== "All" && pc !== college) return false;
      if (debouncedSearch) {
        const s = debouncedSearch.toLowerCase();
        const colText = (pc + " " + ((p as unknown as { collegeOther?: string }).collegeOther || "")).toLowerCase();
        return p.name.toLowerCase().includes(s) || (p.company||"").toLowerCase().includes(s) || p.email.toLowerCase().includes(s) || colText.includes(s);
      }
      return true;
    });
  }, [profiles, batch, branch, college, debouncedSearch]);

  if (authLoading || (!user && loading)) {
    return <div className="container py-8"><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><Skeleton className="h-32"/><Skeleton className="h-32"/><Skeleton className="h-32"/><Skeleton className="h-32"/></div></div>;
  }

  const onClear = () => { setSearch(""); setBatch("All"); setBranch("All"); setCollege("All"); router.push("/directory"); };

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#1B3A5C] underline underline-offset-4">Home</Link> <span className="mx-1 text-[#C9C4BC]">/</span> <span className="text-[#1A2332] font-medium">Directory</span>
            <span className="mx-1 text-[#C9C4BC]">/</span> <Link href="/colleges" className="hover:text-[#1B3A5C] underline">Colleges</Link>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Alumni directory</h1>
              <p className="text-sm text-[#4B5563] max-w-[60ch]">Search by name, college, batch, or branch. All records are verified by the institution.</p>
            </div>
            <span className="inline-flex items-center border border-[#1B3A5C] bg-white px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-[#1B3A5C] tabular-nums">{filtered.length} records</span>
          </div>
        </div>
      </div>

      <FilterPanel search={search} onSearch={setSearch} batch={batch} onBatch={setBatch} branch={branch} onBranch={setBranch} college={college} onCollege={setCollege} count={filtered.length} onClear={onClear} />

      <div className="container py-6">
        <AlumniGrid profiles={filtered} loading={loading} onClear={onClear} />
        <p className="mt-6 text-xs text-[#8B95A5] border-t border-[#E2DDD6] pt-3">Showing {filtered.length} of {profiles.length} records. Filter by college to see peers from your institution. <Link href="/colleges" className="text-[#1B3A5C] underline">View all colleges</Link></p>
      </div>
    </div>
  );
}
