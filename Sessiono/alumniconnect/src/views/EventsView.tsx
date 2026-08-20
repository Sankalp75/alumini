import React, { useState } from 'react';
import { RouteType, AlumniEvent } from '../types';
import { EVENTS_DATA } from '../data/mockData';
import { Calendar, MapPin, Users, Video, Plus, Check, Share2, Sparkles, Filter } from 'lucide-react';

interface EventsViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success') => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate, onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [events, setEvents] = useState<AlumniEvent[]>(EVENTS_DATA);
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({
    'evt-1': true
  });

  const categories = ['All', 'Networking', 'Panel Discussion', 'Summit', 'Workshops'];

  const filteredEvents = events.filter(
    (e) => selectedCategory === 'All' || e.category === selectedCategory
  );

  const handleRegisterToggle = (evt: AlumniEvent) => {
    const isReg = registeredIds[evt.id];
    setRegisteredIds((prev) => ({ ...prev, [evt.id]: !isReg }));
    onShowToast(
      isReg ? `Cancelled RSVP for ${evt.title}` : `RSVP confirmed for ${evt.title}! Calendar invite sent.`,
      'success'
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Gatherings & Summits</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Upcoming Events
          </h1>
          <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
            Join exclusive in-person mixers in major tech hubs or tune into virtual panels and masterclasses.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/20'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Event Banner */}
      {filteredEvents[0] && (
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15 relative group">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 h-64 lg:h-auto relative overflow-hidden bg-slate-900">
              <img
                src={filteredEvents[0].coverImage}
                alt={filteredEvents[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>Featured Event</span>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full">
                    {filteredEvents[0].type}
                  </span>
                  <span className="text-xs text-slate-400">
                    {filteredEvents[0].attendeesCount} Registered
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {filteredEvents[0].title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {filteredEvents[0].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{filteredEvents[0].month} {filteredEvents[0].day}, 2026 • {filteredEvents[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {filteredEvents[0].isVirtual ? (
                      <>
                        <Video className="w-4 h-4 text-teal-400" />
                        <span>Virtual Live Stream (Zoom + Spatial)</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span>{filteredEvents[0].location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleRegisterToggle(filteredEvents[0])}
                  className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                    registeredIds[filteredEvents[0].id]
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                  }`}
                >
                  {registeredIds[filteredEvents[0].id] ? (
                    <>
                      <Check className="w-4 h-4 text-teal-400" />
                      <span>Attending (RSVP Confirmed)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>RSVP for Free</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    onShowToast('Event link copied!', 'info');
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  title="Share event"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isReg = registeredIds[evt.id];
          return (
            <div
              key={evt.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/15 flex flex-col justify-between hover:border-purple-500/40 transition-all group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={evt.coverImage}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-red-400 uppercase">{evt.month}</span>
                    <span className="text-sm font-bold text-white leading-none">{evt.day}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[10px] font-medium text-white">
                    {evt.type}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-purple-300 transition-colors mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      <span>{evt.attendeesCount} Alumni Attending</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleRegisterToggle(evt)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isReg
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {isReg ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>Attending</span>
                    </>
                  ) : (
                    <span>RSVP Now</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
