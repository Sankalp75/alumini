import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc,
  query, where, orderBy, limit, serverTimestamp, Timestamp, onSnapshot, Unsubscribe
} from "firebase/firestore";
import { db } from "./firebase";
import { alumniProfileSchema, feedPostSchema } from "./validators";
import type { AlumniProfile, Branch } from "@/types/alumni";
import type { FeedPost, FeedPostType } from "@/types/feed";
import type { CollegeRequest, CollegeRequestInput } from "@/types/college";
import { collegeRequestSchema } from "./validators";

// Helpers only file that imports firestore SDK — components import from here
const ALUMNI = "alumni_profiles";
const POSTS = "feed_posts";

// CREATE
export async function createAlumniProfile(uid: string, data: Omit<AlumniProfile, "createdAt"|"updatedAt"|"uid"> & { uid: string }): Promise<void> {
  const parsed = alumniProfileSchema.parse({
    name: data.name, email: data.email, batch: data.batch, branch: data.branch,
    college: (data as unknown as { college?: string }).college || "",
    company: data.company || "", location: data.location || "", contact: data.contact || "", linkedinUrl: data.linkedinUrl || ""
  });
  await setDoc(doc(db, ALUMNI, uid), {
    uid,
    name: parsed.name,
    email: parsed.email.toLowerCase(),
    batch: parsed.batch,
    branch: parsed.branch,
    college: parsed.college,
    company: parsed.company || "",
    location: parsed.location || "",
    contact: parsed.contact || "",
    linkedinUrl: parsed.linkedinUrl || "",
    photoURL: data.photoURL || "",
    role: data.role || "alumni",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getAlumniProfile(uid: string): Promise<AlumniProfile | null> {
  const snap = await getDoc(doc(db, ALUMNI, uid));
  if (!snap.exists()) return null;
  return snap.data() as AlumniProfile;
}

export async function getAllAlumniProfiles(): Promise<AlumniProfile[]> {
  try {
    const q = query(collection(db, ALUMNI), orderBy("name"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ ...d.data(), uid: d.id } as AlumniProfile));
  } catch {
    // ponytail: fallback to unordered if index missing
    const snap = await getDocs(collection(db, ALUMNI));
    const list = snap.docs.map(d => d.data() as AlumniProfile);
    return list.sort((a,b) => a.name.localeCompare(b.name));
  }
}

export async function updateAlumniProfile(uid: string, data: Partial<AlumniProfile>): Promise<void> {
  await updateDoc(doc(db, ALUMNI, uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function queryAlumniProfiles(filters: { batch?: string; branch?: string; college?: string; search?: string }): Promise<AlumniProfile[]> {
  const all = await getAllAlumniProfiles();
  return all.filter(p => {
    if (filters.batch && filters.batch !== "All" && p.batch !== filters.batch) return false;
    if (filters.branch && filters.branch !== "All" && p.branch !== filters.branch) return false;
    if (filters.college && filters.college !== "All" && (p as unknown as { college?: string }).college !== filters.college) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const college = ((p as unknown as { college?: string }).college || "");
      return p.name.toLowerCase().includes(s) || p.company.toLowerCase().includes(s) || p.email.toLowerCase().includes(s) || college.toLowerCase().includes(s);
    }
    return true;
  });
}

// FEED
export async function createFeedPost(data: { type: FeedPostType; content: string; link?: string }, author: { uid: string; name: string; photoURL?: string }): Promise<string> {
  const parsed = feedPostSchema.parse(data);
  const ref = await addDoc(collection(db, POSTS), {
    authorId: author.uid,
    authorName: author.name,
    authorPhoto: author.photoURL || "",
    type: parsed.type,
    content: parsed.content,
    link: parsed.link || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getFeedPosts(limitCount = 20): Promise<FeedPost[]> {
  try {
    const q = query(collection(db, POSTS), orderBy("createdAt", "desc"), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as FeedPost));
  } catch {
    const snap = await getDocs(collection(db, POSTS));
    const posts = snap.docs.map(d => ({ id: d.id, ...d.data() } as FeedPost));
    return posts.sort((a,b) => {
      const at = a.createdAt?.toMillis?.() || 0;
      const bt = b.createdAt?.toMillis?.() || 0;
      return bt - at;
    }).slice(0, limitCount);
  }
}

export function subscribeFeedPosts(callback: (posts: FeedPost[]) => void): Unsubscribe {
  const q = query(collection(db, POSTS), orderBy("createdAt", "desc"), limit(20));
  return onSnapshot(q, (snap) => {
    const posts = snap.docs.map(d => ({ id: d.id, ...d.data() } as FeedPost));
    callback(posts);
  }, () => {
    // fallback: one-time fetch if snapshot fails (permissions/index)
    getFeedPosts().then(callback);
  });
}

export function formatTimestamp(ts: Timestamp | null | undefined): string {
  if (!ts) return "Just now";
  const d = ts.toDate();
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins/60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours/24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export function toCSV(profiles: AlumniProfile[]): string {
  const headers = ["Name","Email","College","Batch","Branch","Company","Location","Contact","LinkedIn","Role","Joined"];
  const rows = profiles.map(p => [
    `"${p.name.replace(/"/g,'""')}"`,
    p.email,
    `"${((p as unknown as { college?: string }).college || "").replace(/"/g,'""')}"`,
    p.batch,
    p.branch,
    `"${(p.company||"").replace(/"/g,'""')}"`,
    `"${(p.location||"").replace(/"/g,'""')}"`,
    p.contact || "",
    p.linkedinUrl || "",
    p.role,
    p.createdAt?.toDate?.().toISOString?.().split("T")[0] || ""
  ].join(","));
  return [headers.join(","), ...rows].join("\n");
}

// Colleges aggregation (client-side, ponytail: no extra collection needed for MVP)
export function collegeCounts(profiles: AlumniProfile[]): { college: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of profiles) {
    const c = ((p as unknown as { college?: string }).college || "Unknown") as string;
    map.set(c, (map.get(c)||0)+1);
  }
  return Array.from(map.entries()).map(([college,count])=>({college,count})).sort((a,b)=> b.count - a.count || a.college.localeCompare(b.college));
}

// COLLEGE REQUESTS — authority registers college not in static list
const COLLEGE_REQUESTS = "college_requests";

export async function createCollegeRequest(data: CollegeRequestInput & { requestedBy?: string }): Promise<string> {
  const parsed = collegeRequestSchema.parse(data);
  const ref = await addDoc(collection(db, COLLEGE_REQUESTS), {
    collegeName: parsed.collegeName,
    affiliation: parsed.affiliation,
    district: parsed.district,
    address: parsed.address,
    aicteCode: parsed.aicteCode || "",
    authorityName: parsed.authorityName,
    authorityDesignation: parsed.authorityDesignation,
    authorityEmail: parsed.authorityEmail.toLowerCase(),
    authorityPhone: parsed.authorityPhone,
    officialWebsite: parsed.officialWebsite || "",
    requestedBy: data.requestedBy || null,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getCollegeRequests(status?: string): Promise<CollegeRequest[]> {
  try {
    const col = collection(db, COLLEGE_REQUESTS);
    const qy = status ? query(col, where("status","==",status), orderBy("createdAt","desc")) : query(col, orderBy("createdAt","desc"));
    const snap = await getDocs(qy);
    return snap.docs.map(d=> ({ id: d.id, ...d.data() } as CollegeRequest));
  } catch {
    const snap = await getDocs(collection(db, COLLEGE_REQUESTS));
    const list = snap.docs.map(d=> ({ id: d.id, ...d.data() } as CollegeRequest));
    const filtered = status ? list.filter(l=> l.status===status) : list;
    return filtered.sort((a,b)=> (b.createdAt?.toMillis?.()||0) - (a.createdAt?.toMillis?.()||0));
  }
}

export async function updateCollegeRequestStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  await updateDoc(doc(db, COLLEGE_REQUESTS, id), { status, updatedAt: serverTimestamp() });
}
