import React, { useState } from 'react';
import { AlumniProfile } from '../types';
import { X, CheckCircle2, Clock, Calendar, Video, Coffee, Send } from 'lucide-react';

interface RequestMentorshipModalProps {
  mentor: AlumniProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { mentorId: string; area: string; format: string; note: string }) => void;
}

export const RequestMentorshipModal: React.FC<RequestMentorshipModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [format, setFormat] = useState<'virtual' | 'coffee'>('virtual');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen || !mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      mentorId: mentor.id,
      area: selectedArea || mentor.mentorship.areas[0] || 'Career Guidance',
      format: format === 'virtual' ? 'Virtual (Zoom / Meet)' : 'In-Person Coffee Chat',
      note
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-card rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Mentorship Request Sent!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              {mentor.name} has been notified and will review your request along with your profile.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-teal-400/50 shadow-md"
              />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 bg-teal-400/10 px-2.5 py-0.5 rounded-full border border-teal-400/20">
                  Request Mentorship
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-1">{mentor.name}</h3>
                <p className="text-xs text-slate-300">{mentor.role} at {mentor.company}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Focus Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Focus Area
                </label>
                <div className="flex flex-wrap gap-2">
                  {mentor.mentorship.areas.map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        (selectedArea || mentor.mentorship.areas[0]) === area
                          ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Meeting Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat('virtual')}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      format === 'virtual'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <Video className="w-4 h-4 text-blue-400" />
                    <span>Virtual (Zoom/Meet)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('coffee')}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      format === 'coffee'
                        ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span>Coffee Chat ({mentor.location})</span>
                  </button>
                </div>
              </div>

              {/* Commitment info */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{mentor.mentorship.commitment}</span>
              </div>

              {/* Personal Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Introduce yourself & your goals (Optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell the mentor what challenges you are tackling or what feedback you are looking for..."
                  className="w-full bg-black/30 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Mentorship Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
