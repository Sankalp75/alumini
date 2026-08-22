"use client";
import { useEffect, useState, ReactNode, useCallback } from "react";
import { AuthContext } from "@/hooks/use-auth";
import { fetchCurrentProfile } from "@/lib/auth";
import { getToken } from "@/lib/api";
import type { AlumniProfile } from "@/types/alumni";
import type { AuthUser } from "@/lib/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const p = await fetchCurrentProfile();
      if (p) {
        setProfile(p);
        setUser({ uid: p.uid, email: p.email });
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onChange = () => {
      setLoading(true);
      refresh();
    };
    window.addEventListener("ac-auth-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("ac-auth-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const isAdmin = profile?.role === "admin";
  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
