import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  documents: [String],
});

export default mongoose.model('user', userSchema);
