const Header = () => (
  <header className="bg-red-700 text-white py-6 px-4 flex justify-between items-center">
    <div className="text-3xl font-extrabold tracking-wide">Time Magazine</div>
    <nav className="space-x-4">
      <a href="/" className="hover:underline">Home</a>
      <a href="/categories" className="hover:underline">Categories</a>
      <a href="/trending" className="hover:underline">Trending</a>
      <a href="/login" className="hover:underline">Login</a>
    </nav>
  </header>
);

export default Header;
