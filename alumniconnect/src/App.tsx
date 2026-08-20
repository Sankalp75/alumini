import React, { useState } from 'react';
import { RouteType, UserSession, AlumniProfile, Conversation } from './types';
import { ALUMNI_DATA, CONVERSATIONS_DATA } from './data/mockData';
import { NetworkShader } from './components/NetworkShader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { RequestMentorshipModal } from './components/RequestMentorshipModal';
import { MessagesDrawer } from './components/MessagesDrawer';

import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { AlumniDirectoryView } from './views/AlumniDirectoryView';
import { EventsView } from './views/EventsView';
import { JobsView } from './views/JobsView';
import { MentorshipView } from './views/MentorshipView';
import { CommunityView } from './views/CommunityView';
import { DashboardView } from './views/DashboardView';
import { AuthView } from './views/AuthView';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');
  const [activeProfileId, setActiveProfileId] = useState<string>('sarah-jenkins');

  // Authentication state
  const [user, setUser] = useState<UserSession | null>({
    id: 'usr-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@apple.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Alumni Lead'
  });

  // Modal & Drawer states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<string>('c1');
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS_DATA);

  // Mentorship Modal State
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<AlumniProfile | null>(ALUMNI_DATA[0]);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handleNavigate = (route: RouteType, param?: string) => {
    if (param) {
      setActiveProfileId(param);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestMentorship = (mentor: AlumniProfile) => {
    setSelectedMentor(mentor);
    setMentorshipModalOpen(true);
  };

  const handleOpenMessageWith = (profileId: string) => {
    const targetAlum = ALUMNI_DATA.find((a) => a.id === profileId);
    if (!targetAlum) return;

    let conv = conversations.find((c) => c.participantId === profileId);
    if (!conv) {
      conv = {
        id: `c-${Date.now()}`,
        participantId: targetAlum.id,
        participantName: targetAlum.name,
        participantAvatar: targetAlum.avatar,
        participantRole: `${targetAlum.role} at ${targetAlum.company}`,
        lastMessage: 'Started new direct message',
        lastMessageTime: 'Just now',
        unread: false,
        messages: [
          {
            id: `m-init-${Date.now()}`,
            senderId: targetAlum.id,
            senderName: targetAlum.name,
            senderAvatar: targetAlum.avatar,
            text: `Hi! Thanks for connecting. How can I help with your design, tech, or career journey?`,
            timestamp: 'Just now',
            isMe: false
          }
        ]
      };
      setConversations([conv, ...conversations]);
    }
    setActiveConversationId(conv.id);
    setIsMessagesOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const updated = conversations.map((c) => {
      if (c.id === conversationId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: user?.id || 'me',
          senderName: user?.name || 'You',
          senderAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          text,
          timestamp: 'Just now',
          isMe: true
        };
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setConversations(updated);

    // Simulated alumni response
    const targetConv = conversations.find((c) => c.id === conversationId);
    if (targetConv) {
      setTimeout(() => {
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === conversationId) {
              const replyMsg = {
                id: `msg-reply-${Date.now()}`,
                senderId: c.participantId,
                senderName: c.participantName,
                senderAvatar: c.participantAvatar,
                text: `Thanks for the message! Let's definitely coordinate a time to chat or connect during the next alumni mixer.`,
                timestamp: 'Just now',
                isMe: false
              };
              return {
                ...c,
                lastMessage: replyMsg.text,
                lastMessageTime: 'Just now',
                messages: [...c.messages, replyMsg]
              };
            }
            return c;
          })
        );
        showToast(`New message from ${targetConv.participantName}`, 'info');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Interactive WebGL Shader Background */}
      <NetworkShader opacity={0.85} />

      {/* Global Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        user={user}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMessages={() => setIsMessagesOpen(true)}
        onLogout={() => {
          setUser(null);
          showToast('Signed out of AlumniConnect.', 'info');
        }}
        unreadCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-12 relative z-10">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenMentorshipModal={(mentorId) => {
              const m = ALUMNI_DATA.find((a) => a.id === mentorId) || ALUMNI_DATA[0];
              handleRequestMentorship(m);
            }}
          />
        )}

        {currentRoute === 'profile' && (
          <ProfileView
            profileId={activeProfileId}
            onNavigate={handleNavigate}
            onRequestMentorship={handleRequestMentorship}
            onOpenMessageWith={handleOpenMessageWith}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'alumni' && (
          <AlumniDirectoryView
            onNavigate={handleNavigate}
            onRequestMentorship={handleRequestMentorship}
            onOpenMessageWith={handleOpenMessageWith}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'events' && (
          <EventsView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'jobs' && (
          <JobsView
            onNavigate={handleNavigate}
            onOpenMessageWith={handleOpenMessageWith}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'mentorship' && (
          <MentorshipView
            onNavigate={handleNavigate}
            onRequestMentorship={handleRequestMentorship}
            onOpenMessageWith={handleOpenMessageWith}
          />
        )}

        {currentRoute === 'community' && (
          <CommunityView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'dashboard' && (
          <DashboardView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {(currentRoute === 'login' || currentRoute === 'signup') && (
          <AuthView
            mode={currentRoute}
            onNavigate={handleNavigate}
            onLoginSuccess={(loggedUser) => {
              setUser(loggedUser);
              setCurrentRoute('profile');
              showToast(`Welcome back, ${loggedUser.name}!`, 'success');
            }}
          />
        )}
      </main>

      {/* Global Shared Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mentorship Booking Modal */}
      <RequestMentorshipModal
        mentor={selectedMentor}
        isOpen={mentorshipModalOpen}
        onClose={() => setMentorshipModalOpen(false)}
        onSubmit={({ area, format, note }) => {
          showToast(
            `Mentorship request sent to ${selectedMentor?.name} for ${area} (${format})!`,
            'success'
          );
        }}
      />

      {/* Messages Drawer */}
      <MessagesDrawer
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onSendMessage={handleSendMessage}
      />

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[150] flex items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-white/20 shadow-2xl text-xs md:text-sm animate-in slide-in-from-bottom-3 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          <span className="text-white font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
