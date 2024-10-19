import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo, PhotoMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const getPhotos = createAsyncThunk<Photo[]>('photos/getAll', async () => {
  const { data: photos } = await axiosApi.get<Photo[]>('/photos');
  return photos;
});

export const getPhotosByAuthor = createAsyncThunk<Photo[], string>('photos/getByAuthor', async (author) => {
  const { data: photos } = await axiosApi.get<Photo[]>('/photos?user=' + author);
  return photos;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation, { rejectValue: ValidationError }>(
  'photos/new',
  async (photoMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];
      keys.forEach((key) => {
        const value = photoMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post<Photo>('/photos', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const deletePhoto = createAsyncThunk<void, string>('/photos/delete', async (id) => {
  await axiosApi.delete('/photos/' + id);
});
