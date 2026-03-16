import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { STORIES, formatMeta } from '../data/content';

const Trending = () => {
  const trending = useMemo(() => {
    return STORIES.filter((s) => typeof s.trendingRank === 'number')
      .slice()
      .sort((a, b) => (a.trendingRank ?? 999) - (b.trendingRank ?? 999));
  }, []);

  const sidebar = useMemo(() => STORIES.filter((s) => !s.featured).slice(0, 4), []);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-red-700">Trending</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
              What readers are following
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              A ranked list of the stories getting the most attention right now.
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
              to="/articles"
              className="rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Articles
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
            <h3 className="text-lg font-extrabold text-gray-900">Top stories</h3>

            <div className="mt-4 space-y-4">
              {trending.map((story) => (
                <article
                  key={story.id}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:bg-white"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gray-900 text-base font-extrabold text-white">
                      {story.trendingRank}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wide text-gray-600">
                        {story.category}
                      </p>
                      <h4 className="mt-2 line-clamp-2 text-lg font-extrabold text-gray-900 group-hover:underline">
                        {story.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-700">{story.dek}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xs text-gray-600">{formatMeta(story)}</p>
                        <Link to="/articles" className="text-sm font-extrabold text-red-700 hover:underline">
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-gray-900">More to read</h3>
              <Link to="/categories" className="text-sm font-semibold text-red-700 hover:underline">
                Categories
              </Link>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
              {sidebar.map((story) => (
                <Link key={story.id} to="/articles" className="block py-4 first:pt-0 last:pb-0">
                  <p className="text-xs font-semibold tracking-wide text-gray-600">
                    {story.category}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-extrabold text-gray-900 hover:underline">
                    {story.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">{formatMeta(story)}</p>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Trending;
