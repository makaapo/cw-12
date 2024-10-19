import { createSlice } from '@reduxjs/toolkit';
import { Photo } from '../../types';
import { createPhoto, getPhotos, getPhotosByAuthor } from './photosThunks';

interface InitialState {
  photos: Photo[];
  userPhotos: Photo[];
  isLoading: boolean;
  createLoading: boolean;
}

const initialState: InitialState = {
  photos: [],
  userPhotos: [],
  isLoading: false,
  createLoading: false,
};

export const PhotoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, { payload: photos }) => {
      state.photos = photos;
      state.isLoading = false;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getPhotosByAuthor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotosByAuthor.fulfilled, (state, { payload: photos }) => {
      state.userPhotos = photos;
      state.isLoading = false;
    });
    builder.addCase(getPhotosByAuthor.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state) => {
      state.createLoading = false;
    });
  },
  selectors: {
    selectUserPhotos: (state) => state.userPhotos,
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.isLoading,
    selectPhotoCreateLoading: (state) => state.createLoading,
  },
});

export const PhotosReducer = PhotoSlice.reducer;

export const { selectUserPhotos, selectPhotos, selectPhotosFetching, selectPhotoCreateLoading } = PhotoSlice.selectors;
