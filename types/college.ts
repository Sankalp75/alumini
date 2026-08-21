import type { Timestamp } from "firebase/firestore";
export type CollegeRequestStatus = "pending" | "approved" | "rejected";
export interface CollegeRequest {
  id: string;
  collegeName: string;
  affiliation: string; // e.g. "IKGPTU", "Punjabi University", "Autonomous"
  district: string; // e.g. "Ludhiana"
  address: string;
  aicteCode?: string;
  authorityName: string;
  authorityDesignation: string; // Principal, Registrar, Director
  authorityEmail: string;
  authorityPhone: string;
  officialWebsite?: string;
  status: CollegeRequestStatus;
  requestedBy?: string; // uid if logged in
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
export type CollegeRequestInput = Omit<CollegeRequest, "id" | "createdAt" | "updatedAt" | "status">;
