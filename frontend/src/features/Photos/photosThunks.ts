import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo, PhotoMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const getPhotos = createAsyncThunk<Photo[]>('photos/getAll', async () => {
  const { data: photos } = await axiosApi.get<Photo[]>('/photos');
  return photos;
});

export const getPhotosByAuthor = createAsyncThunk<Photo[], string>('photos/getByAuthor', async (author) => {
  const { data: photos } = await axiosApi.get<Photo[]>('/photos?user=' + author);
  return photos;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation>('photos/new', async (photoMutation) => {
  const formData = new FormData();
  const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];
  keys.forEach((key) => {
    const value = photoMutation[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  await axiosApi.post<Photo>('/photos', formData);
});
