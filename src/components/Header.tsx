import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import NewsTicker from './NewsTicker';
import Clock from './Clock';

const linkBase =
  'text-sm font-semibold text-white/90 hover:text-white hover:underline underline-offset-4';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="text-white">
      <div className="bg-red-700 py-6 px-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-extrabold tracking-wide">
            Time Magazine
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? `${linkBase} text-white` : linkBase)}
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? `${linkBase} text-white` : linkBase)}
              >
                Categories
              </NavLink>
              <NavLink
                to="/trending"
                className={({ isActive }) => (isActive ? `${linkBase} text-white` : linkBase)}
              >
                Trending
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) => (isActive ? `${linkBase} text-white` : linkBase)}
              >
                Articles
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? `${linkBase} text-white` : linkBase)}
              >
                Login
              </NavLink>
            </nav>

            <Clock />

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      </div>

      <NewsTicker />
    </header>
  );
};

export default Header;
