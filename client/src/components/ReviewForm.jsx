import { useState } from 'react';
import { Star, Save, X } from 'lucide-react';

const ReviewForm = ({ book, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    description: book?.description || '',
    rating: book?.rating || 1,
    review: book?.review || '',
    image: book?.image || '',
    genre: book?.genre || '',
    publishedYear: book?.publishedYear || '',
  });

  // Debug log to see what data we're getting
  console.log('ReviewForm - book data:', book);
  console.log('ReviewForm - formData:', formData);

  const [errors, setErrors] = useState({});

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy',
    'Biography', 'History', 'Self-Help', 'Business', 'Technology', 'Health',
    'Travel', 'Cooking', 'Art', 'Philosophy', 'Poetry', 'Drama', 'Thriller',
    'Horror', 'Adventure', 'Comedy', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    }

    if (formData.publishedYear && (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear())) {
      newErrors.publishedYear = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRatingChange(index + 1)}
        className={`h-6 w-6 transition-colors duration-200 ${
          index < rating ? 'star' : 'star-empty'
        }`}
      >
        <Star className="h-6 w-6" />
      </button>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Book Review' : 'Add New Book Review'}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Book Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter the book title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`input-field ${errors.author ? 'border-red-500' : ''}`}
              placeholder="Enter the author's name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.author}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Published Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Published Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className={`input-field ${errors.publishedYear ? 'border-red-500' : ''}`}
              placeholder="e.g., 2023"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.publishedYear}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-2">
              <div className="rating-stars">
                {renderStars(formData.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({formData.rating}/5)
              </span>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Book Cover Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Brief description of the book"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review *
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows={6}
            className={`input-field ${errors.review ? 'border-red-500' : ''}`}
            placeholder="Share your thoughts about the book..."
          />
          {errors.review && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.review}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{isEditing ? 'Update Review' : 'Add Review'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
