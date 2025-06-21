import express from 'express';
const router = express.Router();
import { register, login, forgotPassword, getProfile, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.post('/login',  login);
router.post('/forgot-password', forgotPassword);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router; 