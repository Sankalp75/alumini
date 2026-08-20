import React, { useState, useEffect } from 'react';
import { RouteType, UserSession } from '../types';
import { Search, Bell, MessageSquare, LogOut, LayoutDashboard, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  currentRoute: RouteType;
  onNavigate: (route: RouteType, param?: string) => void;
  user: UserSession | null;
  onOpenSearch: () => void;
  onOpenMessages: () => void;
  onLogout: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  user,
  onOpenSearch,
  onOpenMessages,
  onLogout,
  unreadCount = 2
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: RouteType }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Alumni', route: 'alumni' },
    { label: 'Events', route: 'events' },
    { label: 'Jobs', route: 'jobs' },
    { label: 'Mentorship', route: 'mentorship' },
    { label: 'Community', route: 'community' },
    { label: 'Analytics', route: 'dashboard' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0c1324]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] py-3'
          : 'bg-white/5 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)] py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight flex items-center gap-2.5 transition-transform duration-200 active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <span className="material-symbols-outlined text-white text-[22px] icon-fill">hub</span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200">
              AlumniConnect
            </span>
          </button>

          {/* Search Trigger (Desktop Inline) */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="hidden xl:flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-300 hover:text-white transition-all w-60 group shadow-inner"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-slate-400 group-hover:text-slate-200 text-xs">Search alumni, jobs...</span>
            <kbd className="ml-auto text-[10px] bg-white/10 border border-white/15 px-1.5 py-0.5 rounded text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                id={`nav-link-${item.route}`}
                onClick={() => onNavigate(item.route)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-2 md:gap-3.5">
          {/* Search button mobile / tablet */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Search (⌘K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Messages button */}
          <button
            id="nav-messages-btn"
            onClick={onOpenMessages}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Direct Messages"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full ring-2 ring-[#0c1324] animate-pulse" />
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              id="nav-notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0c1324]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50 border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-semibold text-sm text-white">Notifications</h4>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-medium">
                    2 New
                  </span>
                </div>
                <div className="space-y-2.5 mt-3 text-xs text-slate-300">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('profile', 'sarah-jenkins');
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex gap-3 items-start"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Sarah Jenkins accepted your connection request.</p>
                      <span className="text-slate-400 text-[10px]">10m ago • Cupertino, CA</span>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('events');
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex gap-3 items-start"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Reminder: Design Alumni Mixer SF is this Thursday.</p>
                      <span className="text-slate-400 text-[10px]">2h ago • 148 attending</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Sign In */}
          {user ? (
            <div className="relative">
              <button
                id="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 pl-1.5 pr-3 py-1.5 rounded-full transition-all active:scale-95"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-white/20"
                />
                <span className="text-sm font-medium text-white hidden sm:inline-block max-w-[120px] truncate">
                  {user.name}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 glass-card rounded-2xl p-2 shadow-2xl z-50 border border-white/15 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-blue-400 font-medium">{user.role} Account</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-400" />
                      <span>Admin Suite / Dashboard</span>
                    </button>
                    <button
                      id="dropdown-profile-btn"
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('profile', 'sarah-jenkins');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
                    >
                      <UserCheck className="w-4 h-4 text-teal-400" />
                      <span>View Alumni Profile</span>
                    </button>
                  </div>
                  <div className="border-t border-white/10 pt-1">
                    <button
                      id="dropdown-signout-btn"
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="login-cta-btn"
                onClick={() => onNavigate('login')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md shadow-sm active:scale-95"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-white/5 no-scrollbar">
        {navLinks.map((item) => (
          <button
            key={item.route}
            onClick={() => onNavigate(item.route)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              currentRoute === item.route
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
