import React from 'react';
import { RouteType } from '../types';

interface FooterProps {
  onNavigate: (route: RouteType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="bg-[#0c1324]/90 border-t border-white/10 py-12 mt-20 relative z-20 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="font-display font-extrabold text-xl text-white flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-base icon-fill">hub</span>
              </div>
              <span>AlumniConnect</span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where alumni connections become boundless career, venture, and mentorship opportunities.
            </p>
          </div>

          {/* Col 2: Network */}
          <div className="space-y-2.5">
            <h5 className="font-semibold text-xs text-slate-200 uppercase tracking-wider">Network</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('alumni')} className="hover:text-blue-400 transition-colors">
                  Alumni Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentorship')} className="hover:text-blue-400 transition-colors">
                  Find a Mentor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-blue-400 transition-colors">
                  Global Chapters
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opportunities */}
          <div className="space-y-2.5">
            <h5 className="font-semibold text-xs text-slate-200 uppercase tracking-wider">Opportunities</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-teal-400 transition-colors">
                  Alumni Job Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-teal-400 transition-colors">
                  Mixers & Conferences
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-teal-400 transition-colors">
                  Analytics & Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Security */}
          <div className="space-y-2.5">
            <h5 className="font-semibold text-xs text-slate-200 uppercase tracking-wider">Platform</h5>
            <p className="text-xs text-slate-400">
              Encrypted institutional directory verified with academic registries.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>Network Live • 12,500+ Alumni</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap gap-6 items-center">
            <button className="hover:text-slate-200 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-200 transition-colors">Terms of Service</button>
            <button className="hover:text-slate-200 transition-colors">Security & Ethics</button>
            <button onClick={() => onNavigate('alumni')} className="hover:text-blue-400 transition-colors">
              Alumni Directory
            </button>
          </div>
          <div>
            <span>© 2026 AlumniConnect. Engineered for Momentum.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
