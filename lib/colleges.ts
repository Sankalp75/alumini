// Chosen because: DTE Punjab govt. engineering colleges + all centrally-funded
// technical institutes actually located in Punjab: NIT Jalandhar (GoI), IIT Ropar (GoI),
// PEC Chandigarh (UT, serves Punjab), SLIET Longowal (GoI). IIIT Punjab — no
// IIIT is located inside Punjab state (nearest is IIIT Una, Himachal Pradesh),
// so this list is exhaustive for NIT/IIT/IIIT-in-Punjab. Sorted A–Z.
export const PUNJAB_COLLEGES = [
  "Baba Banda Singh Bahadur Engineering College, Fatehgarh Sahib",
  "Beant College of Engineering and Technology, Gurdaspur",
  "Chandigarh College of Engineering and Technology, Chandigarh",
  "Dr. B.R. Ambedkar National Institute of Technology, Jalandhar",
  "Giani Zail Singh Campus College of Engineering and Technology, Bathinda",
  "Guru Nanak Dev Engineering College, Ludhiana",
  "Guru Nanak Dev University, Amritsar",
  "I.K. Gujral Punjab Technical University, Jalandhar",
  "Indian Institute of Technology Ropar, Rupnagar",
  "Maharaja Ranjit Singh Punjab Technical University, Bathinda",
  "Punjab Engineering College, Chandigarh",
  "Punjabi University, Patiala",
  "Sant Longowal Institute of Engineering and Technology, Sangrur",
  "Shaheed Bhagat Singh State University, Ferozepur",
  "University Institute of Engineering and Technology, Panjab University, Chandigarh",
  "University Institute of Engineering and Technology, Punjabi University, Patiala",
  "Yadavindra College of Engineering, Talwandi Sabo",
] as const;

export type PunjabCollege = typeof PUNJAB_COLLEGES[number];

export function isValidCollege(v: string): boolean {
  return (PUNJAB_COLLEGES as readonly string[]).includes(v);
}

export function collegeShortName(full: string): string {
  return full.split(",")[0]?.trim() || full;
}

export function collegeCategory(full: string): "NIT" | "IIT" | "Government" {
  if (full.includes("National Institute of Technology")) return "NIT";
  if (full.includes("Indian Institute of Technology")) return "IIT";
  return "Government";
}
