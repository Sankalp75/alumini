import type { AlumniProfile, AlumniRole, Branch, CollegeRequest, FeedPost } from "../types.js";

type AlumniRow = {
  uid: string;
  name: string;
  email: string;
  batch: string;
  branch: string;
  college: string;
  company: string;
  location: string;
  contact: string;
  linkedin_url: string;
  photo_url: string;
  role: string;
  created_at: string;
  updated_at: string;
};

type FeedRow = {
  id: string;
  author_id: string;
  author_name: string;
  author_photo: string;
  type: string;
  content: string;
  link: string;
  created_at: string;
  updated_at: string;
};

type CollegeRow = {
  id: string;
  college_name: string;
  affiliation: string;
  district: string;
  address: string;
  aicte_code: string;
  authority_name: string;
  authority_designation: string;
  authority_email: string;
  authority_phone: string;
  official_website: string;
  status: string;
  requested_by: string | null;
  created_at: string;
  updated_at: string;
};

export function mapAlumni(row: AlumniRow): AlumniProfile {
  return {
    uid: row.uid,
    name: row.name,
    email: row.email,
    batch: row.batch,
    branch: row.branch as Branch,
    college: row.college,
    company: row.company,
    location: row.location,
    contact: row.contact,
    linkedinUrl: row.linkedin_url,
    photoURL: row.photo_url,
    role: row.role as AlumniRole,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapFeed(row: FeedRow): FeedPost {
  return {
    id: row.id,
    authorId: row.author_id,
    authorName: row.author_name,
    authorPhoto: row.author_photo,
    type: row.type as FeedPost["type"],
    content: row.content,
    link: row.link,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapCollege(row: CollegeRow): CollegeRequest {
  return {
    id: row.id,
    collegeName: row.college_name,
    affiliation: row.affiliation,
    district: row.district,
    address: row.address,
    aicteCode: row.aicte_code,
    authorityName: row.authority_name,
    authorityDesignation: row.authority_designation,
    authorityEmail: row.authority_email,
    authorityPhone: row.authority_phone,
    officialWebsite: row.official_website,
    status: row.status as CollegeRequest["status"],
    requestedBy: row.requested_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
