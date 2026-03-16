import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, STORIES as LOCAL_STORIES, formatMeta, type Category, type Story } from '../data/content';
import { fetchStories } from '../services/api';

const Articles = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [stories, setStories] = useState<Story[]>(LOCAL_STORIES);

  useEffect(() => {
    fetchStories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        }
      })
      .catch(() => {
        // fall back to local stories
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories
      .filter((s) => !s.featured)
      .filter((s) => (category === 'All' ? true : s.category === category))
      .filter((s) => {
        if (!q) return true;
        return (
          s.title.toLowerCase().includes(q) ||
          s.dek.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q)
        );
      });
  }, [query, category, stories]);

  const featured = useMemo(
    () => stories.find((s) => s.featured) ?? stories[0],
    [stories],
  );

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-red-700">Articles</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
              Read the latest
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Browse stories by topic, or search by headline, author, or keyword.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Trending
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-5">
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/10 via-transparent to-gray-900/5" />
            <div className="relative p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-red-700 px-2.5 py-1 text-xs font-bold text-white">
                  Editor’s pick
                </span>
                <span className="text-xs font-semibold tracking-wide text-gray-700">
                  {featured.category}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold leading-tight text-gray-900">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">{featured.dek}</p>
              <p className="mt-4 text-xs text-gray-600">{formatMeta(featured)}</p>
              <div className="mt-5">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-red-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-red-800"
                >
                  Read on home
                </Link>
              </div>
            </div>
          </article>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-12 sm:items-center">
              <div className="sm:col-span-7">
                <label htmlFor="q" className="text-xs font-bold tracking-wide text-gray-700">
                  Search
                </label>
                <input
                  id="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search headlines, authors, keywords…"
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="cat" className="text-xs font-bold tracking-wide text-gray-700">
                  Category
                </label>
                <select
                  id="cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | 'All')}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="All">All</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {filtered.map((story) => (
                <article
                  key={story.id}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:bg-white"
                >
                  <p className="text-xs font-semibold tracking-wide text-gray-600">
                    {story.category}
                  </p>
                  <h4 className="mt-2 line-clamp-2 text-base font-extrabold text-gray-900">
                    {story.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-700">{story.dek}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs text-gray-600">{formatMeta(story)}</p>
                    <Link to="/" className="text-sm font-extrabold text-red-700 hover:underline">
                      Read
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
                <p className="text-sm font-semibold text-gray-900">No results found.</p>
                <p className="mt-1 text-sm text-gray-600">Try a different search or category.</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Articles;
