import React, { useState } from 'react';
import { Conversation, DirectMessage } from '../types';
import { X, Send, CheckCheck, Smile, UserPlus } from 'lucide-react';

interface MessagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagesDrawer: React.FC<MessagesDrawerProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const currentConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentConversation) return;
    onSendMessage(currentConversation.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg md:max-w-xl h-full glass-card border-l border-white/20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 bg-[#0c1324]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-lg">chat</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-display">Alumni Messages</h3>
              <p className="text-xs text-slate-400">Direct encrypted networking channel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Layout split: Contacts list (chips) + Active chat */}
        <div className="p-3 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar bg-black/20">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                conv.id === currentConversation?.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <img
                src={conv.participantAvatar}
                alt={conv.participantName}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{conv.participantName}</span>
              {conv.unread && (
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Active Conversation Body */}
        {currentConversation ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Active user banner */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentConversation.participantAvatar}
                    alt={currentConversation.participantName}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 border-2 border-[#0c1324] rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {currentConversation.participantName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {currentConversation.participantRole} • Active Now
                  </p>
                </div>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 no-scrollbar">
              {currentConversation.messages.map((msg: DirectMessage) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!msg.isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                    />
                  )}
                  <div className={`max-w-[78%] space-y-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.isMe
                          ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20'
                          : 'bg-white/10 text-slate-100 rounded-tl-none border border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-[10px] text-slate-400 px-1 ${
                        msg.isMe ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-white/10 bg-black/40">
              <div className="flex items-center gap-2 bg-white/5 border border-white/15 rounded-2xl p-1.5 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${currentConversation.participantName}...`}
                  className="flex-1 bg-transparent border-none text-white text-sm px-3 py-2 focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <UserPlus className="w-12 h-12 mb-3 text-slate-500" />
            <p className="font-semibold text-white">No conversation selected</p>
            <p className="text-xs text-slate-400 mt-1">Connect with an alum in the directory to start a chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};
