import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsersService } from './../services/user.service';

const initialState = {
  userList: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})

export default userSlice.reducer;


export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  // eslint-disable-next-line no-unused-vars
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllUsersService();
      // return response.data?.data;
      return response.data?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
