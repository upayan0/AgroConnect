import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['farmer', 'buyer', 'admin'],
    default: 'farmer'
  },
  avatar: { type: String, default: '' },
  phone: { type: String },
  address: { type: String },
}, { timestamps: true });

export default mongoose.model('User', UserSchema); 