import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FeedPost } from "@/types/feed";
import { formatTimestamp } from "@/lib/firestore";

function typeVariant(t: string) {
  if (t==="job") return "cse" as const;
  if (t==="event") return "ece" as const;
  return "batch" as const;
}

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <Card className="overflow-hidden border-l-[3px] border-l-[#C9A86A]">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3 min-w-0">
            <Avatar className="h-8 w-8 rounded-none border border-[#E2DDD6]">
              {post.authorPhoto ? <AvatarImage src={post.authorPhoto} className="rounded-none"/> : null}
              <AvatarFallback className="bg-[#1B3A5C] text-white text-xs rounded-none">{post.authorName.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1A2332] leading-none">{post.authorName}</p>
              <p className="text-xs text-[#4B5563] mt-1">{formatTimestamp(post.createdAt)} • Verified by institution</p>
            </div>
          </div>
          <Badge variant={typeVariant(post.type)} className="rounded-none capitalize shrink-0">{post.type}</Badge>
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#1A2332] max-w-none">{post.content}</p>
        {post.link && <div className="mt-3"><Button variant="secondary" size="sm" asChild className="rounded-none"><a href={post.link} target="_blank" rel="noopener">View details</a></Button></div>}
        <p className="mt-3 text-xs tabular-nums text-[#8B95A5] border-t border-[#F1EFEA] pt-3">{formatTimestamp(post.createdAt)}</p>
      </div>
    </Card>
  );
}

export function PostSkeleton() {
  return (
    <Card className="p-5 border-l-[3px] border-l-[#E2DDD6]">
      <div className="flex gap-3"><div className="h-8 w-8 bg-[#EDE9E3] animate-pulse"/><div className="space-y-2 flex-1"><div className="h-3 w-1/4 bg-[#EDE9E3] animate-pulse"/><div className="h-2 w-1/6 bg-[#F1EFEA] animate-pulse"/></div></div>
      <div className="mt-4 space-y-2"><div className="h-3 w-full bg-[#F1EFEA] animate-pulse"/><div className="h-3 w-5/6 bg-[#F1EFEA] animate-pulse"/></div>
    </Card>
  );
}
