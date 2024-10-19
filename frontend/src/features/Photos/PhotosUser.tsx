import { useEffect, useState } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPhotosFetching, selectUserPhotos } from './photosSlice';
import { getPhotosByAuthor } from './photosThunks';
import DialogWindow from './components/DialogWindow/DialogWindow';
import PhotoCard from './components/PhotoCard/PhotoCard';
import { useParams } from 'react-router-dom';

const PhotosUser = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectUserPhotos);
  const loading = useAppSelector(selectPhotosFetching);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = (url: string) => {
    setSelectedValue(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getPhotosByAuthor(id));
    }
  }, [dispatch, id]);

  return (
    <Container fixed>
      <DialogWindow open={open} onClose={handleClose} url={selectedValue} />
      {photos.length ? (
        <>
          <Typography textAlign="center" variant="h2">
            {photos[0].author.displayName + "'s Gallery"}
          </Typography>
          <Grid container gap={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              photos.map((photo) => <PhotoCard onDialog={handleClickOpen} key={photo._id} photo={photo} />)
            )}
          </Grid>
        </>
      ) : (
        <Typography textAlign="center" variant="h2">
          There is no Photos yet
        </Typography>
      )}
    </Container>
  );
};

export default PhotosUser;
