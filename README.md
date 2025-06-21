# AgroConnect - Agricultural Marketplace Platform

A full-stack agricultural marketplace platform connecting farmers and buyers.

## Project Structure

- **Frontend**: React + TypeScript + Vite + shadcn-ui + Tailwind CSS
- **Backend**: Express.js + MongoDB + JWT Authentication
- **AI Services**: FastAPI backend for disease prediction and AI features

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend-expressjs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/agroconnect
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Features

### Authentication
- User registration and login
- Role-based access (Farmer/Buyer/Admin)
- JWT token-based authentication
- Password reset functionality
- Profile management

### User Roles
- **Farmer**: Can list and sell agricultural products
- **Buyer**: Can browse and purchase products
- **Admin**: Platform management and oversight

### Core Features
- User authentication and authorization
- Product marketplace
- Weather information
- Disease prediction (AI-powered)
- Learning resources
- Advisory services

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- shadcn-ui components
- Tailwind CSS
- React Router
- Context API for state management

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### AI Services
- FastAPI (Python)
- Machine learning models for disease prediction

## Development

### Backend Development
```bash
cd backend-expressjs
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database
Make sure MongoDB is running. You can use:
- Local MongoDB installation
- MongoDB Atlas (cloud)
- Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

## Deployment

### Backend Deployment
1. Set up environment variables in production
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB connection string

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
