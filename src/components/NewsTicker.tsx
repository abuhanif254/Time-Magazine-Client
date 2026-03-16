import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeTicker, type TickerItem } from '../services/ticker';
import { useTheme } from '../theme/ThemeContext';

function repeatForScroll(items: TickerItem[]) {
  if (items.length === 0) return items;
  // Repeat enough to feel continuous.
  return [...items, ...items, ...items];
}

export default function NewsTicker() {
  const { theme } = useTheme();
  const [items, setItems] = useState<TickerItem[]>([]);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const unsubscribe = subscribeTicker((next) => setItems(next));
    return unsubscribe;
  }, [live]);

  const repeated = useMemo(() => repeatForScroll(items), [items]);

  const barClasses =
    theme === 'dark'
      ? 'border-white/10 bg-black/35 text-white'
      : 'border-black/10 bg-white/60 text-gray-900';

  const chipClasses =
    theme === 'dark'
      ? 'bg-white/10 text-white'
      : 'bg-gray-900 text-white';

  const fadeLeft =
    theme === 'dark'
      ? 'bg-gradient-to-r from-gray-950 to-transparent'
      : 'bg-gradient-to-r from-gray-50 to-transparent';
  const fadeRight =
    theme === 'dark'
      ? 'bg-gradient-to-l from-gray-950 to-transparent'
      : 'bg-gradient-to-l from-gray-50 to-transparent';

  return (
    <div className={`border-b ${barClasses}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${chipClasses}`}>
          LIVE
        </span>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="relative">
            <div className="ticker-track flex w-max items-center gap-6 pr-6">
              {repeated.length === 0 ? (
                <span className="text-xs font-semibold opacity-80">Loading headlines…</span>
              ) : (
                repeated.map((it, idx) => (
                  <span key={`${it.id}-${idx}`} className="flex items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full border border-current/20 px-2 py-0.5 text-[10px] font-extrabold opacity-90">
                      {it.label}
                    </span>
                    <Link to="/articles" className="hover:underline underline-offset-4">
                      {it.title}
                    </Link>
                  </span>
                ))
              )}
            </div>

            <div className={`pointer-events-none absolute inset-y-0 left-0 w-12 ${fadeLeft}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-12 ${fadeRight}`} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLive((v) => !v)}
          className={[
            'rounded-full border border-current/20 px-3 py-1 text-xs font-bold',
            theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5',
          ].join(' ')}
        >
          {live ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
}

