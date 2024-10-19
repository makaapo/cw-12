import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../../constants';
import { Photo } from '../../../../types';
import React from 'react';
import { selectUser } from '../../../User/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectPhotoDeleteLoading } from '../../photosSlice';
import { deletePhoto, getPhotos, getPhotosByAuthor } from '../../photosThunks';

interface Props {
  photo: Photo;
  onDialog: (url: string) => void;
}

const PhotoCard: React.FC<Props> = ({ photo, onDialog }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectPhotoDeleteLoading);

  const ImgUrl = photo.image ? `${API_URL}/${photo.image}` : '';

  const handleDialogOpen = () => {
    if (ImgUrl) {
      onDialog(ImgUrl);
    }
  };

  const onDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this photo?');

    if (confirmed) {
      await dispatch(deletePhoto(photo._id));
      if (id?.length) {
        await dispatch(getPhotosByAuthor(id));
      } else {
        await dispatch(getPhotos());
      }
    }
  };

  return (
    <Card sx={{ width: 300, margin: '20px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea onClick={handleDialogOpen}>
        {ImgUrl && (
          <CardMedia
            component="img"
            height="250"
            image={ImgUrl}
            alt={photo.title}
            sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {photo.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea>
        <Typography
          variant="h6"
          component={Link}
          to={`/photos/${photo.author._id}`}
          textAlign="center"
          sx={{
            display: 'block',
            padding: '8px',
            textDecoration: 'underline',
            textUnderlineOffset: '5px',
            color: 'primary.main',
            transition: 'transform 0.3s',
            '&:hover': {
              textDecoration: 'none',
              transform: 'scale(1.05)',
            },
          }}
        >
          Created by: {photo.author.displayName}
        </Typography>
      </CardActionArea>
      <CardContent>
        {(user && user.role === 'admin') || (user && user._id === photo.author._id) ? (
          <Button onClick={onDelete} fullWidth variant="contained" color="secondary" sx={{ mt: 1 }} disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
