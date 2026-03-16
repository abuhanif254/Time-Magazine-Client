import { Link, NavLink } from 'react-router-dom';

const linkBase =
  'text-sm font-semibold text-white/90 hover:text-white hover:underline underline-offset-4';

const Header = () => (
  <header className="bg-red-700 text-white py-6 px-4">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
      <Link to="/" className="text-3xl font-extrabold tracking-wide">
        Time Magazine
      </Link>

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
    </div>
  </header>
);

export default Header;
