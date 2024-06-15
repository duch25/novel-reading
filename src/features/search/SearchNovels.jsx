import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchNovels() {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearchNovels = e => {
    if (e.key === 'Enter') {
      if (!query) return;
      else navigate(`/novels/search?q=${query}`);
    }
  };

  return (
    <>
      <input
        placeholder="Search novels..."
        className="w-64 rounded-full bg-sky-100 px-4 py-2 text-sm text-gray-900 transition-all duration-300 placeholder:text-stone-400 focus:w-72 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => handleSearchNovels(e)}
      />
      <ion-icon class="search-icon" name="search-outline"></ion-icon>
    </>
  );
}

export default SearchNovels;
