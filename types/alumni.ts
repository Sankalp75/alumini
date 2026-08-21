import type { Timestamp } from "firebase/firestore";
export type Branch = "CSE" | "ECE" | "ME" | "CE" | "EE" | "IT" | "Other";
export type AlumniRole = "alumni" | "admin";
export interface AlumniProfile {
  uid: string;
  name: string;
  email: string;
  batch: string;
  branch: Branch;
  college: string; // full college name from PUNJAB_COLLEGES (government + NIT/IIT)
  company: string;
  location: string;
  contact: string;
  linkedinUrl: string;
  photoURL: string;
  role: AlumniRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
export type AlumniProfileInput = Omit<AlumniProfile, "createdAt" | "updatedAt"> & {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
