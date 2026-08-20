import React, { useState } from 'react';
import { AlumniProfile, RouteType } from '../types';
import { ALUMNI_DATA } from '../data/mockData';
import {
  School,
  MapPin,
  UserPlus,
  MessageSquare,
  MoreHorizontal,
  Handshake,
  Check,
  Calendar,
  Share2,
  Bookmark,
  Sparkles
} from 'lucide-react';

interface ProfileViewProps {
  profileId: string;
  onNavigate: (route: RouteType, param?: string) => void;
  onRequestMentorship: (profile: AlumniProfile) => void;
  onOpenMessageWith: (profileId: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success' | 'error') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profileId,
  onNavigate,
  onRequestMentorship,
  onOpenMessageWith,
  onShowToast
}) => {
  const profile =
    ALUMNI_DATA.find((a) => a.id === profileId) || ALUMNI_DATA[0];

  const [isConnected, setIsConnected] = useState<boolean>(profile.isConnected || false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);

  const handleConnectToggle = () => {
    if (isConnected) {
      setIsConnected(false);
      onShowToast(`Removed connection with ${profile.name}`, 'info');
    } else {
      setIsConnected(true);
      onShowToast(`Connection invitation sent to ${profile.name}!`, 'success');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Profile link copied to clipboard!', 'success');
    setShowMoreMenu(false);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    onShowToast(
      isBookmarked ? 'Removed from saved profiles' : `Saved ${profile.name} to your network`,
      'info'
    );
    setShowMoreMenu(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-6 pb-20 text-left">
      {/* Top Breadcrumb / Back button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('alumni')}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Alumni Directory</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>Active Alumni Registry</span>
        </div>
      </div>

      {/* Main Grid: 8 Cols Left (Main content), 4 Cols Right (Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Main Profile Information */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* PROFILE HEADER CARD */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Cover Image */}
            <div className="h-48 md:h-64 w-full relative overflow-hidden bg-slate-900">
              <img
                src={profile.coverImage}
                alt="Cover"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent opacity-80" />
            </div>

            {/* Profile Meta Area */}
            <div className="px-6 md:px-8 pb-8 relative">
              {/* Avatar overlapping cover */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0c1324] -mt-16 md:-mt-20 overflow-hidden bg-slate-800 shadow-2xl z-10 shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Header Content */}
              <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display font-bold text-2xl md:text-3xl text-white">
                      {profile.name}
                    </h1>
                    {profile.isVerified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold gap-1 border border-teal-400/30">
                        <span className="material-symbols-outlined text-[14px] icon-fill">
                          verified
                        </span>
                        <span>Verified Alumni</span>
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-lg text-blue-300 font-semibold mb-2">
                    {profile.role} at {profile.company}
                  </h2>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-300 text-xs md:text-sm mb-4">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <School className="w-4 h-4 text-blue-400" />
                      <span>{profile.degree}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap md:flex-nowrap gap-3 shrink-0 relative">
                  <button
                    id="profile-connect-btn"
                    onClick={handleConnectToggle}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      isConnected
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-4 h-4 text-teal-400" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    id="profile-message-btn"
                    onClick={() => onOpenMessageWith(profile.id)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span>Message</span>
                  </button>

                  {/* More Menu Dropdown */}
                  <div className="relative">
                    <button
                      id="profile-more-btn"
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="w-11 h-11 flex items-center justify-center border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {showMoreMenu && (
                      <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl p-2 shadow-2xl z-50 border border-white/20 text-xs">
                        <button
                          onClick={handleShare}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
                        >
                          <Share2 className="w-4 h-4 text-blue-400" />
                          <span>Share Profile</span>
                        </button>
                        <button
                          onClick={handleBookmarkToggle}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${
                              isBookmarked ? 'text-teal-400 fill-teal-400' : 'text-slate-400'
                            }`}
                          />
                          <span>{isBookmarked ? 'Saved in Network' : 'Save Profile'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 md:p-8 backdrop-blur-xl">
            <h3 className="font-display font-bold text-xl text-white mb-3">About</h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {profile.about}
            </p>
          </div>

          {/* MENTORSHIP AVAILABILITY (FEATURED CARD) */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 border-t-2 border-t-teal-400 shadow-xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <div>
                <h3 className="font-display font-bold text-xl text-white flex items-center gap-2 mb-1">
                  <Handshake className="w-5 h-5 text-teal-400" />
                  <span>Mentorship Availability</span>
                </h3>
                <p className="text-xs md:text-sm text-teal-300 font-medium">
                  {profile.mentorship.available
                    ? 'Currently accepting new mentees for quarterly cohorts.'
                    : 'Currently unavailable for new mentees.'}
                </p>
              </div>

              {profile.mentorship.available && (
                <button
                  id="profile-request-mentorship-btn"
                  onClick={() => onRequestMentorship(profile)}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-md shadow-teal-500/25 active:scale-95 shrink-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Mentorship</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Areas of Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.mentorship.areas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-lg text-xs font-medium text-white"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Commitment
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {profile.mentorship.commitment}
                </p>
              </div>
            </div>
          </div>

          {/* EXPERIENCE TIMELINE */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 md:p-8 backdrop-blur-xl">
            <h3 className="font-display font-bold text-xl text-white mb-6">Experience</h3>
            <div className="relative border-l border-white/15 ml-3 space-y-8">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id} className="relative pl-7">
                  {/* Timeline node icon */}
                  <div
                    className={`absolute -left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      idx === 0
                        ? 'bg-[#0c1324] border-teal-400'
                        : 'bg-[#0c1324] border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        idx === 0 ? 'bg-teal-400' : 'bg-slate-400'
                      }`}
                    />
                  </div>

                  <h4 className="font-display text-base md:text-lg text-white font-semibold">
                    {exp.role}
                  </h4>
                  <div className="text-xs md:text-sm text-blue-300 font-medium mb-1">
                    {exp.company} • {exp.type}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {exp.period} • {exp.duration}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS CLOUD */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 md:p-8 backdrop-blur-xl">
            <h3 className="font-display font-bold text-xl text-white mb-4">Skills & Endorsements</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-200 hover:border-teal-400 hover:text-teal-300 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (Spans 4 cols on desktop) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Mutual Connections */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 backdrop-blur-xl">
            <h3 className="font-display text-base font-semibold text-white mb-4">
              Mutual Connections ({profile.mutualCount})
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                {profile.mutualConnections.map((conn) => (
                  <img
                    key={conn.id}
                    src={conn.avatar}
                    alt={conn.name}
                    className="w-9 h-9 rounded-full border-2 border-[#0c1324] object-cover"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-300">
                David, Emily, and {profile.mutualCount - 2} others
              </span>
            </div>
            <button
              onClick={() => onNavigate('alumni')}
              className="w-full py-2.5 border border-white/15 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See all mutual connections
            </button>
          </div>

          {/* Upcoming Events Attending */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 backdrop-blur-xl">
            <h3 className="font-display text-base font-semibold text-white mb-4">
              Attending Events
            </h3>
            <div className="space-y-3">
              {profile.attendingEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onNavigate('events')}
                  className="group block border border-white/10 rounded-xl p-3.5 hover:bg-white/10 transition-colors cursor-pointer bg-white/5"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex flex-col items-center justify-center shrink-0 border border-white/15">
                      <span className="text-[10px] font-bold text-red-400 uppercase">{evt.month}</span>
                      <span className="text-base font-bold text-white leading-none">{evt.day}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-xs md:text-sm text-white group-hover:text-blue-300 transition-colors truncate">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 truncate">
                        <Calendar className="w-3 h-3 text-teal-400 shrink-0" />
                        <span>{evt.isVirtual ? 'Virtual Room' : evt.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Alumni / People Also Viewed */}
          <div className="bg-[#0c1324]/90 rounded-2xl border border-white/15 shadow-xl p-6 backdrop-blur-xl">
            <h3 className="font-display text-base font-semibold text-white mb-4">
              People Also Viewed
            </h3>
            <div className="space-y-4">
              {profile.similarAlumni.map((sim) => (
                <div key={sim.id} className="flex items-center justify-between gap-3">
                  <div
                    onClick={() => onNavigate('profile', sim.id)}
                    className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
                  >
                    <img
                      src={sim.avatar}
                      alt={sim.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs md:text-sm text-white group-hover:text-blue-300 transition-colors truncate">
                        {sim.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {sim.role} at {sim.company}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onShowToast(`Connected with ${sim.name}!`, 'success');
                    }}
                    className="p-2 text-slate-400 hover:text-teal-400 hover:bg-white/10 rounded-xl transition-colors shrink-0"
                    title={`Connect with ${sim.name}`}
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
