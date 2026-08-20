import React, { useState } from 'react';
import { RouteType, AlumniProfile } from '../types';
import { ALUMNI_DATA } from '../data/mockData';
import { Handshake, Sparkles, Clock, CheckCircle, ArrowRight, UserCheck, ShieldCheck, Heart } from 'lucide-react';

interface MentorshipViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onRequestMentorship: (mentor: AlumniProfile) => void;
  onOpenMessageWith: (profileId: string) => void;
}

export const MentorshipView: React.FC<MentorshipViewProps> = ({
  onNavigate,
  onRequestMentorship,
  onOpenMessageWith
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const topics = ['All', 'UX & Design', 'Venture Capital', 'Engineering & AI', 'Product Strategy', 'Startup Pitching'];

  const mentors = ALUMNI_DATA.filter((a) => a.mentorship.available);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-12 text-left">
      {/* Hero Banner */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-teal-900/30 to-purple-900/30">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
            <Handshake className="w-3.5 h-3.5" />
            <span>Alumni Mentorship Initiative</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Accelerate your trajectory with seasoned alumni.
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Gain direct 1-on-1 career navigation, design critiques, portfolio reviews, and venture insights from industry leaders in the AlumniConnect network.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Verified Industry Executives</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-teal-300 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>100% Free for Alumni</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">
          Focus Area:
        </span>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedTopic === t
                ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="glass-card rounded-2xl p-6 border border-white/15 hover:border-teal-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-400/40 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3
                      onClick={() => onNavigate('profile', mentor.id)}
                      className="font-display font-bold text-lg text-white hover:text-teal-300 cursor-pointer transition-colors"
                    >
                      {mentor.name}
                    </h3>
                    <span className="material-symbols-outlined text-teal-400 text-xs icon-fill">
                      verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{mentor.role}</p>
                  <p className="text-xs text-teal-400 font-semibold">{mentor.company}</p>
                </div>
              </div>

              {/* Mentorship Focus Area tags */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Mentoring in:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.mentorship.areas.map((area) => (
                    <span
                      key={area}
                      className="text-[11px] bg-teal-500/10 border border-teal-500/20 text-teal-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-400 mb-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{mentor.mentorship.commitment}</span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={() => onNavigate('profile', mentor.id)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => onRequestMentorship(mentor)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mentorship Program Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <UserCheck className="w-6 h-6 text-teal-400 mb-2" />
          <h4 className="font-bold text-white text-base">Direct Guidance</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Quarterly or monthly deep-dive calls customized to your immediate milestones and portfolio goals.
          </p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <ShieldCheck className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="font-bold text-white text-base">Private & Trusted</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strict confidentiality for founders pitching confidential ventures or executives navigating career transitions.
          </p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <Heart className="w-6 h-6 text-purple-400 mb-2" />
          <h4 className="font-bold text-white text-base">Give Back to Alma Mater</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Graduates supporting the next generation of creative builders and technological leaders.
          </p>
        </div>
      </div>
    </div>
  );
};
