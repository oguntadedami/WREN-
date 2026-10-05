import React, { useState, useEffect, useRef } from 'react';
import { 
  Hash, 
  Smile, 
  Send, 
  Users, 
  Bell, 
  Pin, 
  Search, 
  Paperclip,
  Bold,
  Italic,
  Link2,
  Code,
  Sparkles,
  Lock
} from 'lucide-react';

export interface ChannelItem {
  id: string;
  name: string;
  topic: string;
  sender: string;
  senderHandle: string;
  role: string;
  roleColor: string;
  avatarBg: string;
  avatarInitials: string;
  timestamp: string;
  messageText: string;
  reactions: Array<{ emoji: string; count: number; userReacted?: boolean }>;
  unread?: boolean;
}

export const CHANNELS_DATA: ChannelItem[] = [
  {
    id: 'LinkedIn-friends',
    name: 'LinkedIn-friends',
    topic: 'Real engagement, thought partners & comment support',
    sender: 'Judith',
    senderHandle: 'judith',
    role: 'Host',
    roleColor: 'bg-[#CBDA46] text-[#093624]',
    avatarBg: 'bg-[#093624] text-[#CBDA46]',
    avatarInitials: 'JW',
    timestamp: 'Today at 10:14 AM',
    messageText: 'explicitly for finding real people who can engage with your content with thoughtful comments.',
    reactions: [
      { emoji: '💬', count: 18 },
      { emoji: '🤝', count: 12 },
      { emoji: '🔥', count: 9 }
    ]
  },
  {
    id: 'Everything-GTM',
    name: 'Everything-GTM',
    topic: 'Claude workflows, winning market playbooks & experiments',
    sender: 'Alex',
    senderHandle: 'alex.gtm',
    role: 'Builder',
    roleColor: 'bg-[#E3ED8F] text-[#093624]',
    avatarBg: 'bg-[#184E38] text-[#F7F4E9]',
    avatarInitials: 'AM',
    timestamp: 'Today at 11:30 AM',
    messageText: "Built something cool with Claude? Found a blueprint that's helping you win the market? Have a GTM experiment that's working? Share away. We want to see it.",
    reactions: [
      { emoji: '🚀', count: 24 },
      { emoji: '🤖', count: 15 },
      { emoji: '💡', count: 11 }
    ],
    unread: true
  },
  {
    id: 'Speed-networking',
    name: 'Speed-networking',
    topic: 'Serendipitous intros & founder matchmaking',
    sender: 'Judith',
    senderHandle: 'judith',
    role: 'Host',
    roleColor: 'bg-[#CBDA46] text-[#093624]',
    avatarBg: 'bg-[#093624] text-[#CBDA46]',
    avatarInitials: 'JW',
    timestamp: 'Today at 1:05 PM',
    messageText: "We believe in fate. And sometimes fate happens in a Slack channel. Looking for an introduction to someone? Tell us who you're looking for and let the community work its magic.",
    reactions: [
      { emoji: '⚡', count: 21 },
      { emoji: '✨', count: 16 },
      { emoji: '🙌', count: 14 }
    ]
  },
  {
    id: 'referrals',
    name: 'referrals',
    topic: 'Opportunities, talent recommendations & mutual intros',
    sender: 'Marcus',
    senderHandle: 'marcus_k',
    role: 'Member',
    roleColor: 'bg-[#EAE5D4] text-[#093624]',
    avatarBg: 'bg-[#2D6A4F] text-[#F7F4E9]',
    avatarInitials: 'MK',
    timestamp: 'Today at 2:45 PM',
    messageText: "Good people should know good people. This is where we share opportunities, recommend great talent, and make introductions when there's a good fit. It goes both ways.",
    reactions: [
      { emoji: '🎯', count: 19 },
      { emoji: '💼', count: 13 },
      { emoji: '❤️', count: 15 }
    ]
  },
  {
    id: 'events',
    name: 'events',
    topic: 'Masterclasses with OGs of GTM, Sales, & Social Selling',
    sender: 'Judith',
    senderHandle: 'judith',
    role: 'Host',
    roleColor: 'bg-[#CBDA46] text-[#093624]',
    avatarBg: 'bg-[#093624] text-[#CBDA46]',
    avatarInitials: 'JW',
    timestamp: 'Today at 4:18 PM',
    messageText: "Every now and then, we bring in the OGs of GTM, Sales, Marketing, Social Selling, and everything in between to share what they know. Want to know when the next one is happening? You'll find it here.",
    reactions: [
      { emoji: '🎟️', count: 32 },
      { emoji: '🔥', count: 28 },
      { emoji: '🗓️', count: 17 }
    ],
    unread: true
  }
];

export const SECRET_CHANNEL: ChannelItem = {
  id: 'secret-channels',
  name: 'nope-theres-more',
  topic: 'Classified channels • You’ll find your people when you come along',
  sender: 'Judith',
  senderHandle: 'judith',
  role: 'Founder',
  roleColor: 'bg-[#CBDA46] text-[#093624]',
  avatarBg: 'bg-[#093624] text-[#CBDA46]',
  avatarInitials: '🤫',
  timestamp: 'Just now',
  messageText: "Nope, there’s more… You’ll find your people (and your channel) when you come along.",
  reactions: [
    { emoji: '🤫', count: 42 },
    { emoji: '🔒', count: 31 },
    { emoji: '👀', count: 27 },
    { emoji: '✨', count: 18 }
  ]
};

const ALL_CHANNELS = [...CHANNELS_DATA, SECRET_CHANNEL];

export const WrenCommunitySlack: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState<string>('LinkedIn-friends');
  const [typedChannels, setTypedChannels] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showReaction, setShowReaction] = useState<boolean>(false);
  const [channelReactions, setChannelReactions] = useState<{ [channelId: string]: Array<{ emoji: string; count: number; userReacted?: boolean }> }>(() => {
    const initial: { [key: string]: Array<{ emoji: string; count: number; userReacted?: boolean }> } = {};
    ALL_CHANNELS.forEach(c => {
      initial[c.id] = [...c.reactions];
    });
    return initial;
  });

  const activeChannel = ALL_CHANNELS.find(c => c.id === activeChannelId) || CHANNELS_DATA[0];
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectChannel = (channelId: string) => {
    if (channelId === activeChannelId) return;

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);

    setActiveChannelId(channelId);

    const hasTyped = typedChannels.has(channelId);
    if (!hasTyped) {
      setIsTyping(true);
      setShowReaction(false);

      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypedChannels(prev => new Set(prev).add(channelId));

        reactionTimerRef.current = setTimeout(() => {
          setShowReaction(true);
        }, 220);
      }, 500);
    } else {
      setIsTyping(false);
      setShowReaction(false);

      reactionTimerRef.current = setTimeout(() => {
        setShowReaction(true);
      }, 180);
    }
  };

  useEffect(() => {
    setIsTyping(true);
    setShowReaction(false);

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
      setTypedChannels(new Set(['LinkedIn-friends']));

      reactionTimerRef.current = setTimeout(() => {
        setShowReaction(true);
      }, 240);
    }, 450);

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, []);

  const handleToggleReaction = (emoji: string) => {
    setChannelReactions(prev => {
      const current = prev[activeChannelId] || [];
      const updated = current.map(r => {
        if (r.emoji === emoji) {
          const reacted = !!r.userReacted;
          return {
            ...r,
            count: reacted ? r.count - 1 : r.count + 1,
            userReacted: !reacted
          };
        }
        return r;
      });
      return {
        ...prev,
        [activeChannelId]: updated
      };
    });
  };

  const currentReactions = channelReactions[activeChannelId] || activeChannel.reactions;

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border-2 sm:border-[2.5px] border-[#093624] shadow-[6px_6px_0px_#093624] overflow-hidden flex flex-col transition-all">
      <div className="bg-[#093624] text-[#F7F4E9] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between border-b border-[#093624]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border border-black/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166] border border-black/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#CBDA46] border border-black/20 inline-block" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm sm:text-base text-[#F7F4E9] tracking-tight">
              Wren Workspace
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] bg-[#184E38] text-[#CBDA46] px-2 py-0.5 rounded-full">
              active now
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#F7F4E9]/70">
          <span className="hidden md:inline-flex items-center gap-1 bg-[#051F14] px-2.5 py-1 rounded-md border border-[#CBDA46]/20">
            <Search className="w-3 h-3 text-[#CBDA46]" />
            Search community...
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#CBDA46]" />
            <span className="hidden sm:inline">Members</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[460px] sm:min-h-[500px]">
        <div className="w-full md:w-72 lg:w-80 bg-[#0C291C] border-b md:border-b-0 md:border-r border-[#093624]/20 flex flex-col shrink-0 p-3.5 sm:p-4.5">
          <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#CBDA46] font-semibold flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              Channels
            </span>
            <span className="text-[10px] font-mono text-white/50">
              hover or tap
            </span>
          </div>

          <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
            {CHANNELS_DATA.map(channel => {
              const isActive = channel.id === activeChannelId;
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => selectChannel(channel.id)}
                  onMouseEnter={() => selectChannel(channel.id)}
                  aria-selected={isActive}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs sm:text-sm text-left transition-all shrink-0 md:shrink cursor-pointer ${
                    isActive
                      ? 'bg-[#CBDA46] text-[#093624] font-bold shadow-[2px_2px_0px_#093624]'
                      : 'text-[#F7F4E9]/80 hover:bg-[#134934] hover:text-[#F7F4E9]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`text-sm ${isActive ? 'text-[#093624]' : 'text-[#CBDA46]'}`}>#</span>
                    <span className="truncate">{channel.name}</span>
                  </div>
                  {channel.unread && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#CBDA46] shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}

            <div className="relative pt-2 shrink-0 md:shrink">
              <div className="hidden md:flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#CBDA46]/70">
                <span className="flex items-center gap-1 font-semibold">
                  <Lock className="w-2.5 h-2.5" />
                  Members Only
                </span>
                <span className="text-[9px] text-[#F7F4E9]/40 font-mono">secret</span>
              </div>

              <div className="relative flex md:flex-col gap-1.5 overflow-hidden rounded-xl p-0.5">
                {[
                  { id: 'secret-1', blur: 'blur-[3px]', opacity: 'opacity-70', name: 'angel-syndicate-alpha' },
                  { id: 'secret-2', blur: 'blur-[4.5px]', opacity: 'opacity-50', name: 'backchannel-gtm-leaks' },
                  { id: 'secret-3', blur: 'blur-[6px]', opacity: 'opacity-30', name: 'founder-war-stories' },
                  { id: 'secret-4', blur: 'blur-[7.5px]', opacity: 'opacity-15', name: 'stealth-launches-club' },
                ].map((secret) => (
                  <button
                    key={secret.id}
                    type="button"
                    onClick={() => selectChannel(SECRET_CHANNEL.id)}
                    onMouseEnter={() => selectChannel(SECRET_CHANNEL.id)}
                    aria-label="Secret channel — Nope, there's more"
                    className={`group relative flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm text-left transition-all shrink-0 md:shrink cursor-pointer select-none border border-transparent ${
                      activeChannelId === SECRET_CHANNEL.id
                        ? 'bg-[#134934] text-[#CBDA46] border-[#CBDA46]/40 shadow-xs'
                        : 'text-[#F7F4E9]/70 hover:bg-[#134934]/60'
                    } ${secret.opacity}`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm text-[#CBDA46]/70">#</span>
                      <span className={`font-mono text-xs tracking-wider filter ${secret.blur} select-none pointer-events-none text-[#F7F4E9]`}>
                        {secret.name}
                      </span>
                    </div>
                    <Lock className={`w-3 h-3 text-[#CBDA46]/60 shrink-0 ml-2 filter ${secret.blur}`} />
                  </button>
                ))}

                <div 
                  className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#0C291C]/50 to-[#0C291C] pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto hidden md:flex items-center justify-between pt-3.5 border-t border-white/10 text-[11px] font-mono px-2 leading-tight">
            <button
              type="button"
              onClick={() => selectChannel(SECRET_CHANNEL.id)}
              className="flex items-center gap-1.5 font-semibold text-[#CBDA46] hover:text-[#E3ED8F] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#CBDA46]" />
              <span>Nope, there’s more…</span>
            </button>
            <span className="text-[10px] text-white/50">
              peek inside
            </span>
          </div>
        </div>

        <div className="flex-1 bg-[#FAF8F3] flex flex-col justify-between p-4 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between pb-3.5 mb-4 sm:mb-6 border-b border-[#093624]/10">
            <div className="flex items-center gap-2 sm:gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-[#093624] text-[#CBDA46] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                #
              </div>
              <div className="truncate">
                <h4 className="font-display font-bold text-base sm:text-lg text-[#093624] tracking-tight leading-tight flex items-center gap-2">
                  <span>{activeChannel.name}</span>
                  {activeChannel.id === SECRET_CHANNEL.id && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-[#093624] text-[#CBDA46] px-2 py-0.5 rounded-full font-medium">
                      <Lock className="w-2.5 h-2.5" />
                      Classified
                    </span>
                  )}
                </h4>
                <p className="text-xs font-sans text-[#2C4136]/70 truncate hidden sm:block">
                  {activeChannel.topic}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#093624]/60">
              <button 
                type="button" 
                aria-label="Channel alerts"
                className="p-1.5 rounded-md hover:bg-[#093624]/5 text-[#093624]/60 hover:text-[#093624] transition-colors cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                aria-label="Pinned items"
                className="p-1.5 rounded-md hover:bg-[#093624]/5 text-[#093624]/60 hover:text-[#093624] transition-colors cursor-pointer"
              >
                <Pin className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center py-2">
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${activeChannel.avatarBg} flex items-center justify-center font-display font-extrabold text-sm sm:text-base border border-[#093624]/20 shadow-xs shrink-0 select-none`}>
                {activeChannel.avatarInitials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-display font-bold text-sm sm:text-base text-[#093624]">
                    {activeChannel.sender}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${activeChannel.roleColor}`}>
                    {activeChannel.role}
                  </span>
                  <span className="text-[11px] font-mono text-[#093624]/50">
                    {activeChannel.timestamp}
                  </span>
                </div>

                {isTyping ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white border border-[#093624]/15 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#093624]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#093624]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#093624]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs font-mono text-[#093624]/70 ml-2">
                      {activeChannel.sender} is typing...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-[#FFFFFF] border border-[#093624]/15 rounded-2xl rounded-tl-sm p-4 sm:p-5 md:p-6 shadow-xs max-w-4xl transition-all">
                      <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#0E1A15] leading-relaxed font-normal">
                        {activeChannel.messageText}
                      </p>
                    </div>

                    <div 
                      className={`flex flex-wrap items-center gap-2 pt-1 transition-all duration-300 transform ${
                        showReaction 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                      }`}
                    >
                      {currentReactions.map((reaction, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleToggleReaction(reaction.emoji)}
                          aria-label={`React with ${reaction.emoji}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                            reaction.userReacted
                              ? 'bg-[#CBDA46]/35 border-[#093624] text-[#093624] font-bold shadow-2xs'
                              : 'bg-white border-[#093624]/15 text-[#093624]/80 hover:bg-[#F7F4E9]'
                          }`}
                        >
                          <span className="text-sm">{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleToggleReaction('🙌')}
                        aria-label="Add reaction"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-[#093624]/50 border border-dashed border-[#093624]/25 bg-transparent hover:bg-white hover:text-[#093624] transition-all cursor-pointer"
                      >
                        <Smile className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono">+</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#093624]/10">
            <div className="bg-white rounded-xl border border-[#093624]/20 p-2.5 shadow-2xs">
              <div className="text-xs text-[#093624]/40 font-mono py-1 px-1.5 select-none truncate">
                Message #{activeChannel.name}...
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-gray-400">
                <div className="flex items-center gap-2 text-xs">
                  <Bold className="w-3.5 h-3.5 text-[#093624]/40 hover:text-[#093624] cursor-pointer" />
                  <Italic className="w-3.5 h-3.5 text-[#093624]/40 hover:text-[#093624] cursor-pointer" />
                  <Link2 className="w-3.5 h-3.5 text-[#093624]/40 hover:text-[#093624] cursor-pointer" />
                  <Code className="w-3.5 h-3.5 text-[#093624]/40 hover:text-[#093624] cursor-pointer" />
                  <Paperclip className="w-3.5 h-3.5 text-[#093624]/40 hover:text-[#093624] cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <Smile className="w-4 h-4 text-[#093624]/50 hover:text-[#093624] cursor-pointer" />
                  <div className="w-6 h-6 rounded-md bg-[#093624] text-[#CBDA46] flex items-center justify-center cursor-pointer shadow-2xs hover:scale-105 active:scale-95 transition-transform">
                    <Send className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
