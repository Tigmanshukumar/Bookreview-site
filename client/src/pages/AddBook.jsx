import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { booksAPI } from '../utils/api';
import ReviewForm from '../components/ReviewForm';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const AddBook = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to add a book review');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (bookData) => {
    try {
      const response = await booksAPI.createBook(bookData);
      toast.success('Book review added successfully!');
      navigate(`/book/${response.data._id}`);
    } catch (error) {
      console.error('Error creating book:', error);
      const message = error.response?.data?.message || 'Failed to add book review';
      toast.error(message);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Book Review
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your thoughts about a book you've read with the community.
        </p>
      </div>

      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;
