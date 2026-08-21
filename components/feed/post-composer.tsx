"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createFeedPost } from "@/lib/firestore";
import { useAuth } from "@/hooks/use-auth";

export function PostComposer({ onCreated }: { onCreated?: ()=>void }) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [type, setType] = useState<"announcement"|"job"|"event">("announcement");
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePost = async () => {
    if (!user || !profile) return;
    if (content.trim().length < 10) { toast({ title: "Post too short", description: "At least 10 characters", variant: "warning" }); return; }
    setSaving(true);
    try {
      await createFeedPost({ type, content: content.trim(), link: link.trim() }, { uid: user.uid, name: profile.name, photoURL: profile.photoURL });
      setContent(""); setLink("");
      toast({ title: "Post published", description: "Visible to all alumni now.", variant: "success" });
      onCreated?.();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Try again";
      toast({ title: "Failed to post", description: msg, variant: "error" });
    } finally { setSaving(false); }
  };

  if (!profile || profile.role !== "admin") return null;

  return (
    <Card className="rounded-none border-l-[3px] border-l-[#1B3A5C] p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="h-8 w-8 rounded-none border border-[#E2DDD6]"><AvatarFallback className="bg-[#1B3A5C] text-white text-xs rounded-none">{profile.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
        <span className="text-sm font-medium text-[#1A2332]">Create a post</span>
        <span className="text-xs text-[#8B95A5] border border-[#E2DDD6] px-2 py-0.5">Admin only</span>
        <span className="ml-auto text-xs text-[#8B95A5] border border-[#E2DDD6] px-2 py-0.5">Verified</span>
      </div>
      <Textarea placeholder="Share an announcement, job opening, or event…" value={content} onChange={e=>setContent(e.target.value)} className="min-h-[96px] rounded-none" aria-label="Post content" />
      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        <Select value={type} onValueChange={(v)=>setType(v as never)}><SelectTrigger className="rounded-none h-9"><SelectValue /></SelectTrigger><SelectContent className="rounded-none"><SelectItem value="announcement">Announcement</SelectItem><SelectItem value="job">Job</SelectItem><SelectItem value="event">Event</SelectItem></SelectContent></Select>
        <Input placeholder="Optional link (https://…)" value={link} onChange={e=>setLink(e.target.value)} className="rounded-none h-9" />
      </div>
      <div className="mt-3 flex justify-between items-center">
        <p className="text-xs text-[#8B95A5]">{content.length}/2000</p>
        <Button size="sm" onClick={handlePost} disabled={saving || content.trim().length<10} className="rounded-none"><Send className="h-4 w-4"/> {saving ? "Posting…" : "Publish"}</Button>
      </div>
    </Card>
  );
}
