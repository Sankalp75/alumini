import React from 'react';
import { RouteType } from '../types';
import { ArrowRight, Sparkles, Building, Users, Calendar, ChevronRight } from 'lucide-react';
import { ALUMNI_DATA, JOBS_DATA, EVENTS_DATA } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onOpenMentorshipModal: (mentorId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenMentorshipModal
}) => {
  return (
    <div className="space-y-24">
      {/* HERO SECTION - Replicating Image 7, 19, 23 & HTML */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 min-h-[calc(100vh-140px)] flex flex-col justify-center pt-8 md:pt-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-7 z-20 text-left">
            {/* Global Network Active Pill */}
            <div className="inline-flex items-center gap-2.5 bg-teal-400/10 border border-teal-400/20 px-4 py-1.5 rounded-full w-fit backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 pulse-node" />
              <span className="font-display text-xs font-semibold text-teal-300 uppercase tracking-widest">
                Global Network Active
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-2xl">
              Where Alumni Connections Become{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400">
                Opportunities.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Connect with alumni, discover career opportunities, find mentors, attend exclusive events,
              and grow your professional network within a cinematic digital ecosystem.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-explore-network-btn"
                onClick={() => onNavigate('alumni')}
                className="glow-button-primary bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
              >
                <span>Explore the Network</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-join-community-btn"
                onClick={() => onNavigate('signup')}
                className="glass-card hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 active:scale-95 transition-all backdrop-blur-md"
              >
                <span>Join the Community</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual - Interactive Ecosystem Bento */}
          <div className="md:col-span-6 relative h-[420px] md:h-[480px] z-10 hidden md:block">
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-radial from-blue-600/20 via-purple-600/10 to-transparent blur-3xl" />

            {/* Central Node (Stanford Univ. Core) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div
                onClick={() => onNavigate('community')}
                className="w-24 h-24 rounded-full glass-card-luminous flex items-center justify-center border border-blue-400/50 shadow-[0_0_40px_rgba(59,130,246,0.5)] pulse-node cursor-pointer group hover:scale-110 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-4xl text-blue-400 icon-fill">school</span>

                {/* Hover Card */}
                <div className="absolute top-full mt-3 w-52 glass-card p-3.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 text-left border border-white/20 shadow-2xl z-40 bg-[#0c1324]/90">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                    University Core
                  </p>
                  <p className="font-bold text-white text-sm">Stanford Univ.</p>
                  <p className="text-xs text-cyan-400 font-semibold mt-1">12,500+ Active Alumni</p>
                </div>
              </div>
            </div>

            {/* Surrounding Node 1: Tech Industry */}
            <div
              onClick={() => onNavigate('jobs')}
              className="absolute top-[20%] left-[22%] float-slow z-20 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-cyan-400/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-2xl text-cyan-400">memory</span>
              </div>
              <div className="absolute top-full mt-2 w-36 glass-card p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-40 text-left bg-[#0c1324]/90">
                <p className="text-[9px] text-slate-400 uppercase font-bold">Tech Sector</p>
                <p className="text-xs text-white font-semibold mt-0.5">4,200 Alumni</p>
              </div>
            </div>

            {/* Surrounding Node 2: Finance */}
            <div
              onClick={() => onNavigate('jobs')}
              className="absolute top-[20%] right-[22%] float-medium z-20 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-teal-400/30 hover:border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-2xl text-teal-400">show_chart</span>
              </div>
              <div className="absolute top-full mt-2 w-36 glass-card p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-40 text-left bg-[#0c1324]/90">
                <p className="text-[9px] text-slate-400 uppercase font-bold">Finance & VC</p>
                <p className="text-xs text-white font-semibold mt-0.5">2,100 Alumni</p>
              </div>
            </div>

            {/* Surrounding Node 3: Global Hubs */}
            <div
              onClick={() => onNavigate('community')}
              className="absolute bottom-[18%] left-[28%] float-fast z-20 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-purple-400/30 hover:border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.25)] hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-2xl text-purple-300">public</span>
              </div>
              <div className="absolute top-full mt-2 w-36 glass-card p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-40 text-left bg-[#0c1324]/90">
                <p className="text-[9px] text-slate-400 uppercase font-bold">Global Hubs</p>
                <p className="text-xs text-white font-semibold mt-0.5">85+ Countries</p>
              </div>
            </div>

            {/* Connecting Dashed SVG Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' }}
            >
              <line
                x1="26%"
                y1="26%"
                x2="50%"
                y2="50%"
                stroke="rgba(59, 130, 246, 0.4)"
                strokeDasharray="4 4"
                strokeWidth="2"
              />
              <line
                x1="74%"
                y1="26%"
                x2="50%"
                y2="50%"
                stroke="rgba(45, 212, 191, 0.4)"
                strokeDasharray="4 4"
                strokeWidth="2"
              />
              <line
                x1="32%"
                y1="76%"
                x2="50%"
                y2="50%"
                stroke="rgba(208, 188, 255, 0.4)"
                strokeDasharray="4 4"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Stats Row Below Hero (Image 7 / 19 / 23) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24">
          {/* Card 1: Active Alumni */}
          <div
            onClick={() => onNavigate('alumni')}
            className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-blue-500/40 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-white number-counter">
              12,500<span className="text-blue-400">+</span>
            </p>
            <p className="text-sm font-medium text-slate-400 mt-2">Active Alumni</p>
          </div>

          {/* Card 2: Countries */}
          <div
            onClick={() => onNavigate('community')}
            className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-cyan-500/40 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-white number-counter">
              85<span className="text-cyan-400">+</span>
            </p>
            <p className="text-sm font-medium text-slate-400 mt-2">Countries</p>
          </div>

          {/* Card 3: Companies */}
          <div
            onClick={() => onNavigate('jobs')}
            className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-purple-500/40 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-white number-counter">
              3,200<span className="text-purple-300">+</span>
            </p>
            <p className="text-sm font-medium text-slate-400 mt-2">Companies</p>
          </div>

          {/* Card 4: Mentors */}
          <div
            onClick={() => onNavigate('mentorship')}
            className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-teal-500/40 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-white number-counter">
              500<span className="text-teal-300">+</span>
            </p>
            <p className="text-sm font-medium text-slate-400 mt-2">Mentors</p>
          </div>
        </div>
      </section>

      {/* FEATURED ALUMNI SPOTLIGHT SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Leaders</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
              Connect with Industry Pioneers
            </h2>
          </div>
          <button
            onClick={() => onNavigate('alumni')}
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group"
          >
            <span>View All Alumni Directory</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALUMNI_DATA.slice(0, 3).map((alum) => (
            <div
              key={alum.id}
              onClick={() => onNavigate('profile', alum.id)}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-blue-500/40 transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={alum.avatar}
                      alt={alum.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-lg"
                    />
                    {alum.isVerified && (
                      <span className="absolute bottom-0 right-0 bg-teal-500 text-slate-950 rounded-full p-0.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px] block icon-fill">
                          verified
                        </span>
                      </span>
                    )}
                  </div>
                  {alum.mentorship.available && (
                    <span className="text-[11px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-full">
                      Mentoring Open
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                  {alum.name}
                </h3>
                <p className="text-sm text-slate-300 font-medium">{alum.role} at {alum.company}</p>
                <p className="text-xs text-slate-400 mt-1">{alum.degree}</p>

                <p className="text-xs text-slate-300 mt-4 line-clamp-2 leading-relaxed">
                  {alum.about}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {alum.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">{alum.location}</span>
                <span className="text-xs font-semibold text-blue-400 group-hover:underline flex items-center gap-1">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DUAL SECTION: UPCOMING EVENTS & CAREER OPPORTUNITIES */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Events Spotlight */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 md:p-8 border border-white/15 text-left">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">Upcoming Alumni Events</h3>
                <p className="text-xs text-slate-400">Exclusive mixers, summits & panels</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-semibold text-purple-300 hover:underline"
            >
              See All
            </button>
          </div>

          <div className="space-y-4">
            {EVENTS_DATA.slice(0, 2).map((evt) => (
              <div
                key={evt.id}
                onClick={() => onNavigate('events')}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-red-400 uppercase">{evt.month}</span>
                  <span className="text-lg font-bold text-white leading-none">{evt.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                      {evt.type}
                    </span>
                    <span className="text-xs text-slate-400">{evt.attendeesCount} Attending</span>
                  </div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate mt-1">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{evt.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Jobs Spotlight */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 md:p-8 border border-white/15 text-left">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">Alumni Opportunities</h3>
                <p className="text-xs text-slate-400">Direct referrals at leading companies</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-semibold text-teal-300 hover:underline"
            >
              View Board
            </button>
          </div>

          <div className="space-y-4">
            {JOBS_DATA.slice(0, 2).map((job) => (
              <div
                key={job.id}
                onClick={() => onNavigate('jobs')}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-600/30 to-teal-500/30 border border-white/15 flex items-center justify-center font-display font-bold text-lg text-white shrink-0">
                  {job.logoInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-teal-300">{job.company}</span>
                    <span className="text-xs text-slate-400">• {job.location}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-teal-300 transition-colors truncate mt-1">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{job.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
