import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Briefcase, Calendar, Building, ArrowRight } from 'lucide-react';
import { ALUMNI_DATA, JOBS_DATA, EVENTS_DATA } from '../data/mockData';
import { RouteType } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteType, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredAlumni = trimmed
    ? ALUMNI_DATA.filter(
        (a) =>
          a.name.toLowerCase().includes(trimmed) ||
          a.role.toLowerCase().includes(trimmed) ||
          a.company.toLowerCase().includes(trimmed) ||
          a.skills.some((s) => s.toLowerCase().includes(trimmed))
      )
    : ALUMNI_DATA.slice(0, 3);

  const filteredJobs = trimmed
    ? JOBS_DATA.filter(
        (j) =>
          j.title.toLowerCase().includes(trimmed) ||
          j.company.toLowerCase().includes(trimmed) ||
          j.tags.some((t) => t.toLowerCase().includes(trimmed))
      )
    : JOBS_DATA.slice(0, 2);

  const filteredEvents = trimmed
    ? EVENTS_DATA.filter(
        (e) =>
          e.title.toLowerCase().includes(trimmed) ||
          e.location.toLowerCase().includes(trimmed) ||
          e.category.toLowerCase().includes(trimmed)
      )
    : EVENTS_DATA.slice(0, 2);

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 md:pt-28 px-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden border border-white/20 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 bg-white/5">
          <Search className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alumni, jobs, events, skills, companies..."
            className="w-full bg-transparent border-none text-white text-base focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-2 py-1 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 no-scrollbar">
          {/* Alumni Category */}
          {filteredAlumni.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Alumni ({filteredAlumni.length})</span>
              </div>
              <div className="space-y-1">
                {filteredAlumni.map((alum) => (
                  <div
                    key={alum.id}
                    onClick={() => {
                      onClose();
                      onNavigate('profile', alum.id);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={alum.avatar}
                        alt={alum.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-blue-300 flex items-center gap-1.5">
                          {alum.name}
                          {alum.isVerified && (
                            <span className="material-symbols-outlined text-teal-400 text-xs icon-fill">
                              verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {alum.role} at {alum.company} • {alum.location}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Category */}
          {filteredJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                <span>Job Openings ({filteredJobs.length})</span>
              </div>
              <div className="space-y-1">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      onClose();
                      onNavigate('jobs');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/30 to-teal-500/30 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                        {job.logoInitial}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-teal-300">
                          {job.title}
                        </div>
                        <p className="text-xs text-slate-400">
                          {job.company} • {job.location} • {job.salary}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-full font-medium">
                      {job.alumniAtCompany} Alumni
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Category */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Events ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onClose();
                      onNavigate('events');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-red-400 uppercase">{evt.month}</span>
                        <span className="text-xs font-bold text-white leading-none">{evt.day}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-purple-300">
                          {evt.title}
                        </div>
                        <p className="text-xs text-slate-400">
                          {evt.type} • {evt.attendeesCount} Attending
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{evt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredAlumni.length === 0 && filteredJobs.length === 0 && filteredEvents.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Building className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching by alumni name, company, or job role.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/5 flex justify-between items-center text-[11px] text-slate-400">
          <span>Quick actions available</span>
          <div className="flex items-center gap-3">
            <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">ESC</kbd> to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
