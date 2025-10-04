const express = require('express');
const { body } = require('express-validator');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getUserBooks,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const bookValidation = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('author').trim().isLength({ min: 1, max: 50 }).withMessage('Author is required and must be less than 50 characters'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description is required and must be less than 1000 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').trim().isLength({ min: 1, max: 2000 }).withMessage('Review is required and must be less than 2000 characters'),
  body('genre').optional().trim().isLength({ max: 30 }).withMessage('Genre must be less than 30 characters'),
  body('publishedYear').optional().isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Please provide a valid year'),
];

// Routes
router.get('/', getBooks);
router.get('/user/:userId', getUserBooks);
router.get('/:id', getBookById);
router.post('/', protect, bookValidation, createBook);
router.put('/:id', protect, bookValidation, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
