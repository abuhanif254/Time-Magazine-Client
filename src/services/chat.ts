const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export type ChatSource =
  | { type: 'story'; id: string; title: string; category: string }
  | { type: 'category'; label: string };

export type ChatResponse = {
  answer: string;
  sources: ChatSource[];
};

export async function sendChat(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json();
}

