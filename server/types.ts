export type Branch = "CSE" | "ECE" | "ME" | "CE" | "EE" | "IT" | "Other";
export type AlumniRole = "alumni" | "admin";
export type FeedPostType = "announcement" | "job" | "event";
export type CollegeRequestStatus = "pending" | "approved" | "rejected";

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

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  type: FeedPostType;
  content: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollegeRequest {
  id: string;
  collegeName: string;
  affiliation: string;
  district: string;
  address: string;
  aicteCode: string;
  authorityName: string;
  authorityDesignation: string;
  authorityEmail: string;
  authorityPhone: string;
  officialWebsite: string;
  status: CollegeRequestStatus;
  requestedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  role: AlumniRole;
  photoURL: string;
}
