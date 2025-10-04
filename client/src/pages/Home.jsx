import { useState, useEffect } from 'react';
import { booksAPI } from '../utils/api';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { BookOpen, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    search: '',
    genre: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  useEffect(() => {
    fetchBooks();
  }, [searchParams]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getAllBooks(searchParams);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleFilter = (filterType, value) => {
    setSearchParams(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Amazing Books
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore book reviews from our community and find your next favorite read. 
          Share your thoughts and discover new literary adventures.
        </p>
      </div>

      {/* Search and Filters */}
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} filters={searchParams} />

      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading books...</span>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No books found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchParams.search || searchParams.genre
              ? 'Try adjusting your search criteria or filters.'
              : 'Be the first to add a book review!'}
          </p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {books.length} book{books.length !== 1 ? 's' : ''}
              {searchParams.search && ` matching "${searchParams.search}"`}
              {searchParams.genre && ` in ${searchParams.genre}`}
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </>
      )}

      {/* Stats Section */}
      {!loading && books.length > 0 && (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Community Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{books.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Books</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {books.length > 0 ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1) : '0'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {new Set(books.map(book => book.userId?._id)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Contributors</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
