import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, STORIES, formatMeta, type Category } from '../data/content';

const Categories = () => {
  const [active, setActive] = useState<Category>(CATEGORIES[0]?.label ?? 'World');

  const stories = useMemo(() => {
    return STORIES.filter((s) => !s.featured).filter((s) => s.category === active);
  }, [active]);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-red-700">Categories</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
              Browse by topic
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Explore sections across world affairs, technology, health, and more.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/articles"
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Articles
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
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-5">
            <h3 className="text-lg font-extrabold text-gray-900">All categories</h3>
            <div className="mt-4 grid gap-3">
              {CATEGORIES.map((c) => {
                const selected = c.label === active;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setActive(c.label)}
                    className={[
                      'text-left rounded-2xl border p-4 transition',
                      selected
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-gray-50 hover:bg-white',
                    ].join(' ')}
                  >
                    <p className={selected ? 'text-xs font-bold tracking-wide text-red-200' : 'text-xs font-bold tracking-wide text-red-700'}>
                      {c.label}
                    </p>
                    <p className={selected ? 'mt-1 text-sm text-white/90' : 'mt-1 text-sm text-gray-700'}>
                      {c.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold tracking-wide text-gray-600">Selected</p>
                <h3 className="mt-1 text-2xl font-extrabold text-gray-900">{active}</h3>
              </div>
              <Link to="/articles" className="text-sm font-semibold text-red-700 hover:underline">
                View all articles
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {stories.slice(0, 6).map((story) => (
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
                    <Link to="/articles" className="text-sm font-extrabold text-red-700 hover:underline">
                      Read
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {stories.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
                <p className="text-sm font-semibold text-gray-900">No stories yet.</p>
                <p className="mt-1 text-sm text-gray-600">Pick a different category.</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
