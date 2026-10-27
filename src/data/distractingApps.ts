export interface DistractingAppItem {
  name: string;
  category: 'Social Media' | 'Short Video' | 'Video Streaming' | 'Feeds & Forums' | 'Gaming & Chat';
  domain: string;
  iconLetter: string;
  color: string;
  description: string;
}

export const ALL_DISTRACTING_APPS: DistractingAppItem[] = [
  {
    name: 'Instagram',
    category: 'Social Media',
    domain: 'instagram.com',
    iconLetter: 'IG',
    color: 'from-pink-500 to-rose-500',
    description: 'Photo & reel scrolling feeds',
  },
  {
    name: 'YouTube',
    category: 'Video Streaming',
    domain: 'youtube.com',
    iconLetter: 'YT',
    color: 'from-red-600 to-red-700',
    description: 'Endless video autoplay & recommended sidebar',
  },
  {
    name: 'TikTok',
    category: 'Short Video',
    domain: 'tiktok.com',
    iconLetter: 'TT',
    color: 'from-slate-900 to-zinc-800',
    description: 'High-frequency algorithmic short video stream',
  },
  {
    name: 'Reddit',
    category: 'Feeds & Forums',
    domain: 'reddit.com',
    iconLetter: 'RD',
    color: 'from-orange-500 to-amber-600',
    description: 'Infinite subreddits and comment threads',
  },
  {
    name: 'Twitter / X',
    category: 'Social Media',
    domain: 'x.com',
    iconLetter: 'X',
    color: 'from-slate-800 to-slate-950',
    description: 'Real-time timeline and notifications',
  },
  {
    name: 'Discord',
    category: 'Gaming & Chat',
    domain: 'discord.com',
    iconLetter: 'DC',
    color: 'from-indigo-600 to-purple-600',
    description: 'Direct messages, servers, and ping notifications',
  },
  {
    name: 'Netflix',
    category: 'Video Streaming',
    domain: 'netflix.com',
    iconLetter: 'NF',
    color: 'from-rose-700 to-red-900',
    description: 'Binge-watching TV shows and movies',
  },
  {
    name: 'Gaming Apps',
    category: 'Gaming & Chat',
    domain: 'steamcommunity.com',
    iconLetter: 'GM',
    color: 'from-purple-600 to-indigo-800',
    description: 'Desktop, mobile games, and launcher popups',
  },
  {
    name: 'Facebook',
    category: 'Social Media',
    domain: 'facebook.com',
    iconLetter: 'FB',
    color: 'from-blue-600 to-blue-700',
    description: 'Social feed and group notifications',
  },
  {
    name: 'Twitch',
    category: 'Video Streaming',
    domain: 'twitch.tv',
    iconLetter: 'TW',
    color: 'from-purple-600 to-purple-800',
    description: 'Live streaming and interactive chat',
  },
];
