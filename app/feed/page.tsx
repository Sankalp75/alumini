"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { getFeedPosts } from "@/lib/firestore";
import type { FeedPost } from "@/types/feed";
import { PostComposer } from "@/components/feed/post-composer";
import { PostList } from "@/components/feed/post-list";

export default function FeedPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const load = useCallback(async () => {
    setLoading(true);
    try { const data = await getFeedPosts(20); setPosts(data); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { if (user) load(); }, [user, load]);

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#1B3A5C] underline underline-offset-4">Home</Link> <span className="mx-1 text-[#C9C4BC]">/</span> <span className="text-[#1A2332] font-medium">Feed</span>
          </nav>
          <h1 className="mt-3 font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Engagement feed</h1>
          <p className="text-sm text-[#4B5563] max-w-[60ch]">Announcements, jobs, and events. Verified by your institution, newest first.</p>
        </div>
      </div>
      <div className="container max-w-[720px] mx-auto py-6 space-y-4">
        <PostComposer onCreated={load} />
        <PostList posts={posts} loading={loading} />
      </div>
    </div>
  );
}
