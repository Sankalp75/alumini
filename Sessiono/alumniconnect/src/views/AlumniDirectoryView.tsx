import React, { useState, useMemo } from 'react';
import { RouteType, AlumniProfile } from '../types';
import { ALUMNI_DATA } from '../data/mockData';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Sparkles,
  MapPin,
  School,
  UserPlus,
  MessageSquare,
  Handshake,
  Check
} from 'lucide-react';

interface AlumniDirectoryViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onRequestMentorship: (profile: AlumniProfile) => void;
  onOpenMessageWith: (profileId: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success') => void;
}

export const AlumniDirectoryView: React.FC<AlumniDirectoryViewProps> = ({
  onNavigate,
  onRequestMentorship,
  onOpenMessageWith,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [mentorshipOnly, setMentorshipOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({
    'sarah-jenkins': true
  });

  const industries = ['All', 'Technology', 'Healthcare & AI', 'Venture Capital', 'E-Commerce', 'Fintech'];

  const filteredAlumni = useMemo(() => {
    return ALUMNI_DATA.filter((alum) => {
      const matchSearch =
        searchTerm === '' ||
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchIndustry =
        selectedIndustry === 'All' ||
        (selectedIndustry === 'Technology' && (alum.company === 'Apple' || alum.company === 'Google')) ||
        (selectedIndustry === 'Healthcare & AI' && (alum.company === 'NeuralTech' || alum.company === 'BioHealth Labs')) ||
        (selectedIndustry === 'Venture Capital' && (alum.company === 'Apex Capital' || alum.company === 'Founders Fund')) ||
        (selectedIndustry === 'E-Commerce' && alum.company === 'Shopify') ||
        (selectedIndustry === 'Fintech' && (alum.company === 'Stripe' || alum.company === 'Coinbase'));

      const matchMentorship = !mentorshipOnly || alum.mentorship.available;

      return matchSearch && matchIndustry && matchMentorship;
    });
  }, [searchTerm, selectedIndustry, mentorshipOnly]);

  const toggleConnect = (alum: AlumniProfile, e: React.MouseEvent) => {
    e.stopPropagation();
    const isConn = connectedIds[alum.id];
    setConnectedIds((prev) => ({ ...prev, [alum.id]: !isConn }));
    onShowToast(
      isConn ? `Disconnected from ${alum.name}` : `Connection request sent to ${alum.name}!`,
      'success'
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Registry • 12,500+ Members</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Alumni Directory
          </h1>
          <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
            Explore and connect with fellow graduates across global tech, finance, design, and research hubs.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl border transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl border transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 md:p-5 border border-white/15 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main search input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, role, company, or skills..."
              className="w-full bg-black/40 border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Mentorship Filter Pill */}
          <button
            onClick={() => setMentorshipOnly(!mentorshipOnly)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all shrink-0 ${
              mentorshipOnly
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md font-bold'
                : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Open for Mentoring</span>
          </button>
        </div>

        {/* Industry Pill selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Industry:</span>
          </span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedIndustry === ind
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/20'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredAlumni.length} alumni</span>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedIndustry('All');
              setMentorshipOnly(false);
            }}
            className="text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ALUMNI CARDS: GRID / LIST */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alum) => {
            const isConn = connectedIds[alum.id] || alum.isConnected;
            return (
              <div
                key={alum.id}
                onClick={() => onNavigate('profile', alum.id)}
                className="glass-card rounded-2xl p-6 border border-white/15 hover:border-blue-500/40 transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={alum.avatar}
                        alt={alum.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
                      />
                      {alum.isVerified && (
                        <span className="absolute bottom-0 right-0 bg-teal-400 text-slate-950 rounded-full p-0.5 shadow-sm">
                          <span className="material-symbols-outlined text-[13px] block icon-fill">
                            verified
                          </span>
                        </span>
                      )}
                    </div>
                    {alum.mentorship.available && (
                      <span className="text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Mentor
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                    {alum.name}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium">{alum.role}</p>
                  <p className="text-xs text-blue-400 font-semibold">{alum.company}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      <span>{alum.classYear}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{alum.location}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3.5 line-clamp-2 leading-relaxed">
                    {alum.about}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {alum.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {alum.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 px-1 py-0.5">
                        +{alum.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => toggleConnect(alum, e)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isConn
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {isConn ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMessageWith(alum.id);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Send Message"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                  </button>

                  {alum.mentorship.available && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestMentorship(alum);
                      }}
                      className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/20 transition-colors"
                      title="Request Mentorship"
                    >
                      <Handshake className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-3">
          {filteredAlumni.map((alum) => {
            const isConn = connectedIds[alum.id] || alum.isConnected;
            return (
              <div
                key={alum.id}
                onClick={() => onNavigate('profile', alum.id)}
                className="glass-card rounded-2xl p-4 md:p-5 border border-white/15 hover:border-blue-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={alum.avatar}
                    alt={alum.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                        {alum.name}
                      </h3>
                      {alum.isVerified && (
                        <span className="material-symbols-outlined text-teal-400 text-sm icon-fill">
                          verified
                        </span>
                      )}
                      {alum.mentorship.available && (
                        <span className="text-[10px] bg-teal-500/15 text-teal-300 px-2 py-0.5 rounded-full font-semibold">
                          Mentor
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      {alum.role} at <span className="text-blue-300 font-semibold">{alum.company}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {alum.degree} • {alum.location}
                    </p>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={(e) => toggleConnect(alum, e)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isConn
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {isConn ? <Check className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                    <span>{isConn ? 'Connected' : 'Connect'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMessageWith(alum.id);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredAlumni.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl border border-white/10">
          <p className="text-base text-white font-semibold">No alumni found</p>
          <p className="text-xs text-slate-400 mt-1">Try broadening your search term or clearing the filters.</p>
        </div>
      )}
    </div>
  );
};
