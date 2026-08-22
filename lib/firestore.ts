import { apiFetch } from "./api";
import { alumniProfileSchema, feedPostSchema, collegeRequestSchema } from "./validators";
import type { AlumniProfile } from "@/types/alumni";
import type { FeedPost, FeedPostType } from "@/types/feed";
import type { CollegeRequest, CollegeRequestInput } from "@/types/college";

/** Kept for register page compatibility — profile is created during /api/auth/register. */
export async function createAlumniProfile(
  _uid: string,
  _data: Omit<AlumniProfile, "createdAt" | "updatedAt" | "uid"> & { uid: string }
): Promise<void> {
  // no-op: Express register already wrote the profile
}

export async function getAlumniProfile(uid: string): Promise<AlumniProfile | null> {
  try {
    const data = await apiFetch<{ alumni: AlumniProfile }>(`/api/alumni/${uid}`);
    return data.alumni;
  } catch {
    return null;
  }
}

export async function getAllAlumniProfiles(): Promise<AlumniProfile[]> {
  const data = await apiFetch<{ alumni: AlumniProfile[] }>("/api/alumni");
  return data.alumni || [];
}

export async function updateAlumniProfile(uid: string, data: Partial<AlumniProfile>): Promise<void> {
  await apiFetch(`/api/alumni/${uid}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: data.name,
      batch: data.batch,
      branch: data.branch,
      college: data.college,
      company: data.company,
      location: data.location,
      contact: data.contact,
      linkedinUrl: data.linkedinUrl,
      photoURL: data.photoURL,
    }),
  });
}

export async function queryAlumniProfiles(filters: {
  batch?: string;
  branch?: string;
  college?: string;
  search?: string;
}): Promise<AlumniProfile[]> {
  const params = new URLSearchParams();
  if (filters.batch) params.set("batch", filters.batch);
  if (filters.branch) params.set("branch", filters.branch);
  if (filters.college) params.set("college", filters.college);
  if (filters.search) params.set("search", filters.search);
  const qs = params.toString();
  const data = await apiFetch<{ alumni: AlumniProfile[] }>(`/api/alumni${qs ? `?${qs}` : ""}`);
  return data.alumni || [];
}

export async function createFeedPost(
  data: { type: FeedPostType; content: string; link?: string },
  _author: { uid: string; name: string; photoURL?: string }
): Promise<string> {
  const parsed = feedPostSchema.parse(data);
  const res = await apiFetch<{ post: FeedPost }>("/api/feed", {
    method: "POST",
    body: JSON.stringify({
      type: parsed.type,
      content: parsed.content,
      link: parsed.link || "",
    }),
  });
  return res.post.id;
}

export async function getFeedPosts(limitCount = 20): Promise<FeedPost[]> {
  const data = await apiFetch<{ posts: FeedPost[] }>(`/api/feed?limit=${limitCount}`);
  return data.posts || [];
}

export function subscribeFeedPosts(callback: (posts: FeedPost[]) => void): () => void {
  let active = true;
  const load = () => {
    getFeedPosts()
      .then((posts) => {
        if (active) callback(posts);
      })
      .catch(() => {
        if (active) callback([]);
      });
  };
  load();
  const id = setInterval(load, 15000);
  return () => {
    active = false;
    clearInterval(id);
  };
}

export function formatTimestamp(ts: string | Date | null | undefined): string {
  if (!ts) return "Just now";
  const d = typeof ts === "string" ? new Date(ts) : ts instanceof Date ? ts : new Date();
  if (Number.isNaN(d.getTime())) return "Just now";
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export function toCSV(profiles: AlumniProfile[]): string {
  const headers = [
    "Name",
    "Email",
    "College",
    "Batch",
    "Branch",
    "Company",
    "Location",
    "Contact",
    "LinkedIn",
    "Role",
    "Joined",
  ];
  const rows = profiles.map((p) =>
    [
      `"${p.name.replace(/"/g, '""')}"`,
      p.email,
      `"${(p.college || "").replace(/"/g, '""')}"`,
      p.batch,
      p.branch,
      `"${(p.company || "").replace(/"/g, '""')}"`,
      `"${(p.location || "").replace(/"/g, '""')}"`,
      p.contact || "",
      p.linkedinUrl || "",
      p.role,
      typeof p.createdAt === "string" ? p.createdAt.split("T")[0] : "",
    ].join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export function collegeCounts(profiles: AlumniProfile[]): { college: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of profiles) {
    const c = p.college || "Unknown";
    map.set(c, (map.get(c) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([college, count]) => ({ college, count }))
    .sort((a, b) => b.count - a.count || a.college.localeCompare(b.college));
}

export async function createCollegeRequest(
  data: CollegeRequestInput & { requestedBy?: string }
): Promise<string> {
  const parsed = collegeRequestSchema.parse(data);
  const res = await apiFetch<{ request: CollegeRequest }>("/api/colleges/requests", {
    method: "POST",
    body: JSON.stringify({
      ...parsed,
      aicteCode: parsed.aicteCode || "",
      officialWebsite: parsed.officialWebsite || "",
    }),
  });
  return res.request.id;
}

export async function getCollegeRequests(status?: string): Promise<CollegeRequest[]> {
  const data = await apiFetch<{ requests: CollegeRequest[] }>("/api/colleges/requests");
  const list = data.requests || [];
  return status ? list.filter((r) => r.status === status) : list;
}

export async function updateCollegeRequestStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<void> {
  await apiFetch(`/api/colleges/requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// silence unused schema import if tree-shaken oddly
void alumniProfileSchema;
