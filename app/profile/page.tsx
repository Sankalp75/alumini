"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else router.push(`/profile/${user.uid}`);
    }
  }, [user, loading, router]);
  return <div className="container py-12 text-sm text-[#8B95A5]">Redirecting…</div>;
}
