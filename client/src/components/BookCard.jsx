import { Link } from 'react-router-dom';
import { Star, Calendar, User } from 'lucide-react';

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'star' : 'star-empty'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Book Image */}
      <div className="mb-4">
        <img
          src={book.image || 'https://via.placeholder.com/300x400?text=Book+Cover'}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg shadow-md"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=Book+Cover';
          }}
        />
      </div>

      {/* Book Info */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm">{book.author}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="rating-stars">
            {renderStars(book.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {book.rating}/5
          </span>
        </div>

        {/* Genre */}
        {book.genre && (
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {book.genre}
            </span>
          </div>
        )}

        {/* Published Year */}
        {book.publishedYear && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{book.publishedYear}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {truncateText(book.description, 120)}
        </p>

        {/* Review Preview */}
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 italic">
          "{truncateText(book.review, 100)}"
        </p>

        {/* Posted By */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs">
              by {book.userId?.name || 'Anonymous'}
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(book.createdAt)}
          </span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/book/${book._id}`}
          className="btn-primary w-full text-center block mt-4"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
