import React, { useState } from 'react';
import { Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { PhotoMutation } from '../../../../types';
import { createPhoto } from '../../photosThunks';
import FileInput from '../../../../UI/FileInput/FileInput';
import { selectPhotoCreateLoading } from '../../photosSlice';

const PhotoForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectPhotoCreateLoading);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: null,
  });

  const onSubmit = async (photo: PhotoMutation) => {
    try {
      await dispatch(createPhoto(photo)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Container maxWidth="sm">
        <Paper sx={{ padding: 4, mt: 4, boxShadow: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Create new photo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={state.title}
                onChange={inputChangeHandler}
                required
                variant="outlined"
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput label="Image" onChange={fileInputChangeHandler} name="image" />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading || !state.image}>
                {loading ? <CircularProgress size={24} /> : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </form>
  );
};

export default PhotoForm;
