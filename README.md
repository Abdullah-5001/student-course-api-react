# Student Course Management API

A full-stack web application for managing students, courses, and course enrollments. Built with Node.js/Express backend and React frontend with Tailwind CSS styling.

## 🎯 Features

- **Student Authentication**: Secure registration and login with JWT tokens
- **Course Management**: Create, read, and manage course listings
- **Course Enrollment**: Students can enroll in courses
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Loading States**: Visual feedback with spinners during API calls
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.2.1** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose 9.6.1** - MongoDB ODM
- **bcryptjs 3.0.3** - Password hashing
- **jsonwebtoken 9.0.3** - JWT authentication
- **dotenv 17.4.2** - Environment variables

### Frontend
- **React 19.2.5** - UI library
- **React Router DOM 7.14.2** - Client-side routing
- **Axios 1.15.2** - HTTP client
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Vite 8.0.10** - Build tool and dev server
- **PostCSS** - CSS processing

## 📁 Project Structure

```
Student-courses-api/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authController.js  # Auth handlers (register, login)
│   │   └── courseController.js # Course CRUD & enrollment
│   ├── models/
│   │   ├── student.js         # Student schema with password hashing
│   │   └── Course.js          # Course schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── courseRoute.js     # Course endpoints
│   ├── package.json
│   ├── server.js              # Express app entry point
│   └── .env                   # Environment variables (not tracked)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── landingPage.jsx    # Home page with hero section
│   │   │   ├── Register.jsx       # Registration form
│   │   │   ├── Login.jsx          # Login form
│   │   │   └── Dashboard.jsx      # Course catalog & enrollment
│   │   ├── services/
│   │   │   └── api.js            # Axios client with interceptors
│   │   ├── App.jsx               # Main app with routing
│   │   ├── index.css             # Global styles & Tailwind
│   │   └── main.jsx              # React entry point
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── vite.config.js            # Vite configuration
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/student-courses
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/studentCoursesFrontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, if backend is not on localhost:5000):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or 5174 if 5173 is in use)

## 📡 API Endpoints

### Authentication

#### Register Student
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "_id": "student_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "_id": "student_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Courses

#### Get All Courses
```
GET /courses
```

**Response:**
```json
[
  {
    "_id": "course_id",
    "title": "Web Development",
    "description": "Learn web development fundamentals",
    "instructor": "Jane Smith",
    "enrolledStudents": []
  }
]
```

#### Create Course
```
POST /courses
Content-Type: application/json

{
  "title": "Web Development",
  "description": "Learn web development fundamentals",
  "instructor": "Jane Smith"
}
```

#### Enroll in Course
```
POST /courses/:courseId/enroll
Content-Type: application/json
Authorization: Bearer jwt_token

{
  "studentId": "student_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student enrolled successfully"
}
```

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcryptjs (10 salt rounds)
3. JWT token is generated and returned
4. Token is stored in localStorage on the client
5. Token is sent in `Authorization: Bearer token` header for protected routes
6. Axios interceptor automatically adds token to all requests

## 💾 Database Schema

### Student
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  courseEnrollment: [ObjectId] (references Course)
}
```

### Course
```javascript
{
  title: String (required),
  description: String (required),
  instructor: String (required),
  enrolledStudents: [ObjectId] (references Student)
}
```

## 🎨 Frontend Pages

### Landing Page (`/`)
- Hero section with call-to-action buttons
- Feature highlights (Students, Courses, Enrollments)
- Quick actions panel with API endpoints
- Status indicators

### Register Page (`/register`)
- Form with name, email, password fields
- Loading spinner during submission
- Error message display
- Link to login page

### Login Page (`/login`)
- Email and password form
- Loading spinner during submission
- Error message display
- Link to register page

### Dashboard Page (`/dashboard`)
- Course catalog grid (responsive)
- Course cards with title, description, instructor
- Enroll button with loading state
- Logout button

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/student-courses
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (optional .env.local)
```env
VITE_API_URL=http://localhost:5000
```

## 📦 npm Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### CORS Issues
If you see CORS errors, ensure:
- Backend is running on port 5000
- Frontend is making requests to `http://localhost:5000`
- Backend server is properly connected

### 404 on Auth Endpoints
Make sure:
- Backend server is running (`npm run dev` in backend directory)
- API_URL in frontend is set correctly to backend URL
- Routes are mounted in `server.js` with `/auth` prefix

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide MongoDB Atlas connection string
- Check `MONGODB_URI` in `.env` file

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)
1. Push code to GitHub
2. Set environment variables on hosting platform
3. Deploy with Git integration

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable `VITE_API_URL` to production backend URL

## 📝 Future Improvements

- [ ] Add course search and filtering
- [ ] Implement course ratings and reviews
- [ ] Add user profile management
- [ ] Implement course categories
- [ ] Add pagination to course listing
- [ ] Email verification on registration
- [ ] Password reset functionality
- [ ] Admin dashboard for course management
- [ ] Student progress tracking
- [ ] Certificate generation

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.
