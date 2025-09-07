import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productReducer';
import postSlice from './postReducer';
import userSlice from './userReducer';

export const store = configureStore({
  reducer: {
    product: productSlice,
    post: postSlice,
    users: userSlice,
  }
});