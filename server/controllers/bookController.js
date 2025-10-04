const Book = require('../models/bookModel');
const { validationResult } = require('express-validator');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { search, genre, sortBy, sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Genre filter
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }
    
    let sortOptions = {};
    
    // Sort functionality
    if (sortBy === 'rating') {
      sortOptions.rating = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'publishedYear') {
      sortOptions.publishedYear = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }
    
    const books = await Book.find(query)
      .populate('userId', 'name email')
      .sort(sortOptions);
    
    res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('userId', 'name email');
    
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, description, rating, review, image, genre, publishedYear } = req.body;
    
    const book = await Book.create({
      title,
      author,
      description,
      rating,
      review,
      image,
      genre,
      publishedYear,
      userId: req.user._id,
    });
    
    const populatedBook = await Book.findById(book._id).populate('userId', 'name email');
    
    res.status(201).json(populatedBook);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this book' });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    
    res.json(updatedBook);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if user owns the book
    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this book' });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's books
// @route   GET /api/books/user/:userId
// @access  Public
const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(books);
  } catch (error) {
    console.error('Get user books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getUserBooks,
};
