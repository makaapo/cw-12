import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserFields, UserMethods, UserModel } from '../types';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: [true, 'Email must be provided!'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/, 'Please fill a valid email address'],
    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('username')) {
          return true;
        }

        const user = await User.findOne({ username: value });
        return !user;
      },
      message: 'This user is already registered!',
    },
  },

  password: {
    type: String,
    required: [true, 'Password must be provided!'],
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  displayName: {
    type: String,
    required: [true, 'Name must be provided!'],
  },
  googleID: String,
  avatar: {
    type: String,
    required: [true, 'Avatar must be provided!'],
  },
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;
