"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { getAllAlumniProfiles, getCollegeRequests, updateCollegeRequestStatus } from "@/lib/firestore";
import type { AlumniProfile } from "@/types/alumni";
import type { CollegeRequest } from "@/types/college";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlumniTable } from "@/components/admin/alumni-table";
import { AlumniCardsMobile } from "@/components/admin/alumni-cards-mobile";
import { ExportButton } from "@/components/admin/export-button";
import { Search, Building2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [requests, setRequests] = useState<CollegeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else if (!isAdmin) { router.push("/directory"); }
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      Promise.all([getAllAlumniProfiles(), getCollegeRequests()]).then(([list, reqs])=>{ setProfiles(list); setRequests(reqs); setLoading(false); }).catch(()=>setLoading(false));
    }
  }, [user, isAdmin]);

  const filtered = useMemo(() => {
    if (!search) return profiles;
    const s=search.toLowerCase();
    return profiles.filter(p=> p.name.toLowerCase().includes(s) || p.email.toLowerCase().includes(s) || (p.company||"").toLowerCase().includes(s));
  }, [profiles, search]);

  const batches = new Set(profiles.map(p=>p.batch)).size;
  const branches = new Set(profiles.map(p=>p.branch)).size;
  const pending = requests.filter(r=> r.status==="pending");

  const handleReq = async (id: string, status: "approved" | "rejected") => {
    try { await updateCollegeRequestStatus(id, status); setRequests(rs=> rs.map(r=> r.id===id ? {...r, status} : r)); toast({ title: status==="approved" ? "College approved" : "Request rejected", variant: status==="approved" ? "success" : "default" }); } catch (e: unknown) { toast({ title: "Update failed", description: e instanceof Error ? e.message : String(e), variant: "error" }); }
  };

  if (authLoading || loading) {
    return <div className="container py-8 space-y-3"><Skeleton className="h-8 w-1/3"/><Skeleton className="h-24 w-full"/><Skeleton className="h-40 w-full"/></div>;
  }
  if (!isAdmin) {
    return <div className="container py-12"><Alert variant="destructive"><AlertTitle>Access denied</AlertTitle><AlertDescription>Admin access required. Redirecting.</AlertDescription></Alert></div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#1B3A5C] underline underline-offset-4">Home</Link> <span className="mx-1 text-[#C9C4BC]">/</span> <span className="text-[#1A2332] font-medium">Admin</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Admin dashboard</h1>
              <p className="text-sm text-[#4B5563]">All alumni records. Searchable, sortable, export-ready. {pending.length>0 && `${pending.length} college requests pending.`}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="admin" className="rounded-none uppercase tracking-wide text-[11px]">Admin access</Badge>
              <ExportButton profiles={filtered} />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
          <Card className="p-4 border-l-[3px] border-l-[#1B3A5C] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">Total alumni</p><p className="font-heading text-[28px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{profiles.length}</p></Card>
          <Card className="p-4 border-l-[3px] border-l-[#C9A86A] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">Batches</p><p className="font-heading text-[28px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{batches}</p></Card>
          <Card className="p-4 border-l-[3px] border-l-[#2E7D6F] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">Branches</p><p className="font-heading text-[28px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{branches}</p></Card>
          <Card className="p-4 border-l-[3px] border-l-[#C9A86A] rounded-none"><p className="text-xs uppercase tracking-wide text-[#4B5563]">College requests</p><p className="font-heading text-[28px] font-bold leading-none tabular-nums text-[#1B3A5C] mt-1">{pending.length}</p><p className="text-xs text-[#8B95A5]">{requests.length} total</p></Card>
        </div>

        {pending.length>0 && (
          <Card className="p-4 mb-6 rounded-none border-l-[3px] border-l-[#C9A86A]">
            <h2 className="font-semibold text-[#1A2332] flex items-center gap-2"><Building2 className="h-4 w-4" /> College registration requests: pending verification</h2>
            <p className="text-xs text-[#4B5563]">Verify via official email + AICTE/DTE. Approve to add to sign-up list.</p>
            <div className="mt-4 space-y-3">
              {pending.map(r=> (
                <div key={r.id} className="border border-[#E2DDD6] bg-[#F8F7F5] p-3 flex flex-col sm:flex-row gap-3 justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1A2332]">{r.collegeName}</p>
                    <p className="text-xs text-[#4B5563]">{r.affiliation} • {r.district} • {r.address}</p>
                    <p className="text-xs text-[#4B5563] mt-1">{r.authorityDesignation} {r.authorityName} · {r.authorityEmail} · {r.authorityPhone} {r.aicteCode && `· AICTE ${r.aicteCode}`}</p>
                    {r.officialWebsite && <a href={r.officialWebsite} target="_blank" className="text-xs text-[#1B3A5C] underline">{r.officialWebsite}</a>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" className="rounded-none h-8" onClick={()=>handleReq(r.id, "approved")}><Check className="h-4 w-4" /> Approve</Button>
                    <Button size="sm" variant="secondary" className="rounded-none h-8" onClick={()=>handleReq(r.id, "rejected")}><X className="h-4 w-4" /> Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3 py-3 items-end">
          <label className="flex-1 max-w-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">Search records</span>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B95A5]"/>
              <Input placeholder="Name, email, company…" value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 rounded-none h-9" />
            </div>
          </label>
          <span className="text-xs tabular-nums text-[#4B5563] border border-[#E2DDD6] bg-white px-3 py-2">{filtered.length} records</span>
        </div>

        <div className="hidden md:block bg-white border border-[#E2DDD6] overflow-hidden">
          <AlumniTable profiles={filtered} />
        </div>
        <AlumniCardsMobile profiles={filtered} />
        <p className="mt-4 text-xs text-[#8B95A5]">Export downloads a CSV of the filtered view. For audits, filter then export.</p>
      </div>
    </div>
  );
}
