export type CollegeRequestStatus = "pending" | "approved" | "rejected";
export interface CollegeRequest {
  id: string;
  collegeName: string;
  affiliation: string;
  district: string;
  address: string;
  aicteCode?: string;
  authorityName: string;
  authorityDesignation: string;
  authorityEmail: string;
  authorityPhone: string;
  officialWebsite?: string;
  status: CollegeRequestStatus;
  requestedBy?: string | null;
  createdAt: string;
  updatedAt?: string;
}
export type CollegeRequestInput = Omit<CollegeRequest, "id" | "createdAt" | "updatedAt" | "status">;
