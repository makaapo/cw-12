import mongoose, { Schema, Types } from 'mongoose';
import User from './User';

const PhotoSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: [true, 'Title must be provided'],
  },
  image: {
    type: String,
    required: [true, 'Image must be provided'],
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;
