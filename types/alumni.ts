export type Branch = "CSE" | "ECE" | "ME" | "CE" | "EE" | "IT" | "Other";
export type AlumniRole = "alumni" | "admin";
export interface AlumniProfile {
  uid: string;
  name: string;
  email: string;
  batch: string;
  branch: Branch;
  college: string;
  company: string;
  location: string;
  contact: string;
  linkedinUrl: string;
  photoURL: string;
  role: AlumniRole;
  createdAt: string;
  updatedAt: string;
}
export type AlumniProfileInput = Omit<AlumniProfile, "createdAt" | "updatedAt"> & {
  createdAt?: string;
  updatedAt?: string;
};
