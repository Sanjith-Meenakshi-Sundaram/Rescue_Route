import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // match with auth user
  name: String,
  phone: String,
  imageUrl: String,
  donations: Number,
  badges: [String],
});

export default mongoose.model('Profile', profileSchema);
