import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading, darkMode }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className={`w-full px-4 py-3 rounded-lg focus:outline-none shadow-sm transition-all ${
            darkMode 
              ? 'bg-slate-700 border border-slate-600 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
              : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`absolute right-2 p-2 rounded-full transition-all ${
            darkMode
              ? 'text-indigo-400 hover:bg-slate-600 active:scale-95'
              : 'text-indigo-600 hover:bg-gray-100 active:scale-95'
          } disabled:opacity-50`}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 