"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileForm } from "@/components/alumni/profile-form";
import { registerWithEmail } from "@/lib/auth";
import { createAlumniProfile } from "@/lib/firestore";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { isValidCollege } from "@/lib/colleges";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const preselectedCollege = searchParams.get("college");
  const initialCollege = preselectedCollege && isValidCollege(preselectedCollege) ? preselectedCollege : "";

  if (!loading && user) {
    router.push("/directory");
    return null;
  }

  const handleSubmit = async (v: any) => {
    setError(null);
    if (v.password !== v.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!v.college) {
      setError("Please select your college");
      return;
    }
    setIsSubmitting(true);
    try {
      const cred = await registerWithEmail(v.email, v.password);
      const uid = cred.user.uid;
      await createAlumniProfile(uid, {
        uid,
        name: v.name,
        email: v.email,
        batch: v.batch,
        branch: v.branch,
        college: v.college,
        company: v.company || "",
        location: v.location || "",
        contact: v.contact || "",
        linkedinUrl: v.linkedinUrl || "",
        photoURL: "",
        role: "alumni",
      });
      toast({ title: "Profile created", description: "Your profile now appears in the directory. Batchmates can find you by name or company.", variant: "success" });
      router.push("/directory");
    } catch (e: any) {
      const code = e?.code || "";
      if (code === "auth/email-already-in-use") setError("Email already registered. Try logging in.");
      else if (code.includes("weak-password")) setError("Password too weak. Use at least 8 characters with letters and numbers.");
      else setError(e?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-[560px] p-6 sm:p-8 rounded-none">
      <div className="mb-6 border-l-[3px] border-l-[#C9A86A] pl-4">
        <h1 className="font-heading text-[26px] font-bold tracking-tight text-[#1A2332]">Create your alumni profile</h1>
        <p className="mt-1 text-sm text-[#4B5563]">Join the verified directory in under two minutes. Select your Punjab institution first.</p>
        {initialCollege && <p className="mt-2 inline-flex items-center border border-[#1B3A5C] bg-[#E8EDF3] px-2 py-1 text-xs font-medium text-[#1B3A5C]">Preselected: {initialCollege}</p>}
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6 rounded-none">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration error</AlertTitle>
          <AlertDescription>{error} {error.includes("already") && <Link href="/login" className="underline font-medium">Log in →</Link>}</AlertDescription>
        </Alert>
      )}
      <ProfileForm defaultValues={{ college: initialCollege }} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <p className="mt-6 text-center text-sm text-[#4B5563]">Already have an account? <Link href="/login" className="font-semibold text-[#1B3A5C] underline underline-offset-4">Log in</Link></p>
      <p className="mt-2 text-center text-xs text-[#8B95A5]"><Link href="/colleges" className="hover:text-[#1B3A5C] underline">View all government, NIT & IIT colleges in Punjab</Link></p>
    </Card>
  );
}
