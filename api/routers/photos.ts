import express from 'express';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import Photo from '../models/Photo';
import permit from '../middleware/permit';
import mongoose from 'mongoose';

const photoRouter = express.Router();

photoRouter.get('/', async (req, res, next) => {
  try {
    const user = req.query.user as string;
    if (user) {
      const photos = await Photo.find({ author: user }).populate('author', 'displayName');
      return res.send(photos);
    } else {
      const photos = await Photo.find().populate('author', 'displayName');
      return res.send(photos);
    }
  } catch (error) {
    return next(error);
  }
});

photoRouter.post('/', auth, permit('admin', 'user'), imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const photo = await Photo.create({
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      author: user?._id,
    });
    return res.send(photo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default photoRouter;
