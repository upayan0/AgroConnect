# AgroConnect Backend

Express.js backend for AgroConnect application with MongoDB database and JWT authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/agroconnect
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

3. Make sure MongoDB is running on your system

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

## User Model

The User model includes the following fields:
- `name` (required) - User's full name
- `email` (required, unique) - User's email address
- `password` (required) - Hashed password
- `role` (required) - User role: 'farmer', 'buyer', or 'admin'
- `avatar` (optional) - Profile picture URL
- `phone` (optional) - Phone number
- `address` (optional) - Physical address 