import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { booksAPI } from '../utils/api';
import BookCard from '../components/BookCard';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Star,
  Loader2,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please log in to view your profile');
      navigate('/login');
    } else if (isAuthenticated && user) {
      fetchUserBooks();
    }
  }, [isAuthenticated, authLoading, user, navigate]);

  const fetchUserBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getUserBooks(user._id);
      setUserBooks(response.data);
    } catch (error) {
      console.error('Error fetching user books:', error);
      toast.error('Failed to fetch your books');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAverageRating = () => {
    if (userBooks.length === 0) return 0;
    const totalRating = userBooks.reduce((sum, book) => sum + book.rating, 0);
    return (totalRating / userBooks.length).toFixed(1);
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {user.name}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <Mail className="h-4 w-4 mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
          </div>

          {/* Add Book Button */}
          <button
            onClick={() => navigate('/add-book')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {userBooks.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Books Reviewed</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {getAverageRating()}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {userBooks.filter(book => book.rating >= 4).length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Highly Rated</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {new Set(userBooks.map(book => book.genre)).size}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Genres Covered</div>
        </div>
      </div>

      {/* Books Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Book Reviews
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {userBooks.length} book{userBooks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {userBooks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No book reviews yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start sharing your thoughts about books you've read!
            </p>
            <button
              onClick={() => navigate('/add-book')}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Add Your First Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {userBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {userBooks
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((book) => (
                  <div
                    key={book._id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={book.image || 'https://via.placeholder.com/60x80?text=Book+Cover'}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {book.author}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < book.rating ? 'star' : 'star-empty'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(book.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
