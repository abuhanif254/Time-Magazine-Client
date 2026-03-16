import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md mx-auto my-4">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-700 text-white px-4 py-2 rounded-r hover:bg-red-800 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
