'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! 👋 I'm ReCreators' AI assistant. Ask me anything about our services, pricing, or projects.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Network error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'What services do you offer?',
    'Show me your pricing',
    'How can I contact you?',
  ];

  const showSuggestions = messages.length === 1;

  return (
    <>
      <style jsx global>{`
        @keyframes cw-aurora {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes cw-glow-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(249, 145, 74, 0.55),
              0 14px 40px -12px rgba(249, 145, 74, 0.85),
              0 6px 18px -6px rgba(0, 0, 0, 0.55),
              inset 0 1px 0 rgba(255, 255, 255, 0.35);
          }
          50% {
            box-shadow: 0 0 0 16px rgba(249, 145, 74, 0),
              0 24px 65px -14px rgba(249, 145, 74, 1),
              0 10px 26px -8px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
          }
        }
        @keyframes cw-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes cw-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cw-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .cw-aurora {
          background-size: 200% 200%;
          animation: cw-aurora 9s ease-in-out infinite;
        }
        .cw-glow-pulse {
          animation: cw-glow-pulse 4.5s ease-in-out infinite;
        }
        .cw-orbit {
          animation: cw-orbit 9s linear infinite;
        }
        .cw-float {
          animation: cw-float 5s ease-in-out infinite;
        }
        .cw-fade-up {
          animation: cw-fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .cw-shimmer {
          background-size: 200% auto;
          animation: cw-shimmer 6s linear infinite;
        }
        .cw-scroll::-webkit-scrollbar { width: 6px; }
        .cw-scroll::-webkit-scrollbar-track { background: transparent; }
        .cw-scroll::-webkit-scrollbar-thumb {
          background: rgba(249, 145, 74, 0.2);
          border-radius: 99px;
        }
        .cw-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 145, 74, 0.35);
        }
      `}</style>

      <div className="!fixed !bottom-5 sm:!bottom-8 !right-4 sm:!right-7 !z-[80] !font-sans">
        {/* ==================== CHAT WINDOW ==================== */}
        <div
          className={`!mb-4 !w-[92vw] !max-w-[400px] !h-[580px] !origin-bottom-right !transition-all !duration-700 !flex !flex-col !overflow-hidden !rounded-[28px] !relative ${
            open
              ? '!scale-100 !opacity-100 !translate-y-0 !pointer-events-auto'
              : '!scale-90 !opacity-0 !translate-y-6 !pointer-events-none'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            background:
              'linear-gradient(180deg, #0e0a07 0%, #0a0705 60%, #070504 100%)',
            boxShadow:
              '0 40px 100px -25px rgba(0,0,0,0.95), 0 0 0 1px rgba(249,145,74,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Aurora background — orange glow */}
          <div
            className="!pointer-events-none !absolute !inset-0 !opacity-40 cw-aurora"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,145,74,0.4), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(251,191,36,0.2), transparent 70%)',
            }}
          />

          {/* Top sheen */}
          <span className="!pointer-events-none !absolute !inset-x-6 !top-0 !h-px !bg-gradient-to-r !from-transparent !via-[#f9914a]/40 !to-transparent !z-10" />

          {/* ==================== HEADER ==================== */}
          <div className="!relative !px-5 !py-4 !flex !items-center !gap-3 !border-b !border-[#f9914a]/[0.1] !bg-white/[0.015] !backdrop-blur-xl !z-10">
            {/* Avatar with orbit ring */}
            <div className="!relative !shrink-0">
              <div className="!absolute !-inset-1 !rounded-full cw-orbit">
                <div
                  className="!absolute !inset-0 !rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, rgba(249,145,74,0.85) 90deg, transparent 180deg, rgba(251,191,36,0.5) 270deg, transparent 360deg)',
                    maskImage:
                      'radial-gradient(circle, transparent 60%, black 62%, black 100%)',
                    WebkitMaskImage:
                      'radial-gradient(circle, transparent 60%, black 62%, black 100%)',
                  }}
                />
              </div>

              {/* avatar */}
              <div
                className="!relative !h-11 !w-11 !rounded-full !flex !items-center !justify-center !shadow-[0_8px_24px_-8px_rgba(249,145,74,0.8)]"
                style={{
                  background:
                    'linear-gradient(145deg, #fbbf24 0%, #f9914a 45%, #ea580c 100%)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="!h-5 !w-5 !text-white"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>

              {/* online dot */}
              {/* <span className="!absolute !-bottom-0.5 !-right-0.5 !h-3.5 !w-3.5 !rounded-full !bg-emerald-400 !ring-2 !ring-[#0e0a07] !shadow-[0_0_12px_rgba(52,211,153,0.8)]" /> */}
            </div>

            {/* Name + status */}
            <div className="!flex-1 !min-w-0">
              <div className="!flex !items-center !gap-2">
                <h3 className="!text-[15px] !font-semibold !text-white !tracking-[-0.01em] !truncate">
                  ReCreators AI
                </h3>
                <span
                  className="!rounded-full !border !px-2 !py-[3px] !text-[9px] !font-bold !uppercase !tracking-[0.1em]"
                  style={{
                    borderColor: 'rgba(249,145,74,0.4)',
                    background:
                      'linear-gradient(135deg, rgba(249,145,74,0.2), rgba(251,191,36,0.15))',
                    color: '#fbbf24',
                  }}
                >
                  AI
                </span>
              </div>
              <div className="!mt-1 !flex !items-center !gap-1.5">
                <span className="!relative !flex !h-1.5 !w-1.5">
                  <span className="!absolute !inline-flex !h-full !w-full !rounded-full !bg-emerald-400 !opacity-75 !animate-ping [animation-duration:2s]" />
                  <span className="!relative !inline-flex !h-1.5 !w-1.5 !rounded-full !bg-emerald-400" />
                </span>
                <span className="!text-[11px] !text-white/45 !font-medium !tracking-wide">
                  Online · Replies instantly
                </span>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="!group !relative !flex !h-8 !w-8 !items-center !justify-center !rounded-full !border !border-white/[0.08] !bg-white/[0.03] !text-white/50 hover:!text-[#f9914a] hover:!bg-[#f9914a]/10 hover:!border-[#f9914a]/30 !transition-all !duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="!h-3.5 !w-3.5 !transition-transform !duration-500 group-hover:!rotate-90"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ==================== MESSAGES ==================== */}
          <div
            ref={scrollRef}
            className="!flex-1 !overflow-y-auto !px-4 !py-4 !space-y-3 !relative !z-10 cw-scroll"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`!flex cw-fade-up ${
                  m.role === 'user' ? '!justify-end' : '!justify-start'
                }`}
              >
                <div
                  className={`!max-w-[82%] !px-3.5 !py-2.5 !text-[13.5px] !leading-relaxed !whitespace-pre-wrap !break-words ${
                    m.role === 'user'
                      ? '!text-white !rounded-[18px] !rounded-br-[6px] !shadow-[0_10px_30px_-12px_rgba(249,145,74,0.7)]'
                      : '!text-white/90 !rounded-[18px] !rounded-bl-[6px] !border !border-white/[0.08] !bg-white/[0.04] !backdrop-blur-sm !shadow-[0_4px_16px_-8px_rgba(0,0,0,0.6)]'
                  }`}
                  style={
                    m.role === 'user'
                      ? {
                          background:
                            'linear-gradient(145deg, #fbbf24 0%, #f9914a 50%, #ea580c 100%)',
                        }
                      : undefined
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="!flex !justify-start cw-fade-up">
                <div className="!bg-white/[0.04] !border !border-[#f9914a]/[0.12] !rounded-[18px] !rounded-bl-[6px] !px-4 !py-3 !flex !items-center !gap-1.5 !backdrop-blur-sm">
                  <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#f9914a] !animate-bounce [animation-delay:-0.4s]" />
                  <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#f9914a] !animate-bounce [animation-delay:-0.2s]" />
                  <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#f9914a] !animate-bounce" />
                </div>
              </div>
            )}

            {/* Suggestion chips */}
            {showSuggestions && !loading && (
              <div className="!pt-2 !flex !flex-wrap !gap-2 cw-fade-up">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(s);
                      inputRef.current?.focus();
                    }}
                    className="!text-[12px] !font-medium !text-white/60 hover:!text-white !rounded-full !border !border-white/[0.1] !bg-white/[0.02] hover:!bg-[#f9914a]/[0.15] hover:!border-[#f9914a]/40 !px-3 !py-1.5 !transition-all !duration-500 !backdrop-blur-sm"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================== INPUT ==================== */}
          <div className="!px-3 !py-3 !border-t !border-[#f9914a]/[0.08] !bg-white/[0.01] !backdrop-blur-xl !relative !z-10">
            <div
              className="!flex !items-end !gap-2 !rounded-2xl !border !border-white/[0.08] !bg-white/[0.03] focus-within:!border-[#f9914a]/50 focus-within:!bg-[#f9914a]/[0.04] focus-within:!shadow-[0_0_0_4px_rgba(249,145,74,0.1)] !transition-all !duration-500"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Ask anything..."
                className="!flex-1 !resize-none !bg-transparent !text-[13.5px] !text-white placeholder:!text-white/30 !px-4 !py-3 !outline-none !max-h-[120px]"
                style={{ scrollbarWidth: 'none' }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="!mb-1.5 !mr-1.5 !flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !text-white !transition-all !duration-500 hover:!scale-105 active:!scale-95 disabled:!opacity-30 disabled:!cursor-not-allowed disabled:hover:!scale-100 !shadow-[0_8px_20px_-8px_rgba(249,145,74,0.85)]"
                style={{
                  background:
                    'linear-gradient(145deg, #fbbf24 0%, #f9914a 45%, #ea580c 100%)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {loading ? (
                  <svg
                    className="!h-4 !w-4 !animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="!opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="!opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="!h-4 !w-4"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="!mt-2 !px-2 !flex !items-center !justify-between !text-[10px] !text-white/25 !font-medium !tracking-wide">
              <span>
                Powered by{' '}
                <span className="!text-[#f9914a]/70 !font-semibold">
                  ReCreators AI
                </span>
              </span>
              <span className="!hidden sm:!block">
                Enter to send · Shift+Enter for new line
              </span>
            </div>
          </div>
        </div>

        {/* ==================== FLOATING TRIGGER BUTTON ==================== */}
        <div className="!flex !justify-end">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close chat' : 'Open chat'}
            className="!group !relative !flex !h-14 !w-14 !items-center !justify-center !rounded-full !text-white !transition-all !duration-500 hover:!scale-[1.08] hover:!-translate-y-1 active:!scale-95 cw-float"
            style={{
              background:
                'linear-gradient(145deg, #fbbf24 0%, #f9914a 45%, #ea580c 100%)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* slow glow pulse */}
            <span
              className={`!pointer-events-none !absolute !inset-0 !rounded-full ${
                !open ? 'cw-glow-pulse' : ''
              }`}
              style={{
                boxShadow: open
                  ? '0 14px 40px -12px rgba(249, 145, 74, 0.9), 0 6px 18px -6px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                  : undefined,
              }}
            />

            {/* inner glow */}
            <span className="!pointer-events-none !absolute !inset-0 !rounded-full !bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.45),transparent_55%)]" />
            <span className="!pointer-events-none !absolute !inset-[1px] !rounded-full !ring-1 !ring-inset !ring-white/20" />

            {/* shimmer sweep on hover */}
            <span className="!pointer-events-none !absolute !inset-0 !overflow-hidden !rounded-full">
              <span className="!absolute !inset-0 !-translate-x-full !bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.6)_50%,transparent_70%)] !transition-transform !duration-[900ms] !ease-out group-hover:!translate-x-full" />
            </span>

            {/* icon */}
            <span className="!relative !transition-transform !duration-500 group-hover:!scale-110">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="!h-5 !w-5 !rotate-90 !transition-transform !duration-500"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="!h-6 !w-6"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M8 12h.01M12 12h.01M16 12h.01" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}