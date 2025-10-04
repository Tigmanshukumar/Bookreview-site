import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, onFilter, filters = {} }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [genre, setGenre] = useState(filters.genre || '');
  const [sortBy, setSortBy] = useState(filters.sortBy || '');
  const [sortOrder, setSortOrder] = useState(filters.sortOrder || 'desc');
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy',
    'Biography', 'History', 'Self-Help', 'Business', 'Technology', 'Health',
    'Travel', 'Cooking', 'Art', 'Philosophy', 'Poetry', 'Drama', 'Thriller',
    'Horror', 'Adventure', 'Comedy', 'Other'
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'publishedYear', label: 'Published Year' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = {
      search: searchTerm.trim(),
      genre: genre || undefined,
      sortBy: sortBy || 'createdAt',
      sortOrder,
    };
    onSearch(searchParams);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setGenre('');
    setSortBy('');
    setSortOrder('desc');
    onSearch({
      search: '',
      genre: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = searchTerm || genre || sortBy !== '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center space-x-2 ${
              showFilters ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200' : ''
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Search Button */}
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Genres</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="input-field"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="btn-secondary flex items-center space-x-2 text-sm"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
