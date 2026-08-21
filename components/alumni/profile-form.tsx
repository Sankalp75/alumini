"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { PUNJAB_COLLEGES } from "@/lib/colleges";

const branches = ["CSE","ECE","ME","CE","EE","IT","Other"] as const;
const batches = Array.from({length: 67}, (_,i)=> String(1960+i)); // 1960-2026

type FormValues = {
  name: string; email: string; password?: string; confirmPassword?: string;
  batch: string; branch: string; college: string;
  company?: string; location?: string; contact?: string; linkedinUrl?: string; agreeToTerms?: boolean;
};

export function ProfileForm({
  defaultValues,
  onSubmit,
  submitLabel = "Create Profile",
  showAuthFields = true,
  isSubmitting,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit: (v: FormValues) => Promise<void> | void;
  submitLabel?: string;
  showAuthFields?: boolean;
  isSubmitting?: boolean;
}) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { batch: "", branch: "", college: "", ...defaultValues }
  });

  const batchVal = watch("batch");
  const branchVal = watch("branch");
  const collegeVal = watch("college");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name <span className="text-[#C0392B]">*</span></Label>
        <Input id="name" placeholder="Arjun Sharma" error={!!errors.name} {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#C0392B]"><AlertCircle className="h-3.5 w-3.5"/>{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email <span className="text-[#C0392B]">*</span></Label>
        <Input id="email" type="email" placeholder="arjun@example.com" error={!!errors.email} {...register("email", { required: "Email is required" })} disabled={!showAuthFields} />
        {errors.email && <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#C0392B]"><AlertCircle className="h-3.5 w-3.5"/>{errors.email.message}</p>}
        {!showAuthFields && <p className="text-[13px] text-[#8B95A5]">Email cannot be changed</p>}
      </div>

      {showAuthFields && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password <span className="text-[#C0392B]">*</span></Label>
            <div className="relative">
              <Input id="password" type={showPw ? "text" : "password"} placeholder="At least 8 chars, 1 letter + 1 number" error={!!errors.password} {...register("password", { required: "Password required", minLength: { value: 8, message: "Min 8 characters" } })} />
              <button type="button" onClick={() => setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B95A5] hover:text-[#1A2332]">{showPw ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button>
            </div>
            {errors.password && <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#C0392B]"><AlertCircle className="h-3.5 w-3.5"/>{errors.password.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm Password <span className="text-[#C0392B]">*</span></Label>
            <div className="relative">
              <Input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Repeat password" error={!!errors.confirmPassword} {...register("confirmPassword", { required: "Confirm password" })} />
              <button type="button" onClick={() => setShowConfirm(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B95A5] hover:text-[#1A2332]">{showConfirm ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button>
            </div>
            {errors.confirmPassword && <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#C0392B]"><AlertCircle className="h-3.5 w-3.5"/>{errors.confirmPassword.message as string}</p>}
          </div>
        </>
      )}

      <div className="space-y-1.5">
        <Label>College / Institution <span className="text-[#C0392B]">*</span></Label>
        <Select value={collegeVal} onValueChange={(v)=>setValue("college", v)}>
          <SelectTrigger><SelectValue placeholder="Select your college" /></SelectTrigger>
          <SelectContent className="max-h-[280px]">
            {PUNJAB_COLLEGES.map(c=> <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <input type="hidden" {...register("college", { required: "College is required" })} />
        {errors.college && <p className="text-[13px] font-medium text-[#C0392B]">{errors.college.message as string}</p>}
        <p className="text-[11px] text-[#8B95A5]">All government, NIT, and IIT institutions in Punjab. Covers DTE, NIT Jalandhar, IIT Ropar, PEC, SLIET.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Batch Year <span className="text-[#C0392B]">*</span></Label>
          <Select value={batchVal} onValueChange={(v)=>setValue("batch", v)}>
            <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
            <SelectContent>
              {batches.map(b=> <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("batch", { required: "Batch required" })} />
          {errors.batch && <p className="text-[13px] font-medium text-[#C0392B]">{errors.batch.message as string}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Branch <span className="text-[#C0392B]">*</span></Label>
          <Select value={branchVal} onValueChange={(v)=>setValue("branch", v)}>
            <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
            <SelectContent>
              {branches.map(b=> <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("branch", { required: "Branch required"})} />
          {errors.branch && <p className="text-[13px] font-medium text-[#C0392B]">{errors.branch.message as string}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Current Company</Label>
        <Input id="company" placeholder="Infosys, TCS, Self-employed" {...register("company")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Ludhiana, Punjab" {...register("location")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact">Contact (Phone)</Label>
        <Input id="contact" placeholder="9876543210" {...register("contact")} />
        <p className="text-[13px] text-[#8B95A5]">10 digits, visible to alumni only</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input id="linkedinUrl" placeholder="https://linkedin.com/in/your-profile" {...register("linkedinUrl")} />
      </div>

      {showAuthFields && (
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1 rounded border-[#E2DDD6] text-[#1B3A5C] focus:ring-[#2E7D6F]" {...register("agreeToTerms", { required: true })} />
          <span className="text-[#4B5563]">I agree to the <span className="text-[#2E7D6F] font-medium">Terms</span> and confirm my details are accurate.</span>
        </label>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full rounded-none" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}
