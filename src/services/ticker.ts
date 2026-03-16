const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export type TickerItem = {
  id: string;
  label: string;
  title: string;
  ts: number;
};

export type TickerPayload = { items: TickerItem[] };

export function subscribeTicker(onItems: (items: TickerItem[]) => void) {
  const es = new EventSource(`${API_BASE}/api/ticker/stream`);

  const onTicker = (ev: MessageEvent) => {
    try {
      const data = JSON.parse(ev.data) as TickerPayload;
      if (Array.isArray(data.items)) onItems(data.items);
    } catch {
      // ignore
    }
  };

  es.addEventListener('ticker', onTicker as EventListener);

  return () => {
    es.removeEventListener('ticker', onTicker as EventListener);
    es.close();
  };
}

