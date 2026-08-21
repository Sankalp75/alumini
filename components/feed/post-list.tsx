import { PostCard, PostSkeleton } from "./post-card";
import type { FeedPost } from "@/types/feed";
import { Megaphone } from "lucide-react";

export function PostList({ posts, loading }: { posts: FeedPost[]; loading?: boolean }) {
  if (loading) return <div className="space-y-3">{Array.from({length:3}).map((_,i)=><PostSkeleton key={i}/>)}</div>;
  if (posts.length===0) {
    return (
      <div className="py-12 text-center border border-dashed border-[#C9C4BC] bg-white p-8">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-[#E2DDD6] bg-[#F8F7F5]"><Megaphone className="h-5 w-5 text-[#4B5563]"/></div>
        <h3 className="font-heading text-base font-semibold text-[#1A2332]">No posts yet</h3>
        <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-[#4B5563]">Your institution has not posted anything. Check back soon or follow the directory for direct connections.</p>
      </div>
    );
  }
  return <div className="space-y-3">{posts.map(p=> <PostCard key={p.id} post={p}/>)}</div>;
}
