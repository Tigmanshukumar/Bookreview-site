import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { booksAPI } from '../utils/api';
import ReviewForm from '../components/ReviewForm';
import { 
  Star, 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  ArrowLeft,
  ExternalLink,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

// Simple error boundary component
const ErrorFallback = ({ error, resetError }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
        Something went wrong
      </h2>
      <p className="text-red-600 dark:text-red-300 mb-4">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetError}
        className="btn-primary"
      >
        Try Again
      </button>
    </div>
  </div>
);

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState(null);

  // Reset error when component mounts or id changes
  useEffect(() => {
    setError(null);
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching book with ID:', id);
      const response = await booksAPI.getBookById(id);
      console.log('Book fetched successfully:', response.data);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError(error.message || 'Failed to fetch book details');
      toast.error('Failed to fetch book details');
      // Don't navigate away immediately, let user see the error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book review?')) {
      try {
        await booksAPI.deleteBook(id);
        toast.success('Book review deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to delete book review');
      }
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await booksAPI.updateBook(id, updatedData);
      setBook(response.data);
      setShowEditForm(false);
      toast.success('Book review updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      const message = error.response?.data?.message || 'Failed to update book review';
      toast.error(message);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'star' : 'star-empty'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isOwner = book && user && book.userId && (book.userId._id === user._id || book.userId === user._id);

  // Debug logs
  console.log('BookDetails - book:', book);
  console.log('BookDetails - user:', user);
  console.log('BookDetails - isOwner:', isOwner);
  console.log('BookDetails - showEditForm:', showEditForm);

  // Show error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
            Error Loading Book
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            {error}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Back to Home
            </button>
            <button
              onClick={() => fetchBook()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading book details...</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Book not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      {showEditForm && book ? (
        <div>
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Debug: Editing book "{book.title}" by {book.author}
            </p>
          </div>
          <ReviewForm
            book={book}
            onSubmit={handleUpdate}
            onCancel={() => setShowEditForm(false)}
            isEditing={true}
          />
        </div>
      ) : showEditForm && !book ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading book data...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please wait while we load the book information.
          </p>
          <button
            onClick={() => setShowEditForm(false)}
            className="btn-primary"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Book Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <img
                  src={book.image || 'https://via.placeholder.com/300x400?text=Book+Cover'}
                  alt={book.title}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Book+Cover';
                  }}
                />
              </div>

              {/* Book Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {book.title}
                    </h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-lg">{book.author}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isAuthenticated && isOwner && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowEditForm(true)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-3">
                  <div className="rating-stars">
                    {renderStars(book.rating)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {book.rating}/5
                  </span>
                </div>

                {/* Genre and Year */}
                <div className="flex flex-wrap gap-3">
                  {book.genre && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      {book.genre}
                    </span>
                  )}
                  {book.publishedYear && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{book.publishedYear}</span>
                    </div>
                  )}
                </div>

                {/* Posted By and Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4 mr-1" />
                    <span>by {book.userId?.name || 'Anonymous'}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(book.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {book.description}
            </p>
          </div>

          {/* Review */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Review
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {book.review}
              </p>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Find This Book
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Search on Google</span>
              </a>
              <a
                href={`https://www.goodreads.com/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Find on Goodreads</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
