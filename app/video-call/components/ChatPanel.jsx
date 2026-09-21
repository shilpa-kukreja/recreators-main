"use client";
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Send, X, MessageSquare } from 'lucide-react';

export default function ChatPanel({ open, messages, selfId, onSend, onClose }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <aside className="!flex !h-full !w-full !flex-col !border-l !border-white/10 !bg-slate-900/70 !backdrop-blur-md md:!w-80">
      <header className="!flex !items-center !justify-between !border-b !border-white/10 !px-4 !py-3">
        <h3 className="!flex !items-center !gap-2 !text-sm !font-semibold !text-white">
          <MessageSquare size={16} /> Meeting chat
        </h3>
        <button onClick={onClose} className="!rounded-lg !p-1.5 !text-slate-400 hover:!bg-white/10 hover:!text-white" aria-label="Close chat">
          <X size={16} />
        </button>
      </header>

      <div className="!flex-1 !space-y-4 !overflow-y-auto !px-4 !py-4">
        {messages.length === 0 && (
          <div className="!mt-10 !text-center !text-sm !text-slate-500">
            <MessageSquare size={28} className="!mx-auto !mb-2 !opacity-40" />
            No messages yet. Say hello 👋
          </div>
        )}
        {messages.map((m) => {
          const mine = m.senderId === selfId;
          return (
            <div key={m.id} className={`!flex !flex-col ${mine ? '!items-end' : '!items-start'}`}>
              <span className="!mb-1 !text-[11px] !text-slate-400">
                {mine ? 'You' : m.senderName} · {fmt(m.at)}
              </span>
              <div
                className={`!max-w-[85%] !rounded-2xl !px-3.5 !py-2 !text-sm !leading-relaxed
                  ${mine ? '!bg-emerald-600 !text-white' : '!bg-slate-700 !text-slate-100'}`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={submit} className="!flex !items-center !gap-2 !border-t !border-white/10 !p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          maxLength={2000}
          className="!flex-1 !rounded-xl !bg-slate-800 !px-3.5 !py-2.5 !text-sm !text-white placeholder:!text-slate-500 !outline-none !ring-1 !ring-white/10 focus:!ring-emerald-500"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="!rounded-xl !bg-emerald-600 !p-2.5 !text-white !transition hover:!bg-emerald-500 disabled:!cursor-not-allowed disabled:!opacity-40"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </aside>
  );
}

ChatPanel.propTypes = {
  open: PropTypes.bool,
  messages: PropTypes.array,
  selfId: PropTypes.string,
  onSend: PropTypes.func,
  onClose: PropTypes.func,
};