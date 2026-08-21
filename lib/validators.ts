import { z } from "zod";
import { PUNJAB_COLLEGES } from "./colleges";

const baseAlumniProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Enter a valid email").toLowerCase(),
  batch: z.string().regex(/^\d{4}$/, "Enter a valid 4-digit year"),
  branch: z.enum(["CSE","ECE","ME","CE","EE","IT","Other"]),
  college: z.string().refine(v => (PUNJAB_COLLEGES as readonly string[]).includes(v), "Select your college"),
  company: z.string().max(60).optional().default(""),
  location: z.string().max(60).optional().default(""),
  contact: z.string().regex(/^\d{10,15}$/, "Phone must be 10-15 digits").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Enter a valid URL").refine(v => v === "" || v.includes("linkedin.com"), "Must be a LinkedIn URL").optional().or(z.literal("")),
});

export const alumniProfileSchema = baseAlumniProfileSchema;

export const registerSchema = baseAlumniProfileSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Must contain at least 1 letter and 1 number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(v => v === true, "You must agree to terms"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirmPassword"], message: "Passwords do not match" });
  }
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const feedPostSchema = z.object({
  type: z.enum(["announcement","job","event"]),
  content: z.string().min(10, "Post must be at least 10 characters").max(2000, "Max 2000 characters"),
  link: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export const profileUpdateSchema = baseAlumniProfileSchema.omit({ email: true });

export const collegeRequestSchema = z.object({
  collegeName: z.string().min(5, "College name must be at least 5 characters").max(120),
  affiliation: z.string().min(2, "Affiliation required").max(80),
  district: z.string().min(2, "District required").max(40),
  address: z.string().min(10, "Full address required").max(200),
  aicteCode: z.string().max(20).optional().or(z.literal("")),
  authorityName: z.string().min(2, "Authority name required").max(60),
  authorityDesignation: z.string().min(2, "Designation required").max(40),
  authorityEmail: z.string().email("Valid official email required").toLowerCase(),
  authorityPhone: z.string().regex(/^\d{10,15}$/, "Phone must be 10-15 digits"),
  officialWebsite: z.string().url("Enter valid URL").optional().or(z.literal("")),
});
