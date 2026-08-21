"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Linkedin, Mail, Building, Calendar, Phone, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getAlumniProfile, updateAlumniProfile } from "@/lib/firestore";
import type { AlumniProfile } from "@/types/alumni";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PUNJAB_COLLEGES, collegeShortName } from "@/lib/colleges";

function initials(name: string) {
  const p=name.trim().split(/\s+/);
  if(p.length===1) return p[0]!.slice(0,2).toUpperCase();
  return (p[0]![0]!+p[p.length-1]![0]!).toUpperCase();
}

export default function ProfilePage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<AlumniProfile>>({});
  const [saving, setSaving] = useState(false);

  const isOwn = user?.uid === id;

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!id) return;
    getAlumniProfile(id).then(p => {
      if (!p) setNotFound(true);
      else { setProfile(p); setForm(p as never); }
      setLoading(false);
    }).catch(()=>{ setNotFound(true); setLoading(false); });
  }, [id]);

  const handleSave = async () => {
    if (!profile || !isOwn) return;
    const college = (form as unknown as { college?: string }).college;
    if (!college) { toast({ title: "Select college", variant: "error" }); return; }
    setSaving(true);
    try {
      await updateAlumniProfile(id, {
        name: form.name,
        batch: form.batch,
        branch: form.branch as never,
        college: college,
        company: form.company || "",
        location: form.location || "",
        contact: form.contact || "",
        linkedinUrl: form.linkedinUrl || "",
      } as Partial<AlumniProfile>);
      setProfile({ ...profile, ...form } as AlumniProfile);
      setEditing(false);
      toast({ title: "Profile updated", description: "Your changes are now visible in the directory.", variant: "success" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to update";
      toast({ title: "Update failed", description: msg, variant: "error" });
    } finally { setSaving(false); }
  };

  if (loading || authLoading) {
    return <div className="container py-8"><div className="flex gap-6"><Skeleton className="h-16 w-16"/><div className="space-y-2 flex-1"><Skeleton className="h-5 w-1/3"/><Skeleton className="h-4 w-1/2"/></div></div></div>;
  }
  if (notFound || !profile) {
    return <div className="container py-12"><Alert><AlertTitle>Profile not found</AlertTitle><AlertDescription>The profile you are looking for does not exist. <Link href="/directory" className="underline text-[#1B3A5C]">Back to directory</Link></AlertDescription></Alert></div>;
  }

  const college = (profile as unknown as { college?: string }).college || "";
  const displayCollege = college || "Not listed";

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <Link href="/directory" className="inline-flex items-center gap-1 text-xs font-medium tracking-wide uppercase text-[#4B5563] hover:text-[#1B3A5C] underline underline-offset-4"><ArrowLeft className="h-3 w-3"/> Back to directory</Link>
          <div className="mt-4 flex flex-col sm:flex-row gap-5 items-start">
            <Avatar className="h-16 w-16 border border-[#E2DDD6] rounded-none">
              {profile.photoURL ? <AvatarImage src={profile.photoURL} className="rounded-none"/> : null}
              <AvatarFallback className="bg-[#1B3A5C] text-white text-lg font-bold rounded-none">{initials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-[26px] font-bold leading-none tracking-tight text-[#1A2332]">{profile.name}</h1>
                <Badge variant="batch" className="rounded-none text-[11px]">{profile.batch}</Badge>
                <Badge variant={profile.branch==="CSE"?"cse":profile.branch==="ECE"?"ece":"generic"} className="rounded-none text-[11px]">{profile.branch}</Badge>
                <Badge variant={profile.role==="admin"?"admin":"alumni"} className="rounded-none text-[11px] uppercase tracking-wide">{profile.role}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#1B3A5C]"><GraduationCap className="h-4 w-4 text-[#4B5563]"/>{displayCollege}</p>
              {profile.company && <p className="flex items-center gap-1.5 text-sm font-medium text-[#1A2332]"><Building className="h-4 w-4 text-[#4B5563]"/>{profile.company}</p>}
              {profile.location && <p className="flex items-center gap-1.5 text-sm text-[#4B5563]"><MapPin className="h-3 w-3"/>{profile.location}</p>}
              <div className="mt-2 flex flex-wrap gap-2 text-xs tabular-nums">
                {isOwn && <span className="inline-flex items-center gap-1 border border-[#E2DDD6] bg-[#F8F7F5] px-2 py-1 text-[#4B5563]"><Mail className="h-3 w-3"/>{profile.email}</span>}
                {profile.contact && <span className="inline-flex items-center gap-1 border border-[#E2DDD6] bg-[#F8F7F5] px-2 py-1 text-[#4B5563]"><Phone className="h-3 w-3"/>{profile.contact}</span>}
                {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 border border-[#1B3A5C] px-2 py-1 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white"><Linkedin className="h-3 w-3"/> LinkedIn</a>}
              </div>
            </div>
            {isOwn && !editing && <Button size="sm" onClick={()=>setEditing(true)} className="rounded-none w-full sm:w-auto">Edit profile</Button>}
            {isOwn && editing && <div className="flex gap-2 w-full sm:w-auto"><Button variant="ghost" size="sm" className="rounded-none" onClick={()=>{setEditing(false); setForm(profile as never);}}>Cancel</Button><Button size="sm" className="rounded-none" disabled={saving} onClick={handleSave}>{saving?"Saving…":"Save"}</Button></div>}
            {!isOwn && profile.linkedinUrl && <Button variant="secondary" size="sm" asChild className="rounded-none"><a href={profile.linkedinUrl} target="_blank">Connect on LinkedIn</a></Button>}
          </div>
        </div>
      </div>

      <div className="container py-6">
        {!editing ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5 h-fit rounded-none border-l-[3px] border-l-[#C9A86A]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">About</p>
              <p className="mt-2 text-sm leading-relaxed text-[#1A2332]">Batch {profile.batch}, {profile.branch} at {collegeShortName(displayCollege)}. Verified by the institution.</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs tabular-nums text-[#4B5563] border border-[#E2DDD6] bg-[#F8F7F5] px-2 py-1"><Calendar className="h-3 w-3"/> Member since {profile.createdAt?.toDate?.().toLocaleDateString?.("en-IN",{month:"short", year:"numeric"}) || "recently"}</p>
            </Card>
            <Card className="md:col-span-2 p-5 rounded-none">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">Details</p>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-[#F1EFEA] border-t border-[#F1EFEA]">
                {[
                  ["College", displayCollege],
                  ["Batch", profile.batch],
                  ["Branch", profile.branch],
                  ["Company", profile.company || "Not listed"],
                  ["Location", profile.location || "Not listed"],
                  ["Contact", profile.contact || "Not listed"],
                  ["LinkedIn", profile.linkedinUrl ? profile.linkedinUrl : "Not listed"],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between sm:block py-3 border-b sm:border-b-0 border-[#F1EFEA]">
                    <dt className="text-xs uppercase tracking-wide text-[#8B95A5]">{k}</dt>
                    <dd className="text-sm font-medium text-[#1A2332] tabular-nums truncate max-w-[60%] sm:max-w-none">{k==="LinkedIn" && profile.linkedinUrl ? <a className="text-[#1B3A5C] underline underline-offset-4 break-all" href={profile.linkedinUrl} target="_blank">{v}</a> : v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        ) : (
          <Card className="p-5 rounded-none">
            <p className="text-sm font-semibold text-[#1A2332]">Edit your profile</p>
            <p className="text-xs text-[#4B5563]">Changes appear in the directory and colleges listing immediately.</p>
            <div className="mt-4 grid gap-4">
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Full name</Label><Input value={form.name||""} onChange={e=>setForm({...form, name:e.target.value})} className="rounded-none h-9" /></div>
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">College</Label>
                <Select value={(form as unknown as { college?: string }).college || ""} onValueChange={v=>setForm({...form, college: v} as never)}><SelectTrigger className="rounded-none h-9"><SelectValue placeholder="Select college"/></SelectTrigger><SelectContent className="rounded-none max-h-[260px]">{PUNJAB_COLLEGES.map(c=> <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Batch</Label>
                  <Select value={form.batch} onValueChange={v=>setForm({...form, batch:v})}><SelectTrigger className="rounded-none h-9"><SelectValue placeholder="Batch"/></SelectTrigger><SelectContent className="rounded-none">{Array.from({length: 10}, (_,i)=> String(2018+i)).map(b=> <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Branch</Label>
                  <Select value={form.branch as string} onValueChange={v=>setForm({...form, branch: v as never})}><SelectTrigger className="rounded-none h-9"><SelectValue/></SelectTrigger><SelectContent className="rounded-none">{["CSE","ECE","ME","CE","EE","IT","Other"].map(b=> <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
                </div>
              </div>
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Company</Label><Input value={form.company||""} onChange={e=>setForm({...form, company:e.target.value})} className="rounded-none h-9" /></div>
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Location</Label><Input value={form.location||""} onChange={e=>setForm({...form, location:e.target.value})} className="rounded-none h-9" /></div>
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">Contact</Label><Input value={form.contact||""} onChange={e=>setForm({...form, contact:e.target.value})} className="rounded-none h-9" /></div>
              <div className="space-y-1"><Label className="text-xs uppercase tracking-wide">LinkedIn URL</Label><Input value={form.linkedinUrl||""} onChange={e=>setForm({...form, linkedinUrl:e.target.value})} className="rounded-none h-9" /></div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#E2DDD6] mt-2"><Button variant="ghost" size="sm" className="rounded-none" onClick={()=>{setEditing(false); setForm(profile as never);}}>Cancel</Button><Button size="sm" className="rounded-none" onClick={handleSave} disabled={saving}>{saving?"Saving…":"Save changes"}</Button></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
