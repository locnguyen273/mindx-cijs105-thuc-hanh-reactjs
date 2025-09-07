import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPostService } from './../services/post.service';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  reducers: {
    // setPostList: (state, action) => {
    //   state.posts = action.payload; // cập nhật danh sách bài viết trong state
    // }
  }
});

export default postSlice.reducer;
// export const { setPostList } = postSlice.actions;

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  // eslint-disable-next-line no-unused-vars
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllPostService();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

