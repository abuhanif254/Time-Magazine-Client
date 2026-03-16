import type { Category, Story } from '../data/content';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export async function fetchStories(): Promise<Story[]> {
  const res = await fetch(`${API_BASE}/api/stories`);
  if (!res.ok) {
    throw new Error('Failed to fetch stories');
  }
  return res.json();
}

export async function fetchCategories(): Promise<{ label: Category; description: string }[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

