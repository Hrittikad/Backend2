import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ["user", "Admin"], default: "user" },
  recentSearchedCourse: {
    type: [String],
    required: true,
    default: []
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;   // <-- export default for ES Module
