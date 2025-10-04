const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a book description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  review: {
    type: String,
    required: [true, 'Please provide a review'],
    trim: true,
    maxlength: [2000, 'Review cannot be more than 2000 characters']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Book+Cover'
  },
  genre: {
    type: String,
    trim: true,
    maxlength: [30, 'Genre cannot be more than 30 characters']
  },
  publishedYear: {
    type: Number,
    min: [1000, 'Please provide a valid year'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create index for search functionality
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
