import { apiFetch, setToken, getToken } from "./api";
import type { AlumniProfile, Branch } from "@/types/alumni";

export interface AuthUser {
  uid: string;
  email: string | null;
}

export interface AuthCredential {
  user: AuthUser;
  profile: AlumniProfile;
  token: string;
}

export async function registerWithEmail(
  email: string,
  password: string,
  profile?: {
    name: string;
    batch: string;
    branch: Branch;
    college?: string;
    company?: string;
    location?: string;
    contact?: string;
    linkedinUrl?: string;
  }
): Promise<AuthCredential> {
  if (!profile) {
    throw new Error("Profile details are required for registration");
  }

  const data = await apiFetch<{ token: string; user: AlumniProfile }>("/api/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify({
      email,
      password,
      name: profile.name,
      batch: profile.batch,
      branch: profile.branch,
      college: profile.college || "",
      company: profile.company || "",
      location: profile.location || "",
      contact: profile.contact || "",
      linkedinUrl: profile.linkedinUrl || "",
    }),
  });

  setToken(data.token);
  return {
    token: data.token,
    profile: data.user,
    user: { uid: data.user.uid, email: data.user.email },
  };
}

export async function loginWithEmail(email: string, password: string): Promise<AuthCredential> {
  const data = await apiFetch<{ token: string; user: AlumniProfile }>("/api/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return {
    token: data.token,
    profile: data.user,
    user: { uid: data.user.uid, email: data.user.email },
  };
}

export async function logout(): Promise<void> {
  setToken(null);
}

export async function resetPassword(_email: string): Promise<void> {
  throw new Error("Password reset email is not available in the Express local backend yet. Ask an admin to reset, or register a new account.");
}

export async function fetchCurrentProfile(): Promise<AlumniProfile | null> {
  if (!getToken()) return null;
  try {
    const data = await apiFetch<{ user: AlumniProfile }>("/api/auth/me");
    return data.user;
  } catch {
    setToken(null);
    return null;
  }
}
