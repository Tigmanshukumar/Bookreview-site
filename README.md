# BookReview - Full Stack MERN Application

A modern book review web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can discover, review, and share their favorite books with a beautiful, responsive interface.

## 🚀 Features

### Frontend (React + Vite + Tailwind CSS)
- **Modern UI/UX**: Clean, responsive design with dark/light mode toggle
- **Authentication**: Secure JWT-based login/signup system
- **Book Management**: Add, edit, delete, and view book reviews
- **Search & Filter**: Advanced search by title, author, genre with sorting options
- **User Profiles**: Personal dashboard with user statistics
- **Real-time Notifications**: Toast notifications for user feedback

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT token-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation using express-validator
- **Error Handling**: Comprehensive error handling and logging
- **CORS**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
bookreview/
├── client/                 # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ReviewForm.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AddBook.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── context/        # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── utils/          # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── models/             # Database models
│   │   ├── userModel.js
│   │   └── bookModel.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/             # Configuration files
│   │   └── db.js
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd bookreview
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/bookreview
# JWT_SECRET=your_super_secret_jwt_key_here
# JWT_EXPIRE=7d
# PORT=5000
# NODE_ENV=development

# Start the server (development mode)
npm run dev

# Or start in production mode
npm start
```

### 3. Frontend Setup
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running on your system:
- **Local MongoDB**: Ensure MongoDB service is running
- **MongoDB Atlas**: Use your Atlas connection string in the `.env` file

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)

### Book Routes (`/api/books`)
- `GET /` - Get all books (with search, filter, sort)
- `GET /:id` - Get single book by ID
- `GET /user/:userId` - Get books by user ID
- `POST /` - Create new book (protected)
- `PUT /:id` - Update book (protected)
- `DELETE /:id` - Delete book (protected)

### Query Parameters for GET /api/books
- `search` - Search by title, author, or description
- `genre` - Filter by genre
- `sortBy` - Sort by: createdAt, rating, title, publishedYear
- `sortOrder` - Sort order: asc, desc

## 🎨 Features Overview

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- User session management

### Book Management
- Add book reviews with ratings
- Edit and delete your own reviews
- Rich book information (title, author, description, genre, year)
- Book cover image support
- Star rating system (1-5 stars)

### Search & Discovery
- Full-text search across titles, authors, and descriptions
- Genre-based filtering
- Multiple sorting options
- Responsive grid layout

### User Experience
- Dark/Light mode toggle
- Responsive design for all devices
- Loading states and error handling
- Toast notifications for feedback
- Smooth animations and transitions

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Push your code to GitHub
2. Connect your repository to Railway or Render
3. Set environment variables in the deployment platform
4. Deploy the backend service

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Update API URLs in the frontend for production

### Environment Variables
```env
# Backend (.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production

# Frontend (update vite.config.js for production API URL)
```

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📱 Screenshots

### Home Page
- Book grid with search and filters
- Dark/Light mode toggle
- Responsive design

### Book Details
- Full book information
- Rating system
- Edit/Delete options for owners
- External links to find the book

### User Profile
- Personal statistics
- User's book reviews
- Activity timeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend library
- [Node.js](https://nodejs.org/) - Backend runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Support

If you have any questions or need help, please open an issue in the repository or contact the development team.

---

**Happy Reading! 📚**