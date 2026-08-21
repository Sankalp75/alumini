"use client";
import { createContext, useContext } from "react";
import type { User } from "firebase/auth";
import type { AlumniProfile } from "@/types/alumni";

export interface AuthContextValue {
  user: User | null;
  profile: AlumniProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useRequireAuth() {
  return useAuth();
}
