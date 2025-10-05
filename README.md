# 📚 BookReview - Full Stack MERN Application

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-404D59?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite">
</div>

<div align="center">
  <p><em>A modern, full-stack book review platform where readers connect, share, and discover their next favorite book</em></p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Environment Configuration](#-environment-configuration)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

**BookReview** is a comprehensive full-stack web application built with the MERN stack that enables book enthusiasts to discover, review, and share their favorite books with a vibrant community. The platform features a modern, responsive interface with dark/light mode support, secure authentication, and advanced search capabilities.


### Why BookReview?
- **Community Driven**: Connect with fellow readers and share insights
- **Comprehensive Reviews**: Detailed book information with star ratings
- **Personal Library**: Track your reading journey with user profiles
- **Modern Interface**: Beautiful, responsive design that works everywhere
- **Secure & Fast**: JWT authentication with optimized performance

### Key Capabilities
- Create and manage book reviews with ratings
- Advanced search and filtering by genre, title, or author
- Personal user profiles with reading statistics
- Dark/light mode for comfortable reading at any time
- Real-time notifications and feedback

## ✨ Features

### 🎨 Frontend Features (React + Vite + Tailwind CSS)

#### User Interface
- **Modern UI/UX**: Clean, intuitive design with professional aesthetics
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: Polished transitions and loading states
- **Toast Notifications**: Real-time user feedback for actions

#### Core Functionality
- **Authentication System**: Secure JWT-based login and signup
- **Book Management**: Complete CRUD operations for book reviews
- **Advanced Search**: Filter by title, author, genre with sorting options
- **User Profiles**: Personal dashboard with statistics and activity
- **Star Rating System**: Visual 1-5 star rating interface
- **Book Cards**: Attractive grid layout with book information

### 🔧 Backend Features (Node.js + Express + MongoDB)

#### API & Server
- **RESTful API**: Well-structured, scalable API architecture
- **JWT Authentication**: Secure token-based authentication system
- **Password Security**: Bcrypt hashing for secure password storage
- **Input Validation**: Express-validator for data integrity
- **Error Handling**: Comprehensive error handling and logging
- **CORS Enabled**: Cross-origin resource sharing configured

#### Database & Storage
- **MongoDB Database**: Flexible NoSQL database with Mongoose ODM
- **Data Models**: User and Book schemas with relationships
- **Query Optimization**: Efficient database queries with indexing
- **Data Validation**: Schema-level validation for data integrity

## 🛠️ Technology Stack

### Frontend Technologies
```javascript
- React 18+              // Modern React with hooks
- Vite                   // Lightning-fast build tool
- Tailwind CSS 3.0+      // Utility-first CSS framework
- React Router DOM       // Client-side routing
- Axios                  // HTTP client for API calls
- React Context API      // State management
- Lucide React          // Beautiful icon library
- React Hot Toast       // Toast notifications
```

### Backend Technologies
```javascript
- Node.js 16+           // Server runtime environment
- Express.js 4.x        // Web application framework
- MongoDB 5.x           // NoSQL database
- Mongoose 7.x          // MongoDB ODM
- JWT (jsonwebtoken)    // Authentication tokens
- Bcrypt.js            // Password hashing
- Express Validator    // Input validation
- CORS                 // Cross-origin requests
- Dotenv              // Environment variables
```

### Development Tools
```javascript
- ESLint               // Code linting
- Prettier            // Code formatting
- Nodemon             // Auto-restart server
- Postman             // API testing
- Git                 // Version control
```

## 📁 Project Structure

```
bookreview/
├── client/                      # Frontend (React + Vite + Tailwind)
│   ├── public/                  # Static assets
│   │   ├── favicon.ico
│   │   └── images/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Navigation bar with auth status
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── BookCard.jsx     # Individual book display card
│   │   │   ├── SearchBar.jsx    # Search and filter component
│   │   │   ├── ReviewForm.jsx   # Book review form
│   │   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Main landing page with books
│   │   │   ├── AddBook.jsx      # Create new book review
│   │   │   ├── EditBook.jsx     # Edit existing review
│   │   │   ├── BookDetails.jsx  # Detailed book view
│   │   │   ├── Profile.jsx      # User profile and statistics
│   │   │   ├── Login.jsx        # User login page
│   │   │   └── Signup.jsx       # User registration page
│   │   ├── context/             # React Context for state
│   │   │   └── AuthContext.jsx  # Authentication state management
│   │   ├── utils/               # Utility functions
│   │   │   ├── api.js           # API configuration
│   │   │   └── helpers.js       # Helper functions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # App entry point
│   │   └── index.css            # Global styles with Tailwind
│   ├── package.json
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS config
│   └── .env                     # Environment variables
│
├── server/                      # Backend (Node.js + Express)
│   ├── controllers/             # Route controllers
│   │   ├── authController.js    # Authentication logic
│   │   └── bookController.js    # Book CRUD operations
│   ├── models/                  # Mongoose schemas
│   │   ├── userModel.js         # User schema and methods
│   │   └── bookModel.js         # Book schema and methods
│   ├── routes/                  # API route definitions
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── bookRoutes.js        # Book endpoints
│   ├── middleware/              # Custom middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validator.js         # Input validation
│   ├── config/                  # Configuration files
│   │   ├── db.js                # MongoDB connection
│   │   └── constants.js         # App constants
│   ├── utils/                   # Utility functions
│   │   └── helpers.js           # Server-side helpers
│   ├── server.js                # Main server entry point
│   ├── package.json
│   ├── .env                     # Environment variables
│   └── .env.example             # Environment template
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🚀 Installation & Setup

### Prerequisites
Ensure you have the following installed on your system:
```bash
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git for version control
```

### 1. Clone the Repository
```bash
git clone https://github.com/Tigmanshukumar/Bookreview-site.git
cd Bookreview-site
```

### 2. Backend Setup

#### Install Dependencies
```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install

# Dependencies include:
# - express: Web framework
# - mongoose: MongoDB ODM
# - jsonwebtoken: JWT authentication
# - bcryptjs: Password hashing
# - express-validator: Input validation
# - cors: Cross-origin requests
# - dotenv: Environment variables
# - nodemon: Development auto-restart
```

#### Configure Environment Variables
```bash
# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

Add the following to your `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bookreview
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookreview

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### Start Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Server will run on http://localhost:5000
```

### 3. Frontend Setup

#### Install Dependencies
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install all dependencies
npm install

# Dependencies include:
# - react & react-dom: Core React
# - react-router-dom: Routing
# - axios: HTTP client
# - tailwindcss: CSS framework
# - lucide-react: Icons
# - react-hot-toast: Notifications
```

#### Configure Environment Variables
```bash
# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

Add the following to your `.env` file:
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# For production:
# VITE_API_URL=https://your-backend-url.com/api
```

#### Start Frontend Development Server
```bash
# Start Vite dev server
npm run dev

# Application will be available at:
# http://localhost:5173
```

### 4. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or on macOS with Homebrew
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file
5. Whitelist your IP address

## 📖 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here

Response: {
  "success": true,
  "user": { "id": "...", "name": "...", "email": "...", "createdAt": "..." }
}
```

### Book Endpoints

#### Get All Books
```http
GET /api/books
Query Parameters:
  - search: Search term (title, author, description)
  - genre: Filter by genre
  - sortBy: Sort field (createdAt, rating, title, publishedYear)
  - sortOrder: Sort direction (asc, desc)
  - page: Page number (default: 1)
  - limit: Items per page (default: 10)

Example: GET /api/books?search=harry&genre=Fantasy&sortBy=rating&sortOrder=desc

Response: {
  "success": true,
  "count": 25,
  "books": [...]
}
```

#### Get Single Book
```http
GET /api/books/:id

Response: {
  "success": true,
  "book": {
    "id": "...",
    "title": "Book Title",
    "author": "Author Name",
    "description": "...",
    "genre": "Fiction",
    "rating": 4.5,
    "publishedYear": 2023,
    "coverImage": "...",
    "user": { "name": "...", "email": "..." }
  }
}
```

#### Get User's Books
```http
GET /api/books/user/:userId

Response: {
  "success": true,
  "count": 5,
  "books": [...]
}
```

#### Create New Book Review
```http
POST /api/books
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel...",
  "genre": "Classic Fiction",
  "rating": 5,
  "publishedYear": 1925,
  "coverImage": "https://example.com/cover.jpg"
}

Response: {
  "success": true,
  "book": { "id": "...", ... }
}
```

#### Update Book Review
```http
PUT /api/books/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "rating": 4
}

Response: {
  "success": true,
  "book": { "id": "...", ... }
}
```

#### Delete Book Review
```http
DELETE /api/books/:id
Authorization: Bearer jwt_token_here

Response: {
  "success": true,
  "message": "Book deleted successfully"
}
```

## ⚙️ Environment Configuration

### Backend Environment Variables (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bookreview

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173

# Optional: Email Configuration (for future features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend Environment Variables (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

## 💻 Usage Guide

### For Users

#### Getting Started
1. **Sign Up**: Create an account with email and password
2. **Login**: Access your account
3. **Browse Books**: Explore the book collection on the home page
4. **Search & Filter**: Use search bar to find specific books
5. **Add Review**: Share your book reviews with ratings

#### Adding a Book Review
1. Click "Add Book" in navigation
2. Fill in book details:
   - Title (required)
   - Author (required)
   - Description (required)
   - Genre (required)
   - Rating (1-5 stars)
   - Published Year
   - Cover Image URL
3. Submit the form
4. Review appears on your profile and home page

#### Managing Reviews
- **Edit**: Click edit button on your own book reviews
- **Delete**: Remove reviews you've created
- **View Details**: Click on any book card for full information

### For Developers

#### Running in Development
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

#### Building for Production
```bash
# Frontend build
cd client
npm run build
# Creates optimized 'dist' folder

# Backend (no build needed)
cd server
npm start
```

## 🌐 Deployment

### Backend Deployment (Railway/Render/Heroku)

#### Using Railway
```bash
1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Set environment variables in Railway dashboard
4. Deploy automatically
```

#### Using Render
```bash
1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Build Command: npm install
   - Start Command: npm start
4. Add environment variables
5. Deploy
```

#### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=strong_production_secret
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel --prod

# Or use Vercel GitHub integration
```

#### Using Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or use Netlify GitHub integration

# Update environment variables in Netlify dashboard
```

#### Update API URL for Production
```env
# In client/.env for production
VITE_API_URL=https://your-backend-domain.com/api
```

## 🧪 Testing

### Backend Testing
```bash
cd server

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Test specific file
npm test -- authController.test.js
```

### Frontend Testing
```bash
cd client

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] JWT token authentication
- [ ] Create book review
- [ ] Edit own book review
- [ ] Delete own book review
- [ ] Search functionality
- [ ] Filter by genre
- [ ] Sort books
- [ ] Responsive design on mobile
- [ ] Dark/light mode toggle
- [ ] Protected routes work correctly

## 📱 Screenshots

<details>
<summary>Click to view application screenshots</summary>

### Home Page - Light Mode
![Home Page Light](screenshots/home-light.png)
*Browse books with search and filter options in light mode*

### Home Page - Dark Mode
![Home Page Dark](screenshots/home-dark.png)
*Comfortable dark mode for night reading*

### Book Details Page
![Book Details](screenshots/book-details.png)
*Detailed view with full book information and ratings*

### Add Book Review
![Add Book](screenshots/add-book.png)
*Intuitive form to create new book reviews*

### User Profile
![Profile Page](screenshots/profile.png)
*Personal dashboard with reading statistics*

### Mobile Responsive Design
![Mobile View](screenshots/mobile-view.png)
*Fully responsive across all devices*

### Login Page
![Login](screenshots/login.png)
*Secure authentication interface*

</details>

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can contribute:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/Tigmanshukumar/Bookreview-site.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git commit -m "Add: Amazing feature that does X"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Add screenshots if UI changes

### Contribution Guidelines

#### Code Style
- Use meaningful variable and function names
- Follow ESLint and Prettier configurations
- Write modular, reusable code
- Add JSDoc comments for functions

#### Commit Messages
```
feat: Add new feature
fix: Bug fix
docs: Documentation update
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks
```

#### Areas for Contribution
- [ ] Add book categories/genres
- [ ] Implement book recommendations
- [ ] Add social sharing features
- [ ] Improve search algorithm
- [ ] Add pagination for book lists
- [ ] Implement user following system
- [ ] Add comment system for reviews
- [ ] Create admin dashboard
- [ ] Add data visualization for statistics
- [ ] Implement image upload for covers

## 📈 Future Enhancements

### Planned Features
- **Advanced Search**: Elasticsearch integration for better search
- **Recommendations**: ML-based book recommendations
- **Social Features**: Follow users, like reviews, comments
- **Reading Lists**: Create and share custom reading lists
- **Book Clubs**: Virtual book club functionality
- **Mobile App**: React Native mobile application
- **Admin Panel**: Content moderation and analytics
- **Email Notifications**: Updates on new books and followers
- **PDF/EPUB Upload**: Direct book file uploads
- **API Rate Limiting**: Protect against abuse

## 🐛 Known Issues

- Search may be slow with large datasets (pagination planned)
- Image uploads currently via URL only (direct upload coming)
- No password reset functionality yet (planned)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Tigmanshu Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 📞 Contact

**Developer**: Tigmanshu Kumar  
**Email**: [tigmanshukumar5@gmail.com](mailto:tigmanshukumar5@gmail.com)  
**LinkedIn**: [Connect with me](https://www.linkedin.com/in/tigmanshu-kumar-a774082b7/)  
**GitHub**: [@Tigmanshukumar](https://github.com/Tigmanshukumar)

### Get in Touch
- **Bug Reports**: [Create an issue](https://github.com/Tigmanshukumar/Bookreview-site/issues)
- **Feature Requests**: [Open a discussion](https://github.com/Tigmanshukumar/Bookreview-site/discussions)
- **General Inquiries**: Email or LinkedIn message
- **Collaboration**: Open to freelance projects and partnerships

---

<div align="center">
  <p>
    <strong>⭐ If you enjoy this project, please give it a star!</strong>
  </p>
  <p>
    Made with ❤️ by <strong>Tigmanshu Kumar</strong>
  </p>
  <p>
    <em>Happy Reading! 📚</em>
  </p>
</div>

---

## 🙏 Acknowledgments

Special thanks to the open-source community and the following technologies:

- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Node.js](https://nodejs.org/)** - JavaScript runtime built on Chrome's V8 engine
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework for Node.js
- **[MongoDB](https://www.mongodb.com/)** - The most popular NoSQL database
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[JWT](https://jwt.io/)** - JSON Web Tokens for secure authentication

## 📚 Additional Resources

- [MERN Stack Tutorial](https://www.mongodb.com/mern-stack)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [REST API Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)

<div align="center">
  <sub>Built with modern web technologies for book lovers everywhere</sub>
</div>
