import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendChat, type ChatResponse } from '../services/chat';

type ChatMessage =
  | { role: 'assistant'; text: string; sources?: ChatResponse['sources'] }
  | { role: 'user'; text: string };

const SUGGESTIONS = ['featured story', 'trending', 'categories', 'technology stories'];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      role: 'assistant',
      text: 'Ask me about this project: featured, trending, categories, or a topic (politics/tech/health…).',
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [open, messages.length]);

  async function handleSend(text: string) {
    const msg = text.trim();
    if (!msg) return;

    setMessages((m) => [...m, { role: 'user', text: msg }]);
    setInput('');
    setBusy(true);
    try {
      const res = await sendChat(msg);
      setMessages((m) => [...m, { role: 'assistant', text: res.answer, sources: res.sources }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: 'Chat server is not reachable. Start the server on port 5000 and try again.' },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white">
            <div className="min-w-0">
              <p className="text-sm font-extrabold">Project Chat</p>
              <p className="text-xs text-white/80">Answers from your project content</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-xs font-bold text-white/90 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div ref={listRef} className="max-h-[55vh] space-y-3 overflow-auto p-4">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={[
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm',
                    m.role === 'user'
                      ? 'bg-red-700 text-white'
                      : 'border border-gray-200 bg-gray-50 text-gray-900',
                  ].join(' ')}
                >
                  {m.text}
                  {m.role === 'assistant' && m.sources && m.sources.length > 0 ? (
                    <div className="mt-3 border-t border-gray-200 pt-2 text-xs text-gray-700">
                      <p className="font-bold text-gray-900">Sources</p>
                      <ul className="mt-1 space-y-1">
                        {m.sources.slice(0, 5).map((s, sIdx) => (
                          <li key={sIdx} className="leading-snug">
                            {s.type === 'story' ? (
                              <span>
                                <span className="font-semibold">{s.title}</span>{' '}
                                <span className="text-gray-600">({s.category})</span>{' '}
                                <Link className="font-bold text-red-700 hover:underline" to="/articles">
                                  open
                                </Link>
                              </span>
                            ) : (
                              <span>
                                <span className="font-semibold">{s.label}</span>{' '}
                                <Link className="font-bold text-red-700 hover:underline" to="/categories">
                                  browse
                                </Link>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={busy}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-60"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex items-center gap-2 border-t border-gray-200 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (canSend) handleSend(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about featured, trending, categories…"
              className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {busy ? '…' : 'Send'}
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-gray-900 px-4 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-gray-800"
        >
          Chat
        </button>
      )}
    </div>
  );
}

