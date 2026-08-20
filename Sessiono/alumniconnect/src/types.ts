export type RouteType = 
  | 'home'
  | 'alumni'
  | 'profile'
  | 'dashboard'
  | 'events'
  | 'jobs'
  | 'mentorship'
  | 'community'
  | 'login'
  | 'signup';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  title?: string;
  company?: string;
  graduationYear?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  description: string;
}

export interface MentorshipDetails {
  available: boolean;
  areas: string[];
  commitment: string;
  note?: string;
}

export interface MutualConnection {
  id: string;
  name: string;
  avatar: string;
}

export interface AttendingEventSummary {
  id: string;
  title: string;
  month: string;
  day: string;
  isVirtual: boolean;
  location?: string;
  time?: string;
}

export interface SimilarAlum {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  classYear: number;
  degree: string;
  isVerified: boolean;
  avatar: string;
  coverImage: string;
  about: string;
  mentorship: MentorshipDetails;
  experience: ExperienceItem[];
  skills: string[];
  mutualConnections: MutualConnection[];
  mutualCount: number;
  attendingEvents: AttendingEventSummary[];
  similarAlumni: SimilarAlum[];
  industry: 'Tech' | 'Design' | 'Finance' | 'Healthcare' | 'Education' | 'Leadership';
  isConnected?: boolean;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  salary: string;
  logoInitial: string;
  logoColor: string;
  tags: string[];
  alumniAtCompany: number;
  postedDate: string;
  description: string;
  requirements: string[];
  referralAvailable: boolean;
}

export interface AlumniEvent {
  id: string;
  title: string;
  dateStr: string;
  month: string;
  day: string;
  time: string;
  type: 'Virtual' | 'In-Person' | 'Hybrid';
  location: string;
  category: 'Mixer' | 'Workshop' | 'Conference' | 'Panel' | 'Reunion';
  description: string;
  attendeesCount: number;
  attendeeAvatars: string[];
  isAttending?: boolean;
  hostName: string;
  hostRole: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: DirectMessage[];
}

export interface ChapterInfo {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  membersCount: number;
  leader?: string;
  leads?: string;
  description?: string;
  coverImage?: string;
  nextEvent?: string;
  lat?: number;
  lng?: number;
}
