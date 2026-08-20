import { AlumniProfile, JobOpportunity, AlumniEvent, Conversation, ChapterInfo } from '../types';

export const ALUMNI_DATA: AlumniProfile[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Design Lead',
    company: 'Apple',
    location: 'Cupertino, CA',
    classYear: 2015,
    degree: "Class of '15 • B.S. Interaction Design",
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiJq29tsjPwAbuDIa9J4qb0WXfiYVVpS4x0Ar-RNmK4GB1nEpjnFd0lxmw0ZWv2yFh8sRQpb_sjgoFSyu8qOpkMaJ_73fbX2LAvUSbFMrWKhSbrXWsrOAQTwtXL27H1sSLRcMyOBySuwHe79rtMHNOvQ27P1N3OkeaSkjYcenoQ5HfHmjPUna3FRvmw8QvR_ozxdaPG9wU2s-GqZMZMiYaAroLsjOAYlY5g2p9rlH3503PVCG0hs_O',
    about: 'Passionate design leader with over 8 years of experience crafting intuitive, human-centered digital products. Currently leading a talented team of designers at Apple, focusing on next-generation interaction paradigms. I believe in the power of design to solve complex problems and am deeply committed to mentoring the next generation of creatives. Always open to connecting with fellow alumni to discuss design, career paths, or potential collaborations.',
    mentorship: {
      available: true,
      areas: ['UX Research', 'Design Leadership', 'Portfolio Review'],
      commitment: '1-2 hours per month. Flexible scheduling via Zoom or in-person coffee chats in the Bay Area.',
      note: 'Currently accepting 2 new mentees for the upcoming quarter.'
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Design Lead',
        company: 'Apple',
        type: 'Full-time',
        period: 'Mar 2020 - Present',
        duration: '4 yrs',
        description: 'Leading a multidisciplinary team to design core system interactions. Mentoring junior designers and establishing design system standards across iOS & macOS ecosystem.'
      },
      {
        id: 'exp-2',
        role: 'Senior Product Designer',
        company: 'Airbnb',
        type: 'Full-time',
        period: 'Jun 2017 - Feb 2020',
        duration: '2 yrs 9 mos',
        description: 'Focused on the host experience, improving the onboarding flow and property management tools with measurable conversion lifts.'
      },
      {
        id: 'exp-3',
        role: 'Interaction Designer',
        company: 'Frog Design',
        type: 'Contract',
        period: 'Aug 2015 - May 2017',
        duration: '1 yr 10 mos',
        description: 'Consulted for various Fortune 500 clients, delivering end-to-end design solutions spanning mobile and web platforms.'
      }
    ],
    skills: [
      'User Experience (UX)',
      'Interaction Design',
      'Prototyping',
      'Design Systems',
      'Figma',
      'User Research',
      'Design Strategy',
      'Team Leadership'
    ],
    mutualConnections: [
      {
        id: 'mut-1',
        name: 'David Vance',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5oOsbKq_kDZc0Rwgxe_TbcgE3mNWXwGo9Q_IXQnWrEWgZxCAMDBx55lk7M879ZdOiOSpvyq4xWeCAz9K0MMLqFOtwfXw4o5mCXuSaKYNe2JcG-n_kRRN4zkr_3n_U0kRbmDWummInAr7WhSVU1UlNInomeqP3JUs06kbQvTQnXfj0_Ds-fsJaA7cLTevIe-1T-wB-vxh0Ex1JE8TzIMGuPLZjpCRa3_iVlQyUi2Le2w8sVRlXZWz'
      },
      {
        id: 'mut-2',
        name: 'Emily Zhao',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWxNlJkvsB89TB2Rb7OK1-MBPTy29UZ-huvORztdIfgYAdrPwYNaVfBRY0bEgcQ0M0ZQpf6YWoIv7950anWA2Lw4VsRl0twd4RR1pk_F78Qns3A6CoMYGA3QHjZuEum5FybKfoRAGxMqrbuilGyLyot0yMJsOnLPqxobKaMA-npoDIcrWh91B4VgzYO0Gjv3yhFelJA8x5dDfZt1lE6dkQLtgjO0sJtA50WdpQoqn0pSpjLujmLjxr'
      },
      {
        id: 'mut-3',
        name: 'Alex Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoadVFyCzfkjvll6tv6vHjy8FtqfYzZ5bL6V41AhEqlo-Xi6XWXkVMwnNnBkbRZc4Iye3QBTDPyCd4Y5E4VCA1lHnxyhKilaA9YL3s3zklEem2M7gwGUUwuMogZ530PUlkO18Sq1O8VLjMa6JdEHU1GskjuwWeM85zgwHbfnS-z3EZjh-9Pq9GIO5nwu1fosfZni6QXTDByGXmi5pOS-VgoRr-azYSs2vHpchWg7NnF0BvKEtUSA9F'
      }
    ],
    mutualCount: 12,
    attendingEvents: [
      {
        id: 'ev-1',
        title: 'Design Alumni Mixer SF',
        month: 'Oct',
        day: '24',
        isVirtual: true,
        location: 'Virtual Event Room A'
      }
    ],
    similarAlumni: [
      {
        id: 'alex-chen',
        name: 'Alex Chen',
        role: 'Product Designer',
        company: 'Google',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv'
      },
      {
        id: 'maria-garcia',
        name: 'Maria Garcia',
        role: 'UX Researcher',
        company: 'Meta',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdnYNlS9cm6wQ8h4JiJ8KhOdzjCdntkXSCECFLbPnBog0l9dVB3K8XLwEgJPUkusfCXkgnjVHyqBSrb5lo5Q0exIvuF82U7ozh4ts_Se39yDM10KR4pMJevqji7xqGmbRQ6of8sIaFniI1cxajidlIoGG8LSj_ueqUKdZrqtdWvO0HGw5uY-abfRarmh4CPp2TMxMwG1GoMqV4r9tWYK0Das3XeS-EHP5sEcUmdSnBbmUV9OzBxtiF'
      }
    ],
    industry: 'Design',
    isConnected: false
  },
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'Staff Product Designer',
    company: 'Google',
    location: 'Mountain View, CA',
    classYear: 2018,
    degree: "Class of '18 • B.S. Computer Science & HCI",
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    about: 'Design technologist bridging the gap between AI foundations and delightful human interfaces at Google Workspace & Gemini. Mentoring students navigating tech interviews and portfolio presentation.',
    mentorship: {
      available: true,
      areas: ['AI Product Design', 'Interaction Prototyping', 'Tech Career Strategy'],
      commitment: '2 hours/month over Google Meet.',
      note: 'Special interest in helping first-generation university graduates.'
    },
    experience: [
      {
        id: 'exp-ac-1',
        role: 'Staff Product Designer',
        company: 'Google',
        type: 'Full-time',
        period: '2021 - Present',
        duration: '3 yrs',
        description: 'Directing UX architecture for next-gen generative intelligence interfaces across enterprise products.'
      },
      {
        id: 'exp-ac-2',
        role: 'Senior UI/UX Designer',
        company: 'Uber',
        type: 'Full-time',
        period: '2018 - 2021',
        duration: '3 yrs',
        description: 'Built global mobility rider experiences across 65+ countries.'
      }
    ],
    skills: ['AI UI Design', 'Design Systems', 'Design Sprint', 'Next.js', 'User Testing', 'Creative Direction'],
    mutualConnections: [
      {
        id: 'mut-1',
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll'
      }
    ],
    mutualCount: 8,
    attendingEvents: [
      {
        id: 'ev-1',
        title: 'Design Alumni Mixer SF',
        month: 'Oct',
        day: '24',
        isVirtual: true,
        location: 'Virtual'
      },
      {
        id: 'ev-2',
        title: 'Global Alumni AI Summit 2026',
        month: 'Nov',
        day: '12',
        isVirtual: false,
        location: 'San Francisco, CA'
      }
    ],
    similarAlumni: [
      {
        id: 'sarah-jenkins',
        name: 'Sarah Jenkins',
        role: 'Design Lead',
        company: 'Apple',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll'
      }
    ],
    industry: 'Tech',
    isConnected: true
  },
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    role: 'Lead UX Researcher',
    company: 'Meta',
    location: 'Menlo Park, CA',
    classYear: 2017,
    degree: "Class of '17 • M.S. Cognitive Psychology",
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdnYNlS9cm6wQ8h4JiJ8KhOdzjCdntkXSCECFLbPnBog0l9dVB3K8XLwEgJPUkusfCXkgnjVHyqBSrb5lo5Q0exIvuF82U7ozh4ts_Se39yDM10KR4pMJevqji7xqGmbRQ6of8sIaFniI1cxajidlIoGG8LSj_ueqUKdZrqtdWvO0HGw5uY-abfRarmh4CPp2TMxMwG1GoMqV4r9tWYK0Das3XeS-EHP5sEcUmdSnBbmUV9OzBxtiF',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    about: 'Leading mixed-methods research initiatives for next-generation spatial computing and mixed reality experiences. Passionate about ethical tech, usability testing, and empowering new researchers.',
    mentorship: {
      available: true,
      areas: ['Mixed Methods Research', 'Qualitative Analysis', 'Research Strategy'],
      commitment: 'Bi-weekly 45-minute syncs.',
      note: 'Excited to review graduate research portfolios.'
    },
    experience: [
      {
        id: 'exp-mg-1',
        role: 'Lead UX Researcher',
        company: 'Meta Reality Labs',
        type: 'Full-time',
        period: '2020 - Present',
        duration: '4 yrs',
        description: 'Directing quantitative and qualitative research studies for Quest and smart glasses hardware/software.'
      }
    ],
    skills: ['User Interviews', 'Statistical Analysis', 'Usability Benchmarking', 'Survey Design', 'Eye Tracking'],
    mutualConnections: [],
    mutualCount: 14,
    attendingEvents: [
      {
        id: 'ev-1',
        title: 'Design Alumni Mixer SF',
        month: 'Oct',
        day: '24',
        isVirtual: true
      }
    ],
    similarAlumni: [
      {
        id: 'sarah-jenkins',
        name: 'Sarah Jenkins',
        role: 'Design Lead',
        company: 'Apple',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll'
      }
    ],
    industry: 'Design',
    isConnected: false
  },
  {
    id: 'david-vance',
    name: 'David Vance',
    role: 'Principal Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    classYear: 2014,
    degree: "Class of '14 • B.S. Computer Science",
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5oOsbKq_kDZc0Rwgxe_TbcgE3mNWXwGo9Q_IXQnWrEWgZxCAMDBx55lk7M879ZdOiOSpvyq4xWeCAz9K0MMLqFOtwfXw4o5mCXuSaKYNe2JcG-n_kRRN4zkr_3n_U0kRbmDWummInAr7WhSVU1UlNInomeqP3JUs06kbQvTQnXfj0_Ds-fsJaA7cLTevIe-1T-wB-vxh0Ex1JE8TzIMGuPLZjpCRa3_iVlQyUi2Le2w8sVRlXZWz',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    about: 'Fintech architect specializing in global payment infrastructure, distributed systems resilience, and high-throughput transaction pipelines.',
    mentorship: {
      available: false,
      areas: ['Distributed Systems', 'System Design', 'Backend Engineering'],
      commitment: 'Currently on mentorship sabbatical.'
    },
    experience: [
      {
        id: 'exp-dv-1',
        role: 'Principal Engineer',
        company: 'Stripe',
        type: 'Full-time',
        period: '2019 - Present',
        duration: '5 yrs',
        description: 'Architecting core ledger and treasury banking integrations with 99.999% uptime guarantees.'
      }
    ],
    skills: ['Rust', 'Distributed Systems', 'Go', 'PostgreSQL', 'Cloud Infrastructure', 'Fintech Architecture'],
    mutualConnections: [],
    mutualCount: 19,
    attendingEvents: [],
    similarAlumni: [],
    industry: 'Finance',
    isConnected: true
  },
  {
    id: 'emily-zhao',
    name: 'Emily Zhao',
    role: 'VP of Product',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    classYear: 2012,
    degree: "Class of '12 • B.A. Economics & Computer Science",
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWxNlJkvsB89TB2Rb7OK1-MBPTy29UZ-huvORztdIfgYAdrPwYNaVfBRY0bEgcQ0M0ZQpf6YWoIv7950anWA2Lw4VsRl0twd4RR1pk_F78Qns3A6CoMYGA3QHjZuEum5FybKfoRAGxMqrbuilGyLyot0yMJsOnLPqxobKaMA-npoDIcrWh91B4VgzYO0Gjv3yhFelJA8x5dDfZt1lE6dkQLtgjO0sJtA50WdpQoqn0pSpjLujmLjxr',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    about: 'Driving product strategy for foundational intelligence models and developer APIs. Former product lead at Dropbox & Square.',
    mentorship: {
      available: true,
      areas: ['Executive Leadership', 'Product Strategy', 'Venture Pitching'],
      commitment: '1 hour monthly executive coaching.'
    },
    experience: [
      {
        id: 'exp-ez-1',
        role: 'VP of Product',
        company: 'OpenAI',
        type: 'Full-time',
        period: '2022 - Present',
        duration: '2 yrs',
        description: 'Leading product development for developer ecosystems and enterprise intelligence platforms.'
      }
    ],
    skills: ['Product Strategy', 'GenAI Ecosystems', 'Executive Leadership', 'Go-To-Market', 'Team Scaling'],
    mutualConnections: [],
    mutualCount: 22,
    attendingEvents: [
      {
        id: 'ev-2',
        title: 'Global Alumni AI Summit 2026',
        month: 'Nov',
        day: '12',
        isVirtual: false,
        location: 'San Francisco, CA'
      }
    ],
    similarAlumni: [],
    industry: 'Leadership',
    isConnected: false
  }
];

export const EVENTS_DATA: AlumniEvent[] = [
  {
    id: 'ev-1',
    title: 'Design Alumni Mixer SF',
    dateStr: 'Thursday, October 24, 2026',
    month: 'Oct',
    day: '24',
    time: '6:00 PM - 8:30 PM PST',
    type: 'Virtual',
    location: 'Virtual Event Room A & Interactive Spatial Lounge',
    category: 'Mixer',
    description: 'Join fellow design and creative alumni from Apple, Google, Airbnb, and innovative startups for an evening of networking, lightning talks on spatial UI, and cross-cohort connections.',
    attendeesCount: 148,
    attendeeAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdnYNlS9cm6wQ8h4JiJ8KhOdzjCdntkXSCECFLbPnBog0l9dVB3K8XLwEgJPUkusfCXkgnjVHyqBSrb5lo5Q0exIvuF82U7ozh4ts_Se39yDM10KR4pMJevqji7xqGmbRQ6of8sIaFniI1cxajidlIoGG8LSj_ueqUKdZrqtdWvO0HGw5uY-abfRarmh4CPp2TMxMwG1GoMqV4r9tWYK0Das3XeS-EHP5sEcUmdSnBbmUV9OzBxtiF'
    ],
    isAttending: true,
    hostName: 'Sarah Jenkins',
    hostRole: 'Design Lead at Apple'
  },
  {
    id: 'ev-2',
    title: 'Global Alumni AI Summit 2026',
    dateStr: 'Wednesday, November 12, 2026',
    month: 'Nov',
    day: '12',
    time: '9:00 AM - 5:00 PM PST',
    type: 'In-Person',
    location: 'Palace of Fine Arts, San Francisco, CA',
    category: 'Conference',
    description: 'The premier annual gathering of alumni founders, researchers, and technology leaders discussing frontiers in artificial intelligence, multimodal reasoning, and ethical governance.',
    attendeesCount: 520,
    attendeeAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWxNlJkvsB89TB2Rb7OK1-MBPTy29UZ-huvORztdIfgYAdrPwYNaVfBRY0bEgcQ0M0ZQpf6YWoIv7950anWA2Lw4VsRl0twd4RR1pk_F78Qns3A6CoMYGA3QHjZuEum5FybKfoRAGxMqrbuilGyLyot0yMJsOnLPqxobKaMA-npoDIcrWh91B4VgzYO0Gjv3yhFelJA8x5dDfZt1lE6dkQLtgjO0sJtA50WdpQoqn0pSpjLujmLjxr',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv'
    ],
    isAttending: false,
    hostName: 'Emily Zhao',
    hostRole: 'VP of Product at OpenAI'
  },
  {
    id: 'ev-3',
    title: 'Fintech & Web3 Founders Roundtable',
    dateStr: 'Thursday, December 5, 2026',
    month: 'Dec',
    day: '05',
    time: '5:30 PM - 7:30 PM EST',
    type: 'Hybrid',
    location: 'Convene Center, New York, NY & Livestream',
    category: 'Panel',
    description: 'An intimate panel discussion covering cross-border settlement rails, sovereign AI payments, and early-stage capital raising in 2026.',
    attendeesCount: 215,
    attendeeAvatars: [],
    isAttending: false,
    hostName: 'David Vance',
    hostRole: 'Principal Engineer at Stripe'
  }
];

export const JOBS_DATA: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Senior Product Designer - NextGen OS',
    company: 'Apple',
    location: 'Cupertino, CA (Hybrid)',
    type: 'Full-time',
    salary: '$190,000 - $260,000 + Equity',
    logoInitial: 'A',
    logoColor: 'from-gray-700 to-black',
    tags: ['Design Systems', 'Spatial UI', 'Figma', 'Prototyping'],
    alumniAtCompany: 115,
    postedDate: '2 days ago',
    description: 'Seeking a seasoned product designer to craft breakthrough system-level interactions and fluid interfaces for next-generation computing hardware.',
    requirements: [
      '6+ years of product design experience on shipping software',
      'Exemplary portfolio highlighting systems thinking and motion craftsmanship',
      'Experience collaborating with hardware and software engineering teams'
    ],
    referralAvailable: true
  },
  {
    id: 'job-2',
    title: 'Staff Frontend Infrastructure Engineer',
    company: 'Google',
    location: 'Mountain View, CA / San Francisco, CA',
    type: 'Full-time',
    salary: '$220,000 - $310,000 + Bonus',
    logoInitial: 'G',
    logoColor: 'from-blue-600 to-cyan-500',
    tags: ['TypeScript', 'React 19', 'WebAssembly', 'Performance'],
    alumniAtCompany: 142,
    postedDate: '1 day ago',
    description: 'Join the Core Developer Experience team to pioneer zero-latency UI runtime architectures and next-generation collaboration components.',
    requirements: [
      'Strong expertise with modern web browsers, DOM performance, and WebGL',
      'Track record of building shared libraries consumed by thousands of engineers',
      'Solid foundations in distributed build pipelines'
    ],
    referralAvailable: true
  },
  {
    id: 'job-3',
    title: 'Principal AI Product Architect',
    company: 'OpenAI',
    location: 'San Francisco, CA (On-site)',
    type: 'Full-time',
    salary: '$260,000 - $380,000 + Grants',
    logoInitial: 'O',
    logoColor: 'from-purple-600 to-indigo-600',
    tags: ['Foundational Models', 'Agent Systems', 'Python', 'Product Strategy'],
    alumniAtCompany: 32,
    postedDate: '3 days ago',
    description: 'Define how autonomous agent frameworks interface with enterprise software suites, ensuring safe, high-utility, and natural interactions.',
    requirements: [
      'Proven leadership in deploying commercial ML/GenAI systems',
      'Deep fluency in agentic orchestration patterns and evaluations',
      'Demonstrated high execution velocity'
    ],
    referralAvailable: true
  },
  {
    id: 'job-4',
    title: 'Senior Distributed Systems Engineer',
    company: 'Stripe',
    location: 'Remote (US/Canada)',
    type: 'Remote',
    salary: '$195,000 - $275,000 + Equity',
    logoInitial: 'S',
    logoColor: 'from-indigo-500 to-blue-600',
    tags: ['Rust', 'Go', 'Distributed Databases', 'Fintech'],
    alumniAtCompany: 45,
    postedDate: 'Just now',
    description: 'Build mission-critical transaction settlement pipelines operating with multi-region high availability and sub-millisecond guarantees.',
    requirements: [
      'Deep understanding of consensus algorithms (Raft, Paxos)',
      'Experience maintaining financial ledger integrity',
      'Strong communicative writing skills for asynchronous engineering'
    ],
    referralAvailable: true
  },
  {
    id: 'job-5',
    title: 'UX Research Lead - Mixed Reality',
    company: 'Meta',
    location: 'Menlo Park, CA (Hybrid)',
    type: 'Full-time',
    salary: '$180,000 - $250,000 + Equity',
    logoInitial: 'M',
    logoColor: 'from-blue-700 to-indigo-800',
    tags: ['Cognitive UX', 'Spatial Audio', 'Mixed Methods', 'Bio-sensing'],
    alumniAtCompany: 78,
    postedDate: '4 days ago',
    description: 'Conduct foundational user research exploring how spatial computing enhances human connection, remote presence, and collaborative creativity.',
    requirements: [
      'PhD or Master’s in HCI, Cognitive Psychology, or equivalent experience',
      '5+ years leading qualitative & quantitative user studies',
      'Experience with emerging hardware platforms'
    ],
    referralAvailable: true
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-sarah',
    participantId: 'sarah-jenkins',
    participantName: 'Sarah Jenkins',
    participantRole: 'Design Lead at Apple',
    participantAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll',
    lastMessage: 'Hi! Happy to chat about the design openings on our team.',
    lastMessageTime: '10:32 AM',
    unread: true,
    messages: [
      {
        id: 'm1',
        senderId: 'sarah-jenkins',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll',
        text: 'Hey Alex! Great connecting on AlumniConnect. Are you attending the Design Alumni Mixer this Thursday?',
        timestamp: '10:28 AM',
        isMe: false
      },
      {
        id: 'm2',
        senderId: 'me',
        senderName: 'Alex Alumni',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiP_Hnh46npbzCE-4tzKXzxeb_Dbm4-2jvvhErqpWlgqSTvpIE7XUKQEa0i9HRZgCvAMvC6APTH4KY4ZApZhNbzwVdZuUXdHdlb41svjRqJI2HtB6fCXa2dQcP1nZknB1DyhKvgQaN6eIHmQeNMtALJoMPC1_1nRiXp3S5P5-ehE8RNjh_EdRf6HTtWhsZ3fBZ6fNuycBgJZ8TG4qDzVaaO9yQ5p1Y5nS-_vOXiPWEeAV0-lb3ptRJ',
        text: 'Hi Sarah! Yes, I just RSVP’d. Would love to hear about the new spatial interaction projects your team is tackling.',
        timestamp: '10:30 AM',
        isMe: true
      },
      {
        id: 'm3',
        senderId: 'sarah-jenkins',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv53lM1xLYUoQK16NWrEb4DCrlUsnO_v6acV-pkKIztDRG0HXiecYBkdM9NW9xLyZdEgCzgFshZkYJy4DyoZgJlYfgd4Pbg_E8UaefcmQBdS7q83NwJ-Zu1YHvimFUlHowdtxieJUQFcVT19ADx29Jf4ZRa4zrSPPp4HN3weju9B2mSOKmzga0opnIaTing08goReUbUM2c554nQsA6bu-e62AVqVZ8GCVi5JzzQw41rX5PwkQDll',
        text: 'Hi! Happy to chat about the design openings on our team. Let’s do a quick coffee chat during the breakout room session!',
        timestamp: '10:32 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-alex-chen',
    participantId: 'alex-chen',
    participantName: 'Alex Chen',
    participantRole: 'Staff Product Designer at Google',
    participantAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv',
    lastMessage: 'Looking forward to reviewing your mentee case study!',
    lastMessageTime: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 'm-ac-1',
        senderId: 'alex-chen',
        senderName: 'Alex Chen',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCtIHuI4gAi2FfpCZ83HDoGEwsB6PKNzXIHGGP6-rXV082juqdtc1sG-J9zJLtYBBLJbL1bl8VHJVRPXUT855Lak6paCg4nVDS_pJw4-uhoTQd48G9Vl3_KuxMWpc6hf_MIqtHWIFD8R62nMnm7raPeIjrnF6THtlna71DGaOqV9KJzvjY3PD7rRWgCk8JWo-YRX9hbCCM-nDNnFZ-MzjI7p-KyKOwOc70tEi-RH_uVJiWD2-PrDv',
        text: 'Looking forward to reviewing your mentee case study! Send over the Figma prototype whenever ready.',
        timestamp: 'Yesterday',
        isMe: false
      }
    ]
  }
];

export const CONVERSATIONS_DATA: Conversation[] = INITIAL_CONVERSATIONS;

export const GLOBAL_CHAPTERS: ChapterInfo[] = [
  {
    id: 'ch-sf',
    name: 'San Francisco Bay Area Chapter',
    city: 'San Francisco',
    country: 'United States',
    region: 'North America',
    membersCount: 4850,
    leads: 'Sarah Jenkins (Apple) & Alex Chen (Google)',
    description: 'The global heart of technology, spatial computing, AI research, and early-stage venture building.',
    coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'Design Alumni Mixer SF',
    lat: 37.7749,
    lng: -122.4194
  },
  {
    id: 'ch-nyc',
    name: 'New York Metro Chapter',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    membersCount: 2940,
    leads: 'David Vance (Apex Capital) & Maya Patel (Stripe)',
    description: 'Fast-paced hub for venture capital, media, fintech architecture, and modern direct-to-consumer innovations.',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'Fintech & Web3 Founders',
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 'ch-london',
    name: 'London & Europe West Chapter',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    membersCount: 1620,
    leads: 'Claire Dupont & James Wilson',
    description: 'European nexus spanning deep tech, international diplomacy, fintech infrastructure, and design academies.',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'European Alumni Gala',
    lat: 51.5074,
    lng: -0.1278
  },
  {
    id: 'ch-tokyo',
    name: 'Tokyo & Asia Pacific Chapter',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    membersCount: 1180,
    leads: 'Kenji Takahashi & Yuka Sato',
    description: 'Bridging robotics, hardware manufacturing, video game architecture, and venture incubation across East Asia.',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'Tokyo Tech & Venture Night',
    lat: 35.6762,
    lng: 139.6503
  },
  {
    id: 'ch-singapore',
    name: 'Singapore Regional Hub',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia',
    membersCount: 890,
    leads: 'Li Wei & Priya Nair',
    description: 'Southeast Asia headquarters for sovereign tech funds, AI ethics committees, and cross-border startups.',
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'SEA Tech & Venture Forum',
    lat: 1.3521,
    lng: 103.8198
  },
  {
    id: 'ch-berlin',
    name: 'Berlin Creative & Tech Hub',
    city: 'Berlin',
    country: 'Germany',
    region: 'Europe',
    membersCount: 740,
    leads: 'Maximilian Bauer & Anna Schmidt',
    description: 'Creative crucible for electronic music technology, climate-tech labs, and decentralized autonomous organizations.',
    coverImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&auto=format&fit=crop&q=80',
    nextEvent: 'Berlin Climate & AI Salon',
    lat: 52.5200,
    lng: 13.4050
  }
];

export const CHAPTERS_DATA = GLOBAL_CHAPTERS;
