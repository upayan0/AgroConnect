import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/register', authMiddleware, register);
router.post('/login', authMiddleware, login);

export default router; 