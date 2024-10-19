import { createSlice } from '@reduxjs/toolkit';
import { Photo, ValidationError } from '../../types';
import { createPhoto, deletePhoto, getPhotos, getPhotosByAuthor } from './photosThunks';

interface InitialState {
  photos: Photo[];
  userPhotos: Photo[];
  isLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  createError: ValidationError | null;
}

const initialState: InitialState = {
  photos: [],
  userPhotos: [],
  isLoading: false,
  createLoading: false,
  deleteLoading: false,
  createError: null,
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
    builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createError = error || null;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectUserPhotos: (state) => state.userPhotos,
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.isLoading,
    selectPhotoCreateLoading: (state) => state.createLoading,
    selectPhotoDeleteLoading: (state) => state.deleteLoading,
    selectCreateError: (state) => state.createError,
  },
});

export const PhotosReducer = PhotoSlice.reducer;

export const {
  selectPhotoDeleteLoading,
  selectUserPhotos,
  selectPhotos,
  selectPhotosFetching,
  selectPhotoCreateLoading,
  selectCreateError,
} = PhotoSlice.selectors;
