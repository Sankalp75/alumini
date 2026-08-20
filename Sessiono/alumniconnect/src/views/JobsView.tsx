import React, { useState } from 'react';
import { RouteType, JobOpportunity } from '../types';
import { JOBS_DATA } from '../data/mockData';
import { Search, Building, MapPin, DollarSign, Users, Sparkles, Send, Check, Bookmark } from 'lucide-react';

interface JobsViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onOpenMessageWith: (profileId: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success') => void;
}

export const JobsView: React.FC<JobsViewProps> = ({
  onNavigate,
  onOpenMessageWith,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});

  const types = ['All', 'Full-time', 'Contract', 'Remote'];

  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchType =
      selectedType === 'All' ||
      job.type.toLowerCase().includes(selectedType.toLowerCase()) ||
      (selectedType === 'Remote' && job.location.toLowerCase().includes('remote'));

    return matchSearch && matchType;
  });

  const handleApply = (job: JobOpportunity) => {
    setAppliedJobs((prev) => ({ ...prev, [job.id]: true }));
    onShowToast(`Application & alumni endorsement submitted for ${job.title} at ${job.company}!`, 'success');
  };

  const toggleSave = (jobId: string) => {
    const isSaved = savedJobs[jobId];
    setSavedJobs((prev) => ({ ...prev, [jobId]: !isSaved }));
    onShowToast(isSaved ? 'Job removed from saved list' : 'Job saved to your bookmarks!', 'info');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Referral Network</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Career Opportunities
          </h1>
          <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
            Discover roles posted by alumni and tap into warm internal introductions and referrals.
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedType === t
                  ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="glass-card rounded-2xl p-4 border border-white/15">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title, company (Apple, Stripe, Google), or skill tags..."
            className="w-full bg-black/40 border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          />
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs[job.id];
          const isSaved = savedJobs[job.id];
          return (
            <div
              key={job.id}
              className="glass-card rounded-2xl p-6 border border-white/15 hover:border-teal-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Company Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600/30 to-teal-500/30 border border-white/15 flex items-center justify-center font-display font-bold text-lg text-white shrink-0">
                      {job.logoInitial}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-teal-300 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <span>{job.company}</span>
                        <span>•</span>
                        <span className="text-slate-400">{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSave(job.id)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isSaved ? 'text-teal-400 fill-teal-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Job Details Pills */}
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-4">
                  <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    {job.type}
                  </span>
                  <span className="bg-teal-500/10 border border-teal-500/20 text-teal-300 font-semibold px-2.5 py-1 rounded-lg">
                    {job.salary}
                  </span>
                  <span className="bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{job.alumniAtCompany} Alumni at {job.company}</span>
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-white/5 border border-white/10 text-slate-400 px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  Posted {job.postedDate}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenMessageWith('sarah-jenkins')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  >
                    Request Referral
                  </button>

                  <button
                    onClick={() => handleApply(job)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Quick Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
