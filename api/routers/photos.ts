import express from 'express';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import Photo from '../models/Photo';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import roleForUser from '../middleware/roleForUser';

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

photoRouter.delete('/:id', roleForUser, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).send({ message: 'Photo not found' });
    }

    if (user?.role === 'admin' || photo.author.equals(user?._id)) {
      const deleted = await Photo.deleteOne({ _id: req.params.id });
      if (deleted.deletedCount === 1) {
        return res.send({ message: 'Photo deleted' });
      } else {
        return res.status(500).send({ message: 'Error deleting photo' });
      }
    } else {
      return res.status(403).send({ message: 'No permission to delete this photo' });
    }
  } catch (error) {
    return next(error);
  }
});

export default photoRouter;
