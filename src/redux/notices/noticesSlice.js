import { createSlice } from '@reduxjs/toolkit';

import {
  fetchDeleteNotice,
 } from './noticesOperations';

const initialState = {
  items: [],
  category: '',
  loading: false,
  error: null,
  item: {},
  owner: {},
  page: 1,
  totalPages: 1,
  keyword: '',
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDeleteNotice.pending, store => {
        store.loading = true;
      })
      .addCase(fetchDeleteNotice.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex(item => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteNotice.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      
      
  },
});

export default noticesSlice.reducer;
export const { setKeyword } = noticesSlice.actions;