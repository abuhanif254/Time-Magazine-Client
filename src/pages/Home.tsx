import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

type Category =
  | 'Politics'
  | 'Business'
  | 'Technology'
  | 'Health'
  | 'Culture'
  | 'Science'
  | 'World';

type Story = {
  id: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  minutes: number;
  publishedLabel: string;
  featured?: boolean;
};

const CATEGORIES: { label: Category; description: string }[] = [
  { label: 'World', description: 'Dispatches and analysis from across the globe.' },
  { label: 'Politics', description: 'Power, policy, and the people shaping it.' },
  { label: 'Business', description: 'Markets, money, and the future of work.' },
  { label: 'Technology', description: 'Products, platforms, and what comes next.' },
  { label: 'Health', description: 'Science-backed wellness and public health.' },
  { label: 'Culture', description: 'Ideas, art, and the stories we share.' },
  { label: 'Science', description: 'Discoveries and debates in research.' },
];

const STORIES: Story[] = [
  {
    id: 'feature-01',
    category: 'World',
    title: 'The New Geography of Power in 2026',
    dek: 'A fast-changing world order is remaking alliances, trade routes, and the meaning of security.',
    author: 'Amina Rahman',
    minutes: 8,
    publishedLabel: 'Today',
    featured: true,
  },
  {
    id: 'latest-01',
    category: 'Technology',
    title: 'Inside the Race to Build Trustworthy AI',
    dek: 'Regulators, labs, and startups are converging on a new set of standards—slowly, and unevenly.',
    author: 'David Chen',
    minutes: 6,
    publishedLabel: '2 hours ago',
  },
  {
    id: 'latest-02',
    category: 'Politics',
    title: 'How Local Elections Are Redefining National Strategy',
    dek: 'From school boards to city halls, small races are producing big shifts in messaging and funding.',
    author: 'Priya Desai',
    minutes: 5,
    publishedLabel: '4 hours ago',
  },
  {
    id: 'latest-03',
    category: 'Health',
    title: 'What We’re Learning About Sleep—and What to Do About It',
    dek: 'New research is clarifying the link between sleep, metabolism, and mental health.',
    author: 'Sofia Morales',
    minutes: 7,
    publishedLabel: 'Yesterday',
  },
  {
    id: 'trending-01',
    category: 'Business',
    title: 'The Quiet Boom in “Second Cities”',
    dek: 'Mid-sized metros are attracting talent and capital—without the biggest-city price tags.',
    author: 'James Okafor',
    minutes: 4,
    publishedLabel: 'Trending',
  },
  {
    id: 'trending-02',
    category: 'Culture',
    title: 'Why Pop Culture Keeps Returning to the 2000s',
    dek: 'Nostalgia is only part of the story—platform incentives do the rest.',
    author: 'Lena Park',
    minutes: 5,
    publishedLabel: 'Trending',
  },
  {
    id: 'trending-03',
    category: 'Science',
    title: 'A New Era of Climate Attribution',
    dek: 'Scientists can now connect extreme events to warming faster—and with greater confidence.',
    author: 'Noah Klein',
    minutes: 6,
    publishedLabel: 'Trending',
  },
];

function formatMeta(story: Story) {
  return `${story.author} · ${story.minutes} min read · ${story.publishedLabel}`;
}


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = useMemo(() => STORIES.find((s) => s.featured) ?? STORIES[0], []);
  const latest = useMemo(
    () => STORIES.filter((s) => !s.featured).slice(0, 4),
    [],
  );
  const trending = useMemo(() => STORIES.filter((s) => s.id.startsWith('trending-')).slice(0, 3), []);

  const filteredStories = useMemo(() => {
    const pool = STORIES.filter((s) => !s.featured);
    if (!searchQuery.trim()) return pool;
    const q = searchQuery.trim().toLowerCase();
    return pool.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.dek.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const categoryStories = useMemo(() => {
    if (selectedCategory === 'All') return filteredStories;
    return filteredStories.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, filteredStories]);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-red-700">
              Today’s Edition
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Time Magazine
            </h1>
            <p className="mt-2 max-w-2xl text-base text-gray-600">
              The day’s essential stories, curated for focus. Read deeply, skim smartly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium text-gray-600 sm:inline">
              Quick links
            </span>
            <Link
              to="/trending"
              className="rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Trending
            </Link>
            <Link
              to="/categories"
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} />

        <section className="mt-8 grid gap-6 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/10 via-transparent to-gray-900/5" />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-red-700 px-2.5 py-1 text-xs font-bold text-white">
                  Featured
                </span>
                <span className="text-xs font-semibold tracking-wide text-gray-700">
                  {featured.category}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-gray-700">
                {featured.dek}
              </p>
              <p className="mt-4 text-sm text-gray-600">{formatMeta(featured)}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/articles"
                  className="inline-flex items-center justify-center rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800"
                >
                  Read the story
                </Link>
                <Link
                  to="/articles"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
                >
                  View all articles
                </Link>
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-gray-900">Latest</h3>
              <Link to="/articles" className="text-sm font-semibold text-red-700 hover:underline">
                See all
              </Link>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
              {latest.map((story) => (
                <Link
                  key={story.id}
                  to="/articles"
                  className="block py-4 first:pt-0 last:pb-0"
                >
                  <p className="text-xs font-semibold tracking-wide text-gray-600">
                    {story.category}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-bold text-gray-900 hover:underline">
                    {story.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">{formatMeta(story)}</p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-extrabold text-gray-900">Browse by category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className={[
                    'rounded-full px-3 py-1.5 text-sm font-semibold',
                    selectedCategory === 'All'
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                  ].join(' ')}
                >
                  All
                </button>
                {CATEGORIES.slice(0, 5).map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setSelectedCategory(c.label)}
                    className={[
                      'rounded-full px-3 py-1.5 text-sm font-semibold',
                      selectedCategory === c.label
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {categoryStories.slice(0, 4).map((story) => (
                <article
                  key={story.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 hover:bg-white"
                >
                  <p className="text-xs font-semibold tracking-wide text-gray-600">
                    {story.category}
                  </p>
                  <h4 className="mt-1 line-clamp-2 text-base font-extrabold text-gray-900">
                    {story.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-700">{story.dek}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-gray-600">{formatMeta(story)}</p>
                    <Link
                      to="/articles"
                      className="text-sm font-bold text-red-700 hover:underline"
                    >
                      Read
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end">
              <Link
                to="/categories"
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                Explore categories
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-gray-900">Trending</h3>
              <Link to="/trending" className="text-sm font-semibold text-red-700 hover:underline">
                More
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {trending.map((story, idx) => (
                <Link
                  key={story.id}
                  to="/trending"
                  className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-900 text-sm font-extrabold text-white">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-gray-600">
                      {story.category}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-extrabold text-gray-900 group-hover:underline">
                      {story.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">{formatMeta(story)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-sm font-bold tracking-wide text-red-300">
                  Newsletter
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-white">
                  Get one great story in your inbox, every morning.
                </h3>
                <p className="mt-2 max-w-xl text-sm text-gray-200">
                  A clean, focused digest of what matters—no spam, no noise.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form
                  className="flex flex-col gap-3 sm:flex-row"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-700"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-2 text-xs text-white/70">
                  By subscribing, you agree to receive emails. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-extrabold text-gray-900">More sections</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.label}
                to="/categories"
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:bg-gray-50"
              >
                <p className="text-xs font-semibold tracking-wide text-red-700">
                  {c.label}
                </p>
                <p className="mt-2 text-sm text-gray-700">{c.description}</p>
                <p className="mt-4 text-sm font-bold text-gray-900">
                  Browse stories →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
