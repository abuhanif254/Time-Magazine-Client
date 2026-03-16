import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-auto bg-gray-900 text-white">
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-base font-extrabold tracking-wide">Time Magazine</h3>
          <p className="mt-3 text-xs text-gray-400">
            Daily coverage of politics, business, technology, health, science, and culture—curated
            for focused reading.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400">Explore</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-200 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-sm text-gray-200 hover:text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/trending" className="text-sm text-gray-200 hover:text-white">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/articles" className="text-sm text-gray-200 hover:text-white">
                Articles
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400">Account</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/login" className="text-sm text-gray-200 hover:text-white">
                Sign in
              </Link>
            </li>
          </ul>

          <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-gray-400">
            Support
          </h4>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-white">
                Help center
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-white">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400">Newsletter</h4>
          <p className="mt-3 text-xs text-gray-400">
            Get one great story in your inbox every morning.
          </p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-500">Follow</span>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gray-200 hover:text-white underline underline-offset-4"
            >
              X
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gray-200 hover:text-white underline underline-offset-4"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gray-200 hover:text-white underline underline-offset-4"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4 text-xs text-gray-500">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>&copy; 2026 Time Magazine. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="hover:text-gray-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
