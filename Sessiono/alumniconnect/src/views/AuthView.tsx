import React, { useState } from 'react';
import { RouteType, UserSession } from '../types';
import { School, ShieldCheck, ArrowRight, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

interface AuthViewProps {
  mode: 'login' | 'signup';
  onNavigate: (route: RouteType, param?: string) => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ mode, onNavigate, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gradYear, setGradYear] = useState('2018');
  const [degree, setDegree] = useState('B.S. Computer Science');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserSession = {
      id: 'usr-current',
      name: name || (isSignUp ? 'Alex Morgan' : 'Sarah Jenkins'),
      email: email || (isSignUp ? 'alex.morgan@alumni.edu' : 'sarah.j@apple.com'),
      avatar: isSignUp
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Alumni'
    };
    onLoginSuccess(newUser);
  };

  const handleDemoSignIn = () => {
    onLoginSuccess({
      id: 'usr-sarah',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@apple.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Alumni Lead'
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-left">
      <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden bg-[#0c1324]/90 backdrop-blur-xl">
        {/* Brand Icon Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-600/40">
            <span className="material-symbols-outlined text-white text-2xl icon-fill">hub</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">
            {isSignUp ? 'Join AlumniConnect' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-300">
            {isSignUp
              ? 'Verify your academic credentials to enter the network'
              : 'Sign in to access exclusive alumni opportunities and messaging'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Class Year
                  </label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="2018"
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.S. CS"
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Institutional or Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@alumni.stanford.edu or work"
                className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>{isSignUp ? 'Complete Registration' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo 1-Click login */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <button
            onClick={handleDemoSignIn}
            className="w-full py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Instant Demo Sign In (Sarah Jenkins - Apple)</span>
          </button>
        </div>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-400 font-semibold hover:underline ml-1"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-400 font-semibold hover:underline ml-1"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
