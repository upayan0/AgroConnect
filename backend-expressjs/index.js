import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/agroconnect';

app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  // Vercel preview and production URLs for the frontend
  'https://agro-connect-y6nl-git-main-upayanchatterjee7-gmailcoms-projects.vercel.app',
  'https://agro-connect-y6nl-upayanchatterjee7-gmailcoms-projects.vercel.app',
  'https://agro-connect-y6nl.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) // allow any vercel.app domain
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


// Enable CORS for all routes
app.use(cors(corsOptions));


// for testing
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Register auth routes
app.use('/api/auth', authRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
