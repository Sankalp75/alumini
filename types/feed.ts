export type FeedPostType = "announcement" | "job" | "event";
export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  type: FeedPostType;
  content: string;
  link?: string;
  createdAt: string;
  updatedAt?: string;
}
export type FeedPostInput = Omit<FeedPost, "id" | "createdAt" | "updatedAt">;
