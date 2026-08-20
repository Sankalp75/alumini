import React, { useState } from 'react';
import { RouteType } from '../types';
import { GLOBAL_CHAPTERS } from '../data/mockData';
import { Globe2, Users, MapPin, Calendar, Plus, MessageSquare, Sparkles, Check } from 'lucide-react';

interface CommunityViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success') => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onNavigate, onShowToast }) => {
  const [joinedChapters, setJoinedChapters] = useState<Record<string, boolean>>({
    'ch-sf': true
  });

  const [discussions, setDiscussions] = useState([
    {
      id: 'd1',
      author: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Design Lead at Apple',
      chapter: 'SF Bay Area Chapter',
      title: 'Hosting a small informal coffee meetup this Friday in Hayes Valley for designers & founders!',
      replies: 18,
      likes: 42,
      time: '3h ago'
    },
    {
      id: 'd2',
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'General Partner at Apex Capital',
      chapter: 'Global Founders Syndicate',
      title: 'Looking for alumni building in spatial computing and multimodal agents for our summer batch.',
      replies: 29,
      likes: 67,
      time: '8h ago'
    }
  ]);

  const [newDiscussionText, setNewDiscussionText] = useState('');

  const toggleJoinChapter = (id: string, name: string) => {
    const isJoined = joinedChapters[id];
    setJoinedChapters((prev) => ({ ...prev, [id]: !isJoined }));
    onShowToast(
      isJoined ? `Left ${name}` : `Joined ${name}! You'll now receive chapter invites.`,
      'success'
    );
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionText.trim()) return;
    const newPost = {
      id: `d-${Date.now()}`,
      author: 'You (Alumni Member)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Verified Alumni',
      chapter: 'SF Bay Area Chapter',
      title: newDiscussionText,
      replies: 0,
      likes: 1,
      time: 'Just now'
    };
    setDiscussions([newPost, ...discussions]);
    setNewDiscussionText('');
    onShowToast('Discussion posted to the community!', 'success');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-12 text-left">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-2">
          <Globe2 className="w-3.5 h-3.5" />
          <span>85+ Countries • 6 Regional Chapters</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
          Global Alumni Chapters
        </h1>
        <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
          Connect locally with graduates in your city, attend regional mixers, and tap into localized city channels.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GLOBAL_CHAPTERS.map((chap) => {
          const isJoined = joinedChapters[chap.id];
          return (
            <div
              key={chap.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/15 hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={chap.coverImage}
                    alt={chap.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white drop-shadow-md">
                        {chap.city}
                      </h3>
                      <span className="text-xs text-cyan-300 font-semibold">{chap.country}</span>
                    </div>
                    <span className="text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-200 border border-white/20">
                      {chap.membersCount.toLocaleString()} Members
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {chap.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Chapter Lead:</div>
                    <div className="text-white font-medium">{chap.leads}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => toggleJoinChapter(chap.id, chap.name)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isJoined
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-600/20'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>Joined Chapter</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Join {chap.city} Chapter</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Discussion Board */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/15 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Chapter Community Feed</span>
            </h3>
            <p className="text-xs text-slate-400">Share announcements, meetups, and local recommendations</p>
          </div>
        </div>

        {/* Post Form */}
        <form onSubmit={handlePostDiscussion} className="space-y-3">
          <textarea
            rows={2}
            value={newDiscussionText}
            onChange={(e) => setNewDiscussionText(e.target.value)}
            placeholder="Start a discussion or announce a gathering..."
            className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newDiscussionText.trim()}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-40"
            >
              Post to Feed
            </button>
          </div>
        </form>

        {/* Discussions List */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {discussions.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-xs md:text-sm text-white">{item.author}</h4>
                    <p className="text-[11px] text-slate-400">{item.role} • <span className="text-cyan-300">{item.chapter}</span></p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed pl-12">
                {item.title}
              </p>
              <div className="flex items-center gap-4 pl-12 text-xs text-slate-400 pt-1">
                <span>{item.likes} Likes</span>
                <span>{item.replies} Replies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
