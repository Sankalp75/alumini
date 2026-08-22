"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { loginWithEmail, resetPassword } from "@/lib/auth";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) { setError("Email and password are required"); return; }
    setLoading(true);
    try {
      const cred = await loginWithEmail(email, password);
      toast({ title: "Welcome back!", variant: "success" });
      if (cred.profile?.role === "admin") router.push("/admin");
      else router.push("/directory");
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally { setLoading(false); }
  };

  const handleForgot = async () => {
    if (!email) { setError("Enter your email first to reset password"); return; }
    try {
      await resetPassword(email);
      toast({ title: "Reset email sent", description: "Check your inbox for password reset link", variant: "success" });
    } catch { setError("Failed to send reset email"); }
  };

  return (
    <Card className="w-full max-w-[440px] p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#8B95A5]">Sign in to access the directory and feed.</p>
      </div>
      {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4"/><AlertTitle>Login failed</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email <span className="text-[#C0392B]">*</span></Label>
          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} error={!!error} />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password <span className="text-[#C0392B]">*</span></Label>
            <button type="button" onClick={handleForgot} className="text-xs font-medium text-[#2E7D6F] hover:underline">Forgot password?</button>
          </div>
          <div className="relative">
            <Input id="password" type={showPw ? "text" : "password"} placeholder="Your password" value={password} onChange={e=>setPassword(e.target.value)} error={!!error} />
            <button type="button" onClick={()=>setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B95A5]">{showPw ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button>
          </div>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#8B95A5]">Don&apos;t have an account? <Link href="/register" className="font-semibold text-[#2E7D6F] hover:underline">Create one</Link></p>
    </Card>
  );
}
