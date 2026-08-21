"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, ShieldCheck, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { createCollegeRequest } from "@/lib/firestore";

const districts = ["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Malerkotla","Mansa","Moga","Mohali (SAS Nagar)","Muktsar","Nawanshahr (SBS Nagar)","Pathankot","Patiala","Rupnagar","Sangrur","Tarn Taran"];
const affiliations = ["IKGPTU Jalandhar","MRSPTU Bathinda","Panjab University","Punjabi University Patiala","GNDU Amritsar","Autonomous / Deemed University","AICTE Direct"];

export default function CollegeRequestPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    collegeName: "", affiliation: "", district: "", address: "", aicteCode: "",
    authorityName: "", authorityDesignation: "", authorityEmail: "", authorityPhone: "", officialWebsite: ""
  });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (form.collegeName.trim().length < 5) e.collegeName = "College name required (min 5 chars)";
    if (!form.affiliation) e.affiliation = "Affiliation required";
    if (!form.district) e.district = "District required";
    if (form.address.trim().length < 10) e.address = "Full address required";
    if (form.authorityName.trim().length < 2) e.authorityName = "Authority name required";
    if (form.authorityDesignation.trim().length < 2) e.authorityDesignation = "Designation required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.authorityEmail)) e.authorityEmail = "Valid official email required";
    if (!/^\d{10,15}$/.test(form.authorityPhone)) e.authorityPhone = "10-15 digit phone required";
    if (form.officialWebsite && !/^https?:\/\/.+\..+/.test(form.officialWebsite)) e.officialWebsite = "Enter valid URL with https://";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await createCollegeRequest({
        collegeName: form.collegeName.trim(),
        affiliation: form.affiliation,
        district: form.district,
        address: form.address.trim(),
        aicteCode: form.aicteCode.trim(),
        authorityName: form.authorityName.trim(),
        authorityDesignation: form.authorityDesignation.trim(),
        authorityEmail: form.authorityEmail.trim().toLowerCase(),
        authorityPhone: form.authorityPhone.trim(),
        officialWebsite: form.officialWebsite.trim(),
        requestedBy: user?.uid,
      });
      setSuccess(true);
      toast({ title: "Request submitted", description: "Your college will be verified by the Directorate and added within 48 hours.", variant: "success" });
      setForm({ collegeName: "", affiliation: "", district: "", address: "", aicteCode: "", authorityName: "", authorityDesignation: "", authorityEmail: "", authorityPhone: "", officialWebsite: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit";
      toast({ title: "Submission failed", description: msg, variant: "error" });
    } finally { setSaving(false); }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F7F5]">
        <div className="container py-12">
          <Card className="max-w-2xl mx-auto p-8 rounded-none border-l-[3px] border-l-[#1F7A4A] text-center">
            <div className="mx-auto h-12 w-12 border border-[#B7E0C5] bg-[#E6F4EA] grid place-items-center"><ShieldCheck className="h-6 w-6 text-[#1F7A4A]" /></div>
            <h1 className="mt-4 font-heading text-2xl font-bold text-[#1A2332]">Request received — under verification</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563] max-w-[60ch] mx-auto">Your college registration has been queued for verification by the Directorate of Technical Education, Punjab. You will receive an email at <span className="font-medium text-[#1A2332]">{form.authorityEmail || "your official email"}</span> once approved. Approved colleges appear instantly in the <Link href="/colleges" className="underline text-[#1B3A5C]">colleges list</Link> and in the sign-up form.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild className="rounded-none"><Link href="/colleges">Back to colleges</Link></Button>
              <Button variant="secondary" asChild className="rounded-none"><Link href="/register">Register as alumni</Link></Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <Link href="/colleges" className="inline-flex items-center gap-1 text-xs font-medium tracking-wide uppercase text-[#4B5563] hover:text-[#1B3A5C] underline underline-offset-4"><ArrowLeft className="h-3 w-3"/> Back to colleges</Link>
          <div className="mt-3 max-w-3xl">
            <h1 className="font-heading text-[26px] font-bold tracking-tight text-[#1A2332]">Register your college — official authority</h1>
            <p className="text-sm leading-relaxed text-[#4B5563] mt-1">If your institution is not in the 17 government / NIT / IIT colleges listed, the Principal, Registrar, or Director can request inclusion. Requests are verified via official email and AICTE code before the college appears for alumni sign-up.</p>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <Card className="p-6 sm:p-7 rounded-none">
            <div className="border-l-[3px] border-l-[#C9A86A] pl-4 mb-6">
              <h2 className="font-semibold text-[#1A2332] flex items-center gap-2"><Building2 className="h-4 w-4" /> College details</h2>
              <p className="text-xs text-[#4B5563]">As per AICTE / affiliation records. Will appear exactly as typed for alumni.</p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-1">
                <Label>College name (full, as per AICTE) <span className="text-[#C0392B]">*</span></Label>
                <Input value={form.collegeName} onChange={e=>setForm({...form, collegeName:e.target.value})} placeholder="e.g. Government College of Engineering, Ludhiana" className="rounded-none h-9" />
                {errors.collegeName && <p className="text-xs text-[#C0392B]">{errors.collegeName}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Affiliation <span className="text-[#C0392B]">*</span></Label>
                  <Select value={form.affiliation} onValueChange={v=>setForm({...form, affiliation:v})}>
                    <SelectTrigger className="rounded-none h-9"><SelectValue placeholder="Select affiliation" /></SelectTrigger>
                    <SelectContent className="rounded-none">{affiliations.map(a=> <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                  </Select>
                  {errors.affiliation && <p className="text-xs text-[#C0392B]">{errors.affiliation}</p>}
                </div>
                <div className="space-y-1">
                  <Label>District <span className="text-[#C0392B]">*</span></Label>
                  <Select value={form.district} onValueChange={v=>setForm({...form, district:v})}>
                    <SelectTrigger className="rounded-none h-9"><SelectValue placeholder="Select district" /></SelectTrigger>
                    <SelectContent className="rounded-none max-h-[200px]">{districts.map(d=> <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                  {errors.district && <p className="text-xs text-[#C0392B]">{errors.district}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <Label>Full address <span className="text-[#C0392B]">*</span></Label>
                <Textarea value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Street, Village/Post, District, PIN — as on AICTE letter" className="rounded-none min-h-[80px]" />
                {errors.address && <p className="text-xs text-[#C0392B]">{errors.address}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>AICTE code (if available)</Label>
                  <Input value={form.aicteCode} onChange={e=>setForm({...form, aicteCode:e.target.value})} placeholder="e.g. 1-12345678" className="rounded-none h-9" />
                </div>
                <div className="space-y-1">
                  <Label>Official website</Label>
                  <Input value={form.officialWebsite} onChange={e=>setForm({...form, officialWebsite:e.target.value})} placeholder="https://college.edu.in" className="rounded-none h-9" />
                  {errors.officialWebsite && <p className="text-xs text-[#C0392B]">{errors.officialWebsite}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 border-l-[3px] border-l-[#1B3A5C] pl-4">
              <h2 className="font-semibold text-[#1A2332] flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Authority verification</h2>
              <p className="text-xs text-[#4B5563]">Only Principal / Registrar / Director with official college email can register. A verification email will be sent.</p>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Authority full name <span className="text-[#C0392B]">*</span></Label>
                  <Input value={form.authorityName} onChange={e=>setForm({...form, authorityName:e.target.value})} placeholder="Dr. Rajesh Kumar" className="rounded-none h-9" />
                  {errors.authorityName && <p className="text-xs text-[#C0392B]">{errors.authorityName}</p>}
                </div>
                <div className="space-y-1">
                  <Label>Designation <span className="text-[#C0392B]">*</span></Label>
                  <Select value={form.authorityDesignation} onValueChange={v=>setForm({...form, authorityDesignation:v})}>
                    <SelectTrigger className="rounded-none h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent className="rounded-none"><SelectItem value="Principal">Principal</SelectItem><SelectItem value="Registrar">Registrar</SelectItem><SelectItem value="Director">Director</SelectItem><SelectItem value="Dean">Dean (Academics)</SelectItem><SelectItem value="HOD">HOD</SelectItem></SelectContent>
                  </Select>
                  {errors.authorityDesignation && <p className="text-xs text-[#C0392B]">{errors.authorityDesignation}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Official email <span className="text-[#C0392B]">*</span></Label>
                  <Input type="email" value={form.authorityEmail} onChange={e=>setForm({...form, authorityEmail:e.target.value})} placeholder="principal@college.edu.in" className="rounded-none h-9" />
                  {errors.authorityEmail && <p className="text-xs text-[#C0392B]">{errors.authorityEmail}</p>}
                  <p className="text-[11px] text-[#8B95A5]">Must be college domain, not gmail.</p>
                </div>
                <div className="space-y-1">
                  <Label>Official phone <span className="text-[#C0392B]">*</span></Label>
                  <Input value={form.authorityPhone} onChange={e=>setForm({...form, authorityPhone:e.target.value})} placeholder="9876543210" className="rounded-none h-9" />
                  {errors.authorityPhone && <p className="text-xs text-[#C0392B]">{errors.authorityPhone}</p>}
                </div>
              </div>
            </div>

            <Alert className="mt-6 rounded-none bg-[#F8F7F5] border-[#E2DDD6]">
              <AlertTitle className="text-sm">Verification process</AlertTitle>
              <AlertDescription className="text-xs leading-relaxed text-[#4B5563]">Requests are checked against AICTE and DTE Punjab affiliation. Approved colleges appear in the sign-up list within 48 hours and alumni can immediately select them. You will be notified by email. No fees.</AlertDescription>
            </Alert>

            <div className="mt-6 flex gap-3">
              <Button type="submit" disabled={saving} className="rounded-none"><Send className="h-4 w-4" /> {saving ? "Submitting…" : "Submit for verification"}</Button>
              <Button type="button" variant="secondary" asChild className="rounded-none"><Link href="/colleges">Cancel</Link></Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
