import type { Timestamp } from "firebase/firestore";
export type FeedPostType = "announcement" | "job" | "event";
export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  type: FeedPostType;
  content: string;
  link?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
export type FeedPostInput = Omit<FeedPost, "id" | "createdAt" | "updatedAt">;
